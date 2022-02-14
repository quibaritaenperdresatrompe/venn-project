import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import Members from "./screens/Members";

export default function App() {
  return (
    <View style={styles.container}>
      <Members />
      <StatusBar style="auto" />
    </View>
  );
}

registerRootComponent(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
