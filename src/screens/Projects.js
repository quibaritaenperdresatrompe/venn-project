import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";

const Stack = createNativeStackNavigator();

function Projects() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tous les projets" component={ProjectList} />
      <Stack.Screen name="Nouveau projet" component={ProjectForm} />
    </Stack.Navigator>
  );
}

export default Projects;
