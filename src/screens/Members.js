import { View, ScrollView, StyleSheet, Text } from "react-native";
import { useContext } from "react";

import UserContext from "../UserContext";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import useGetAll from "../hooks/useGetAll";

function Members() {
  const { loading, error, data } = useGetAll("members");
  const [user] = useContext(UserContext);
  if (loading) {
    return (
      <View style={styles.root}>
        <Text>Chargement...</Text>
      </View>
    );
  }
  if (error || !data?.length > 0) {
    return (
      <View style={styles.root}>
        <Text>Pas de membre.</Text>
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={styles.list}>
      {data.map((member) => (
        <View style={styles.avatar} key={member.id}>
          <Avatar
            label={member.firstname[0]}
            color={member.id === user.id ? user.color : member.favoriteColor}
          />
        </View>
      ))}
      <View style={styles.footer}>
        <Button title="Inviter" />
      </View>
    </ScrollView>
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
    margin: 16,
  },
  footer: {
    width: "100%",
    padding: 32,
  },
});
