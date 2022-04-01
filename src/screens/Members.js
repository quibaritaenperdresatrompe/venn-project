import { View, ScrollView, StyleSheet } from "react-native";

import Avatar from "../components/Avatar";
import Button from "../components/Button";
import useGetAll from "../hooks/useGetAll";

function Members() {
  const { data, loading, error } = useGetAll("members");
  if (loading || error) {
    return null;
  }
  return (
    <View>
      <ScrollView contentContainerStyle={styles.list}>
        {data.map((member) => (
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
        <View style={styles.footer}>
          <Button title="Inviter" />
        </View>
      </ScrollView>
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
    margin: 16,
  },
  footer: {
    width: "100%",
    padding: 32,
  },
});
