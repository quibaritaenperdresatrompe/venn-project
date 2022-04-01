import { View, StyleSheet, Text } from "react-native";

import Avatar from "../components/Avatar";

function Project({ title, participants }) {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.participants}>
        {participants.map((participant) => (
          <View key={participant.id} style={styles.participant}>
            <Avatar label={participant.initial} color={participant.color} />
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
  participants: {
    flexDirection: "row",
  },
  participant: {
    margin: 8,
  },
});

export default Project;
