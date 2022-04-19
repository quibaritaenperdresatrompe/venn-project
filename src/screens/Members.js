import { View, ScrollView, StyleSheet, Text } from "react-native";
import React, { useState, useEffect } from "react";

import data from "../../assets/data.json";
import Avatar from "../components/Avatar";
import Button from "../components/Button";

function Members() {
  return (
    <View>
      <View style={styles.header}>
        <input type="text" />
        <Button style={styles.headerCpmnt} title="Rechercher" />
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        {data.members.map((member) => (
          <View
            style={styles.avatar}
            key={`${member.firstname}${member.lastname}`}
          >
            <Avatar
              label={member.firstname[0].toLocaleUpperCase()}
              color={member.favoriteColor}
            />
          </View>
        ))}
        <View style={styles.footer}>
          <Button title="Inviter" />
        </View>
      </ScrollView>
    </View>
  );
}

export default Members;

const styles = StyleSheet.create({
  list: {
    backgroundColor: "grey",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  avatar: {
    margin: 16,
  },
  footer: {
    backgroundColor: "grey",
    padding: 32,
  },
  header: {
    backgroundColor: "grey",
    flexDirection: "row",
    padding: 32,
    justifyContent: "flex-end",
  },
  headerCpmnt: {
    padding: 32,
  },
});
