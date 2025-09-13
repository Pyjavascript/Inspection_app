import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
const Register = ({ navigation }) => {
    const [text, setText] = useState('');
    
      const RegisterSubmit = () => {
        console.log('Register Submit');
        navigation.navigate('Dashboard');
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
            <View style={{gap:20}}>
                <Text style={styles.welcomeText}>
              Hello! Register to get started
            </Text>
            <View>
                <TextInput
              style={styles.input}
              placeholder="Enter your username"
              placeholderTextColor={'#999'}
              value={text}
              onChangeText={setText}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your ID"
              placeholderTextColor={'#999'}
              value={text}
              onChangeText={setText}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={'#999'}
              value={text}
              onChangeText={setText}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor={'#999'}
              value={text}
              onChangeText={setText}
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#22659c',
                padding: 15,
                borderRadius: 8,
                alignItems: 'center',
              }}
              onPress={RegisterSubmit}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                Register
              </Text>
            </TouchableOpacity>
            </View>
            </View>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Text>
                Already have an account?{' '}
                <Text
                  style={{ color: '#007bff' }}
                  onPress={() => {
                    navigation.navigate('Login');
                  }}
                >
                  Login
                </Text>
              </Text>
            </View>
          </View>
        </View>
  )
}

export default Register


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
    alignItems: 'start',
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
    fontWeight: 'light',
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
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
});
