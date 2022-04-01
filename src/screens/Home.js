import { View, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Members from "./Members";

const Drawer = createDrawerNavigator();

function Projects() {
  return (
    <View>
      <Text>No project yet.</Text>
    </View>
  );
}

function Home() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Projects" component={Projects} />
      <Drawer.Screen name="Members" component={Members} />
    </Drawer.Navigator>
  );
}

export default Home;
