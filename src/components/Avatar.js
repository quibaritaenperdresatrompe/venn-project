import { StyleSheet, Text, View } from "react-native";
import α from "color-alpha";

function Avatar({ color = "#000", label }) {
  const styles = createStyles({ color });
  return (
    <View style={styles.root}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

export default Avatar;

const SIZE = 96;

const createStyles = ({ color }) =>
  StyleSheet.create({
    root: {
      height: SIZE,
      width: SIZE,
      backgroundColor: α(color, 0.1),
      borderColor: color,
      borderWidth: 4,
      borderStyle: "solid",
      borderRadius: SIZE / 2,
      justifyContent: "center",
      alignItems: "center",
    },
    label: {
      fontSize: 32,
      fontWeight: "700",
      color,
    },
  });
