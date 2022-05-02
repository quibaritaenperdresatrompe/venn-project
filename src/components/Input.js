import { StyleSheet, TextInput } from "react-native";

function Input({ error = false, ...props }) {
  const styles = createStyles({ error });
  return <TextInput style={styles.root} {...props} />;
}

export default Input;

const createStyles = ({ error }) =>
  StyleSheet.create({
    root: {
      borderColor: error ? "red" : "black",
      borderWidth: 4,
      borderStyle: "solid",
      backgroundColor: "rgba(0,0,0,0.1)",
      padding: 8,
      fontSize: 20,
      fontWeight: "700",
    },
  });
