import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useCallback } from "react";

import Button from "../components/Button";
import useGetAll from "../hooks/useGetAll";
import Project from "../components/Project";

function ProjectList({ navigation }) {
  const { loading, error, data } = useGetAll("projects", ["createdAt", "desc"]);
  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Projets", {
            screen: "Projet",
            params: { id: item.id, title: item.title },
          });
        }}
      >
        <Project {...item} />
      </TouchableOpacity>
    ),
    [navigation]
  );
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
        <Text>Pas de projet.</Text>
      </View>
    );
  }

  const onNavigateToProjectForm = () => {
    navigation.navigate("Nouveau projet");
  };
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(project) => project.id}
      contentContainerStyle={styles.root}
      ListHeaderComponent={
        <Button
          title="Commencer un nouveau projet"
          onPress={onNavigateToProjectForm}
        />
      }
      ListHeaderComponentStyle={styles.actions}
    />
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
  },
  actions: {
    marginVertical: 16,
  },
});

export default ProjectList;
