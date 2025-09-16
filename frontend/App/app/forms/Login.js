import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Login = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const LoginSubmit = async () => {
  try {
    const res = await axios.post(
      'https://inspection-app-mapv.onrender.com/api/auth/login',
      {
        companyId: userId,
        password: password,
      }
    );

    if (res.data.message === 'Login successful') {
      console.log('Login Success', res.data);

      // 🎯 save token to AsyncStorage
      await AsyncStorage.setItem("token", res.data.token);

      Alert.alert('Login Successful', 'Welcome back!', [
        { text: 'OK', onPress: () => navigation.replace('Dashboard') },
      ]);
    } else {
      Alert.alert('Login Failed', res.data.message || 'Invalid credentials');
    }
  } catch (err) {
    console.error("Login error:", err);
    Alert.alert('Error', 'Something went wrong. Please try again.');
  }
};


  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text
          style={styles.topText}
          onPress={() => {
            navigation.navigate('Start');
          }}
        >
          Go Back
        </Text>
      </View>

      <View style={styles.form}>
        <View style={{ gap: 20 }}>
          <Text style={styles.welcomeText}>
            Welcome back! Glad to see you, Again!
          </Text>

          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter your ID"
              placeholderTextColor={'#999'}
              value={userId}
              onChangeText={setUserId}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter your Password"
              secureTextEntry={true}
              placeholderTextColor={'#999'}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.loginBtn} onPress={LoginSubmit}>
              <Text style={styles.loginBtnText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text>
            Don’t have account?{' '}
            <Text
              style={{ color: '#007bff' }}
              onPress={() => {
                navigation.navigate('Register');
              }}
            >
              Register
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  top: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 20,
    paddingTop: 40,
  },
  topText: {
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#00000014',
    padding: 9,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#f5f5f51e',
  },
  form: {
    marginTop: 50,
    flexDirection: 'column',
    gap: 15,
  },
  loginBtn: {
    backgroundColor: '#22659c',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
