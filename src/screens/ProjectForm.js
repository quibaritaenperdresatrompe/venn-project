import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import Button from "../components/Button";
import useAdd from "../hooks/useAdd";

function ProjectForm({ navigation }) {
  const [title, setTitle] = useState("");
  const { add, loading } = useAdd("projects", { title });
  const onAdd = async () => {
    await add();
    navigation.navigate("Tous les projets");
  };
  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <TextInput
          placeholder="Titre"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          disabled={loading}
        />
        <View style={styles.actions}>
          <Button
            title={loading ? "Création..." : "Créer"}
            onPress={onAdd}
            disabled={loading}
          />
        </View>
      </View>
    </View>
  );
}

export default ProjectForm;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
  },
  input: {
    borderColor: "black",
    borderWidth: 4,
    borderStyle: "solid",
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 8,
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 8,
  },
  actions: {
    paddingVertical: 16,
  },
});
