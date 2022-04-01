import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { getAllProjects } from "../firebase";
import Project from "./Project";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProjects = async () => {
    try {
      setProjects(await getAllProjects());
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  if (loading) {
    return (
      <View style={styles.root}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (error || !projects.length > 0) {
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
        data={projects}
        renderItem={renderItem}
        keyExtractor={(project) => project.id}
      />
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
