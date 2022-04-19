import { useState, useEffect, useContext } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

import Members from "./Members";
import app from "../../app.json";
import data from "../../assets/data.json";
import ColorContext from "../ColorContext";
import Button from "../components/Button";
import Greetings from "../components/Greetings";

function Identification({ navigation }) {
  const [value, setValue] = useState("");
  const [member, setMember] = useState(null);
  const [error, setError] = useState(false);
  const [location, setLocation] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const styles = createStyles({
    error,
    member: Boolean(member),
  });

  //useEffect(() => {è
  //  (async () => {
  //    let { status } = await Location.requestForegroundPermissionsAsync();
  //    if (status !== "granted") {
  //      return;
  //    }
  //    let location = await Location.getCurrentPositionAsync({});
  //    setLocation(location);
  //  })();
  //}, []);

  //useEffect(() => {
  //  if (member && !timeoutId) {
  //    const id = setTimeout(() => {
  //      NavigationContainer.navigator("Identification");
  //    }, 2000);
  //    setTimeoutId(id);
  //    return () => {
  //      clearTimeout(id);
  //    };
  //  }
  //}, [member, timeoutId]);

  let coords = JSON.stringify(location);

  const onChange = (text) => {
    setError(false);
    setMember(null);
    setValue(text);
  };

  const onPress = () => {
    if (value.length > 0) {
      const found = data.members.find(({ lastname, firstname }) =>
        value.match(
          new RegExp(
            `(${firstname} ${lastname})|(${lastname} ${firstname})`,
            "i"
          )
        )
      );
      setMember(found);
      setError(!found);
      if (found) {
        setColor(found.favoriteColor);
      }
    }
  };
  const onNavigateToHome = () => {
    navigation.navigate("Accueil");
  };
  const onNavigateToMembers = () => {
    navigation.navigate("Accueil", { screen: "Membres" });
  };
  const header = (
    <View style={styles.header}>
      <Text style={styles.title}>{app.expo.name}</Text>
      <Image source={require("../../assets/icon.png")} style={styles.logo} />
    </View>
  );

  if (member) {
    SetMembersCoords(coords, member.firstname, member.lastname);
    let text;
    return (
      <View style={styles.root}>
        {header}
        <View style={styles.content}>
          <TouchableOpacity onPress={onNavigateToMembers}>
            <Avatar
              label={member.firstname?.[0]}
              color={member.favoriteColor}
            />
          </TouchableOpacity>
          <Text style={styles.greetings}>
            Bienvenu·e {member.firstname} {member.lastname} !
          </Text>
          <View style={styles.actions}>
            <Button title="Aller à l'accueil" onPress={onNavigateToHome} />
          </View>
        </View>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.root}>
        {header}
        <View style={styles.content}>
          <View>
            <TextInput
              placeholder="Identifiant"
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
            <Text style={styles.error}>Désolé, tu n'es pas enregistré·e.</Text>
          </View>
          <View style={styles.actions}>
            <Button title="S'enregistrer" />
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.root}>
      {header}
      <View style={styles.content}>
        <TextInput
          placeholder="Identifiant"
          style={styles.input}
          value={value}
          onChangeText={onChange}
        />
        <View style={styles.actions}>
          <Button title="S'identifier" onPress={onPress} />
        </View>
      </View>
    </View>
  );

  function SetMembersCoords(coords, _Firstname, _Lastname) {
    for (let memberData in data.members) {
      // eslint-disable-next-line prettier/prettier
      if (
        memberData.lastname == _Lastname &&
        memberData.firstname == _Firstname
      ) {
        memberData.coords = [
          JSON.stringify(location.coords.longitude),
          JSON.stringify(location.coords.latitude),
          JSON.stringify(location.timestamp),
        ];
      }
    }
  }
}

export default Identification;

const createStyles = ({ error, member }) =>
  StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: "center",
    },
    header: {
      flexDirection: error || member ? "row" : "column",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: error || member ? 1 : 0,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: error || member ? 12 : 32,
      fontWeight: "700",
    },
    logo: {
      height: error || member ? 32 : 192,
      width: error || member ? 32 : 192,
      marginLeft: error || member ? 8 : 0,
    },
    input: {
      borderColor: error ? "red" : "black",
      borderWidth: 4,
      borderStyle: "solid",
      backgroundColor: "rgba(0,0,0,0.1)",
      padding: 8,
      width: Dimensions.get("window").width - 64,
      fontSize: 20,
      fontWeight: "700",
      marginVertical: 8,
    },
    error: {
      color: "red",
    },
    actions: {
      marginVertical: 16,
    },
  });
