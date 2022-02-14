import { View, ScrollView, Button, StyleSheet } from "react-native";

import data from "../../assets/data.json";
import Avatar from "../components/Avatar";

function Members() {
  return (
    <View>
      <ScrollView contentContainerStyle={styles.list}>
        {data.members.map((member) => (
          <View
            style={styles.avatar}
            key={`${member.firstname}${member.lastname}`}
          >
            <Avatar
              label={member.firstname[0].toLocaleUpperCase()}
              color={member.favoriteColor}
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Button title="Inviter" color="black" />
      </View>
    </View>
  );
}

export default Members;

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  avatar: {
    margin: 8,
  },
  footer: {
    backgroundColor: "white",
    padding: 32,
  },
});
