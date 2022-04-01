import { useState } from "react";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "react-query";

import Identification from "./screens/Identification";
import Home from "./screens/Home";
import ColorContext from "./ColorContext";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  const [color, setColor] = useState(null);
  return (
    <QueryClientProvider client={queryClient}>
      <ColorContext.Provider value={[color, setColor]}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Identification" component={Identification} />
            <Stack.Screen name="Accueil" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </ColorContext.Provider>
    </QueryClientProvider>
  );
}

registerRootComponent(App);
