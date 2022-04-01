import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Members from "./Members";

const Tab = createBottomTabNavigator();

function Projects() {
  return (
    <View>
      <Text>No project yet.</Text>
    </View>
  );
}

function Home() {
  return (
    <Tab.Navigator screenOptions={{ tabBarLabelStyle: styles.tabBarLabel }}>
      <Tab.Screen
        name="Projects"
        component={Projects}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="briefcase-account"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Members"
        component={Members}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-group"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: { fontSize: 16, fontWeight: "700" },
});

export default Home;
