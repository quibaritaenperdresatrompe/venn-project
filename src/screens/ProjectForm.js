import { useState, useCallback, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";

import Button from "../components/Button";
import Input from "../components/Input";
import MultiValue from "../components/MultiValue";
import Select from "../components/Select";
import useAdd from "../hooks/useAdd";
import useGetAll from "../hooks/useGetAll";
import UserContext from "../UserContext";

function ProjectForm({ navigation }) {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState(null);
  const { add, loading } = useAdd("projects");
  const { data: members } = useGetAll("members");
  const [user] = useContext(UserContext);
  const matchSuggestions = useCallback(
    (text) =>
      members.filter((member) => {
        const exist = participants.some(
          (participant) => participant.id === member.id
        );
        if (exist) {
          return false;
        }
        const me = member.id === user.id;
        if (me) {
          return true;
        }
        if (text.length > 2) {
          return match(text, member);
        }
        return false;
      }),
    [members, participants, user.id]
  );
  const colorExtractor = useCallback(
    (member) => (member.id === user.id ? user.color : member.favoriteColor),
    [user.color, user.id]
  );
  const onAdd = async () => {
    if (title.length > 0) {
      setError(null);
      await add({
        title,
        tags,
        participants: participants.map(idExtractor),
      });
      navigation.navigate("Tous les projets");
    } else {
      setError("Le titre est requis");
    }
  };
  return (
    <View style={styles.root}>
      <View style={styles.field}>
        <Input
          placeholder="Titre"
          value={title}
          onChangeText={setTitle}
          editable={!loading}
        />
      </View>
      <View style={styles.field}>
        <MultiValue
          placeholder="Tags"
          data={tags}
          onChange={setTags}
          editable={!loading}
        />
      </View>
      <View style={styles.field}>
        <Select
          placeholder="Participants"
          options={members}
          data={participants}
          onChange={setParticipants}
          editable={!loading}
          matchSuggestions={matchSuggestions}
          renderLabel={renderLabel}
          idExtractor={idExtractor}
          colorExtractor={colorExtractor}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.actions}>
        <Button
          title={loading ? "Création..." : "Créer"}
          onPress={onAdd}
          disabled={loading}
        />
      </View>
    </View>
  );
}

const renderLabel = (member) => `${member.firstname} ${member.lastname}`;
const idExtractor = (member) => member.id;
const match = (text = "", member) =>
  text
    .split(" ")
    .every((word) =>
      [member.firstname, member.lastname].some((field) => field.match(word))
    );

export default ProjectForm;

const styles = StyleSheet.create({
  root: {
    padding: 16,
  },
  field: {
    marginVertical: 8,
  },
  actions: {
    paddingVertical: 16,
  },
  error: {
    color: "red",
  },
});
