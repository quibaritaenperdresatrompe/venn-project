import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { random } from "colord";
import α from "color-alpha";

function Avatar({ color: defaultColor = "#000", label }) {
  const color = useMemo(() => defaultColor || random().toHex(), [defaultColor]);
  const styles = createStyles({ color });
  return (
    <View style={styles.root}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

export default Avatar;

const SIZE = 40;
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
      fontSize: 14,
      fontWeight: "700",
      color,
    },
  });
