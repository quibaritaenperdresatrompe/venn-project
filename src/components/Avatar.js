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

const createStyles = ({ color, size }) =>
  StyleSheet.create({
    root: {
      height: size,
      width: size,
      backgroundColor: α(color, 0.1),
      borderColor: color,
      borderWidth: 4,
      borderStyle: "solid",
      borderRadius: Math.round(SIZE / 2),
      justifyContent: "center",
      alignItems: "center",
    },
    label: {
      fontSize: Math.round(size / 3),
      fontWeight: "700",
      color,
    },
  });
