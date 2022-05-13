import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";
import ProjectDetails from "./ProjectDetails";

const Stack = createNativeStackNavigator();

function Projects() {
  return (
    <Stack.Navigator
      screenOptions={{
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabBar,
        headerTitleStyle: styles.title,
      }}
    >
      <Stack.Screen name="Tous les projets" component={ProjectList} />
      <Stack.Screen
        name="Projet"
        options={({ route }) => ({
          title: `${route.params.title}`,
        })}
        component={ProjectDetails}
      />
      <Stack.Screen name="Nouveau projet" component={ProjectForm} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    fontSize: 24,
  },
  tabLabel: {
    fontSize: 20,
    fontWeight: "700",
    height: 32,
  },
  tabBar: {
    height: 72,
  },
});

export default Projects;
