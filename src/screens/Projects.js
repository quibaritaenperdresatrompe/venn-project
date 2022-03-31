import { View, Text, StyleSheet, FlatList } from "react-native";
import { useQuery } from "react-query";

import Avatar from "../components/Avatar";
import data from "../../assets/data.json";
import { getAll } from "../firestore";

function Projects() {
  const query = useQuery(["projects"], getAll("projects"));
  if (query.isLoading) {
    return (
      <View style={styles.root}>
        <Text>Chargement...</Text>
      </View>
    );
  }
  if (query.error || query.data.length === 0) {
    return (
      <View style={styles.root}>
        <Text>Pas de projet.</Text>
      </View>
    );
  }
  const renderItem = ({ item }) => <Project {...item} />;
  return (
    <View style={styles.root}>
      <FlatList
        data={query.data}
        renderItem={renderItem}
        keyExtractor={(project) => project.id}
      />
    </View>
  );
}
function Project({ title, participants }) {
  const avatars = participants
    .map((id) => {
      const participant = data.members.find((member) => member.id === id);
      if (!participant) {
        return null;
      }
      return { id, label: participant.firstname[0] };
    })
    .filter(Boolean);
  return (
    <View style={styles.project}>
      <Text style={styles.title}>{title}</Text>
      {avatars?.length > 0 && (
        <View style={styles.participants}>
          {avatars.map(({ id, label }) => (
            <View key={id} style={styles.participant}>
              <Avatar label={label} />
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    padding: 16,
  },
  project: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderColor: "black",
    borderWidth: 4,
    borderStyle: "solid",
    backgroundColor: "white",
  },
  title: {
    color: "black",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  participants: {
    flexDirection: "row",
  },
  participant: {
    marginRight: 8,
  },
});

export default Projects;
