import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import Tag from "./Tag";

function MultiValue({ data = [], onChange, ...props }) {
  const [error, setError] = useState(null);
  const [value, setValue] = useState("");
  const styles = createStyles({ error });
  const onChangeText = (text) => {
    setError(null);
    setValue(text);
  };
  const onSubmitEditing = () => {
    const text = value.trim();
    if (text.length > 0) {
      if (!data.includes(text)) {
        setValue("");
        onChange([...data, text]);
        setError(null);
      } else {
        setError("La valeur existe déjà.");
      }
    } else {
      setError("La valeur est trop courte.");
    }
  };
  const onRemove = (text) => () => {
    onChange(data.filter((item) => item !== text));
  };
  return (
    <View>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.values}>
        {data.map((item) => (
          <View key={item} style={styles.value}>
            <TouchableOpacity onPress={onRemove(item)}>
              <Tag label={item} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

export default MultiValue;

const createStyles = ({ error }) =>
  StyleSheet.create({
    input: {
      borderColor: error ? "red" : "black",
      borderWidth: 4,
      borderStyle: "solid",
      backgroundColor: "rgba(0,0,0,0.1)",
      padding: 8,
      fontSize: 20,
      fontWeight: "700",
    },
    values: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "flex-end",
    },
    value: {
      marginTop: 8,
      marginRight: 8,
    },
    error: {
      color: "red",
    },
  });
