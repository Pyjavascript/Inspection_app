import React from "react";
import { View, Button, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="➕ Add Entry" onPress={() => navigation.navigate("AddEntry")} />
      <Button title="📋 See Entries" onPress={() => navigation.navigate("SeeEntries")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", gap: 20, padding: 20 },
});
