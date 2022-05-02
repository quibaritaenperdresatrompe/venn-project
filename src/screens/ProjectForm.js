import { useState } from "react";
import { StyleSheet, View } from "react-native";

import Button from "../components/Button";
import Input from "../components/Input";
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
        <Input
          placeholder="Titre"
          value={title}
          onChangeText={setTitle}
          editable={!loading}
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
  actions: {
    paddingVertical: 16,
  },
});
