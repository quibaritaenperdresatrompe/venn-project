import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

//import Identification from "./screens/Identification";
import Test from "./screens/Test";

export default function App() {
  return (
    <View style={styles.container}>
      <Test />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 24,
  },
});

registerRootComponent(App);
