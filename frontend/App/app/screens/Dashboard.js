import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      return Alert.alert("Error", "No token found. Please login again.");
    }

    const res = await axios.get(
      "https://inspection-app-mapv.onrender.com/api/auth/me",
      {
        headers: {
          Authorization: `Bearer ${token}`, // attach token
        },
      }
    );

    console.log("User Info:", res.data);
    setUserInfo(res.data);
  } catch (err) {
    console.error("User info error:", err);
    Alert.alert("Error", "Could not fetch user info.");
  }
};


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to Dashboard</Text>
      {userInfo && (
        <Text style={{ marginTop: 20 }}>
          Hello, {userInfo.username} ({userInfo.designation})
        </Text>
      )}
    </View>
  );
}
