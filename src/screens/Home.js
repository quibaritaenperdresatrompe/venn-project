import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Members from "./Members";
import ColorContext from "../ColorContext";

const Tab = createBottomTabNavigator();

function Projects() {
  return (
    <View style={styles.content}>
      <Text>Pas de projet.</Text>
    </View>
  );
}

function Home() {
  const [color] = useContext(ColorContext);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: styles.tabLabel,
        tabBarActiveTintColor: color,
        headerTitleStyle: styles.title,
      }}
    >
      <Tab.Screen
        name="Projets"
        component={Projects}
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="briefcase-account" {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Membres"
        component={Members}
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="account-multiple" {...props} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
  },
  tabLabel: {
    fontSize: 16,
    fontWeight: "700",
  },
  content: {
    flexGrow: 1,
    padding: 16,
  },
});

export default Home;
