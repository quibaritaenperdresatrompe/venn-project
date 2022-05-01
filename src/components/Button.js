import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useContext } from "react";

import ColorContext from "../ColorContext";

function Button({ title, onPress }) {
  const [color] = useContext(ColorContext);
  const styles = createStyles({ color });
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <Text style={styles.label}>{title}</Text>
    </TouchableOpacity>
  );
}

export default Button;

const createStyles = ({ color }) =>
  StyleSheet.create({
    root: {
      borderColor: color,
      borderWidth: 4,
      borderStyle: "solid",
      backgroundColor: "rgba(0,0,0,0.1)",
      padding: 8,
    },
    label: {
      color,
      fontSize: 20,
      fontWeight: "700",
      textAlign: "center",
    },
  });
