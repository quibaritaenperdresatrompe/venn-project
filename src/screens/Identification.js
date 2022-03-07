import { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  createStyles,
} from "react-native";

import app from "../../app.json";
import data from "../../assets/data.json";

function Identification() {
  const [value, setValue] = useState("");
  const [member, setMember] = useState(null);
  const [error, setError] = useState(false);
  const onChange = (text) => {
    setValue(text);
  };
  const onPress = () => {
    if (value.length > 0) {
      const newMember = data.members.find(({ firstname, lastname }) => {
        const fullName = `(${firstname} ${lastname}) (${lastname} ${firstname})`;
        return value.match(new RegExp(fullName, "i"));
      });
      if (newMember) {
        setMember(newMember);
      } else {
        setError(true);
      }
    }
  };

  const styles = createStyles({ member: Boolean(member), error });

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
