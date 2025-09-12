import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import { BASE_URL } from "../config/api";

export default function SeeEntriesScreen() {
  const [entries, setEntries] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`${BASE_URL}/reports`)
//       .then((res) => setEntries(res.data))
//       .catch((err) => console.log(err));
//   }, []);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.customer}</Text>
      <Text style={styles.cell}>{item.partNumber}</Text>
      <Text style={styles.cell}>{item.qa}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.cell}>Customer</Text>
        <Text style={styles.cell}>Part No</Text>
        <Text style={styles.cell}>QA</Text>
      </View>
      <FlatList data={entries} renderItem={renderItem} keyExtractor={(item) => item._id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: { flexDirection: "row", borderBottomWidth: 1, paddingBottom: 5, backgroundColor: "#eee" },
  row: { flexDirection: "row", paddingVertical: 8, borderBottomWidth: 0.5 },
  cell: { flex: 1, textAlign: "center" },
});
