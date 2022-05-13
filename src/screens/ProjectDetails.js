import { View, Text, StyleSheet } from "react-native";
import { useMemo } from "react";

import useGetOne from "../hooks/useGetOne";
import useGetAll from "../hooks/useGetAll";
import Tag from "../components/Tag";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import useDeleteOne from "../hooks/useDeleteOne";

function ProjectDetails({ navigation, route }) {
  const { loading, error, data } = useGetOne("projects", route.params.id);
  const { data: members } = useGetAll("members");
  const { deleteOne } = useDeleteOne("projects", route.params.id);
  const onDelete = async () => {
    await deleteOne();
    navigation.navigate("Tous les projets");
  };
  const avatars = useMemo(
    () =>
      data?.participants?.reduce((acc, id) => {
        const participant = members?.find((member) => member.id === id);
        if (participant) {
          return [
            ...acc,
            {
              id,
              label: participant.firstname?.[0],
              color: participant.favoriteColor,
            },
          ];
        }
        return acc;
      }, []),
    [data.participants, members]
  );
  if (loading) {
    return (
      <View style={styles.root}>
        <Text>Chargement...</Text>
      </View>
    );
  }
  if (error || !data) {
    return (
      <View style={styles.root}>
        <Text>Pas de projet.</Text>
      </View>
    );
  }
  return (
    <View style={styles.root}>
      {data?.tags?.length > 0 && (
        <>
          <Text>Tags</Text>
          <View style={styles.items}>
            {data.tags.map((tag) => (
              <View key={tag} style={styles.item}>
                <Tag label={tag} />
              </View>
            ))}
          </View>
        </>
      )}
      {avatars?.length > 0 && (
        <>
          <Text>Participants</Text>
          <View style={styles.items}>
            {avatars.map((avatar) => (
              <View key={avatar.id} style={styles.item}>
                <Avatar label={avatar.label} color={avatar.color} />
              </View>
            ))}
          </View>
        </>
      )}
      <View style={styles.actions}>
        <Button title="Supprimer" onPress={onDelete} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 16,
  },
  items: {
    flexDirection: "row",
  },
  item: {
    margin: 8,
  },
  actions: {
    marginVertical: 16,
  },
});

export default ProjectDetails;
