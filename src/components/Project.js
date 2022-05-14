import { useMemo, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

import Avatar from "./Avatar";
import useGetAll from "../hooks/useGetAll";
import Tag from "./Tag";
import UserContext from "../UserContext";

function Project({ title, participants = [], tags = [] }) {
  const { data: members } = useGetAll("members");
  const [user] = useContext(UserContext);
  const avatars = useMemo(
    () =>
      participants.reduce((acc, id) => {
        const participant = members?.find((member) => member.id === id);
        if (participant) {
          return [
            ...acc,
            {
              id,
              label: participant.firstname?.[0],
              color: id === user.id ? user.color : participant.favoriteColor,
            },
          ];
        }
        return acc;
      }, []),
    [members, participants, user.color, user.id]
  );
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.items}>
        {tags.map((tag) => (
          <View key={tag} style={styles.item}>
            <Tag label={tag} />
          </View>
        ))}
      </View>
      <View style={styles.items}>
        {avatars.map((avatar) => (
          <View key={avatar.id} style={styles.item}>
            <Avatar label={avatar.label} color={avatar.color} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderColor: "black",
    borderWidth: 4,
    borderStyle: "solid",
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 8,
    marginVertical: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  items: {
    flexDirection: "row",
  },
  item: {
    margin: 8,
  },
});

export default Project;
