import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Start");
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🏭 Manufacturing Co.</Text>
      <ActivityIndicator size="large" color="#007bff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  logo: { fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "#333" },
});
