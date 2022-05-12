import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { random } from "colord";
import α from "color-alpha";

function Tag({ label, color: defaultColor }) {
  const color = useMemo(() => defaultColor || random().toHex(), [defaultColor]);
  const styles = createStyles({ color });
  return (
    <View style={styles.root}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

export default Tag;

const createStyles = ({ color }) =>
  StyleSheet.create({
    root: {
      padding: 8,
      backgroundColor: α(color, 0.1),
      borderColor: color,
      borderWidth: 4,
      borderStyle: "solid",
      justifyContent: "center",
      alignItems: "center",
    },
    label: {
      fontSize: 14,
      fontWeight: "700",
      color,
    },
  });
