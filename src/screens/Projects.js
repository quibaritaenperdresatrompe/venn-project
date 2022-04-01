import { View, Text, StyleSheet } from "react-native";
import { useQuery } from "react-query";

import { getAll } from "../firestore";

function Projects() {
  const query = useQuery("projects", getAll("projects"));
  if (query.isLoading) {
    return (
      <View style={styles.root}>
        <Text>Chargement...</Text>
      </View>
    );
  }
  if (!query.data?.length > 0) {
    return (
      <View style={styles.root}>
        <Text>Pas de projet.</Text>
      </View>
    );
  }
  return (
    <View style={styles.root}>
      {query.data.map((project) => (
        <Text key={project.id}>{project.title}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    padding: 16,
  },
});

export default Projects;
