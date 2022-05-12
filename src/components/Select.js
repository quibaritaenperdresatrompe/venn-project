import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import Tag from "./Tag";

function Select({
  options = [],
  data = [],
  onChange,
  matchSuggestions = Empty,
  renderLabel = Identity,
  idExtractor = Identity,
  colorExtractor = Undefined,
  ...props
}) {
  const [error, setError] = useState(null);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const styles = createStyles({ error });
  function onChangeText(text) {
    setError(null);
    setValue(text);
    if (text.length > 2) {
      const matches = matchSuggestions(text);
      setSuggestions(matches);
      if (matches.length === 0) {
        setError("Aucune suggestion.");
      }
    } else {
      setSuggestions([]);
    }
  }
  const onSubmit = () => {
    if (value.length > 0) {
      const matches = matchSuggestions(value.trim());
      if (matches.length > 0) {
        if (
          !data.some((item) => idExtractor(item) === idExtractor(matches[0]))
        ) {
          setValue("");
          onChange([...data, matches[0]]);
        } else {
          setError("La valeur existe déjà.");
        }
      } else {
        setError("La valeur n'existe pas.");
      }
    } else {
      setError("La valeur est trop courte.");
    }
  };
  const onRemove = (id) => () => {
    onChange(data.filter((item) => idExtractor(item) !== id));
  };
  const onAdd = (item) => () => {
    setValue("");
    setSuggestions(
      suggestions.filter(
        (suggestion) => idExtractor(suggestion) !== idExtractor(item)
      )
    );
    onChange([...data, item]);
  };
  return (
    <View>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      {suggestions.length > 0 && (
        <View style={styles.values}>
          <Text>Suggestions : </Text>
          {suggestions.map((suggestion) => (
            <View key={idExtractor(suggestion)} style={styles.value}>
              <TouchableOpacity onPress={onAdd(suggestion)}>
                <Tag
                  label={renderLabel(suggestion)}
                  color={colorExtractor(suggestion)}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
      <View style={styles.values}>
        {data.map((item) => (
          <View key={idExtractor(item)} style={styles.value}>
            <TouchableOpacity onPress={onRemove(idExtractor(item))}>
              <Tag label={renderLabel(item)} color={colorExtractor(item)} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

export default Select;

const Identity = (item) => item;
const Empty = () => [];
const Undefined = () => null;

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
