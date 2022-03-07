import { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import app from "../../app.json";
import data from "../../assets/data.json";
import Button from "../components/Button";
import Avatar from "../components/Avatar";

function Identification() {
  const [value, setValue] = useState("");
  const [member, setMember] = useState(null);
  const [error, setError] = useState(false);
  const onChange = (text) => {
    setError(false);
    setMember(null);
    setValue(text);
  };
  const onPress = () => {
    const found = data.members.find(({ lastname, firstname }) =>
      value.match(
        new RegExp(`(${firstname} ${lastname})|(${lastname} ${firstname})`, "i")
      )
    );
    setMember(found);
    setError(!found);
  };
  if (member) {
    return (
      <View style={styles.root}>
        <Text style={styles.title}>{app.expo.name}</Text>
        <Image source={require("../../assets/icon.png")} style={styles.logo} />
        <Avatar label={member.firstname?.[0]} color={member.favoriteColor} />
        <Text>
          Bienvenu·e {member.firstname} {member.lastname} !
        </Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.root}>
        <Text style={styles.title}>{app.expo.name}</Text>
        <Image source={require("../../assets/icon.png")} style={styles.logo} />
        <View>
          <TextInput
            placeholder="Identifiant"
            style={styles.input}
            value={value}
            onChangeText={onChange}
          />
          <Text>Désolé, tu n'es pas enregistré·e.</Text>
        </View>
        <Button title="S'enregistrer" />
      </View>
    );
  }
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{app.expo.name}</Text>
      <Image source={require("../../assets/icon.png")} style={styles.logo} />
      <TextInput
        placeholder="Identifiant"
        style={styles.input}
        value={value}
        onChangeText={onChange}
      />
      <Button title="S'identifier" onPress={onPress} />
    </View>
  );
}

export default Identification;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
  logo: {
    height: 192,
    width: 192,
  },
  input: {
    borderColor: "black",
    borderWidth: 4,
    borderStyle: "solid",
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 8,
    width: Dimensions.get("window").width - 64,
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 8,
  },
});
