import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Register = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState("");
  const [username, setUsername] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const RegisterSubmit = async () => {
  // 🔹 Frontend validation
  if (!selectedRole || !username || !companyId || !password || !confirmPassword) {
    return Alert.alert("Validation Error", "All fields are required.");
  }

  if (password !== confirmPassword) {
    return Alert.alert("Validation Error", "Passwords do not match.");
  }

  try {
    const payload = {
      designation: selectedRole,
      username: username,
      companyId: companyId,
      password: password,
    };

    console.log("Register Payload:", payload);

    const res = await axios.post(
      "https://inspection-app-mapv.onrender.com/api/auth/register",
      payload
    );

    if (res.data.message === "User Registered Successfully") {
      console.log("Register Success", res.data);

      // 🎯 save token to AsyncStorage
      await AsyncStorage.setItem("token", res.data.token);

      Alert.alert("Registration Successful", "Welcome aboard!", [
        { text: "OK", onPress: () => navigation.replace("Dashboard") },
      ]);
    } else {
      Alert.alert("Register Failed", res.data.message || "Please try again.");
    }
  } catch (err) {
    console.error(err);
    Alert.alert("Error", "Something went wrong. Please try again.", err);
  }
};


  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text
          style={styles.topText}
          onPress={() => {
            navigation.navigate("Start");
          }}
        >
          Go Back
        </Text>
      </View>

      <View style={styles.form}>
        <View style={{ gap: 20 }}>
          <Text style={styles.welcomeText}>Hello! Register to get started</Text>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Select Role:</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#00000014",
                borderRadius: 8,
                overflow: "hidden",
                marginBottom: -10,
              }}
            >
              <Picker
                selectedValue={selectedRole}
                onValueChange={(itemValue) => setSelectedRole(itemValue)}
                style={{
                  height: 50,
                  width: "100%",
                  color: selectedRole ? "#000" : "#999",
                }}
              >
                <Picker.Item label="Choose a role..." value="" />
                <Picker.Item label="Manager" value="manager" />
                <Picker.Item label="Employee" value="employee" />
              </Picker>
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            placeholderTextColor={"#999"}
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter your ID"
            placeholderTextColor={"#999"}
            value={companyId}
            onChangeText={setCompanyId}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={"#999"}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor={"#999"}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity style={styles.registerBtn} onPress={RegisterSubmit}>
            <Text style={styles.registerBtnText}>Register</Text>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text>
            Already have an account?{" "}
            <Text
              style={{ color: "#007bff" }}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              Login
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  top: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 20,
    paddingTop: 40,
  },
  topText: {
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#000",
    padding: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#00000014",
    padding: 9,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#f5f5f51e",
  },
  form: {
    marginTop: 50,
    flexDirection: "column",
    gap: 15,
  },
  registerBtn: {
    backgroundColor: "#22659c",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  registerBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
