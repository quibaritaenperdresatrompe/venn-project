import { useState } from "react";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";

import Identification from "./screens/Identification";
import Home from "./screens/Home";
import UserContext from "./UserContext";

LogBox.ignoreLogs(["Setting a timer"]);

const Stack = createNativeStackNavigator();

const DEFAULT_COLOR = "black";

export default function App() {
  const [user, setUser] = useState({ color: DEFAULT_COLOR });
  return (
    <UserContext.Provider value={[user, setUser]}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Identification" component={Identification} />
          <Stack.Screen name="Accueil" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

registerRootComponent(App);
