import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://anandengg.in/images/logo1.png' }}
        style={{ width: 300, height: 100, alignSelf: 'center'}}
      />
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')} // ya AddEntry
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 15,
            borderRadius: 8,
            alignItems: 'center',
            marginVertical: 5,
            borderColor: '#000',
            borderWidth: 1,
          }} // Transparent button style
          onPress={() => navigation.navigate('Register')} // ya AddEntry
        >
          <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 300,

  },
  bottomButtons: {
    flexDirection: 'column', // vertical stack
    justifyContent: 'flex-end', // parent ke bottom me
    marginBottom: 20, // bottom padding
  },
  button: {
    backgroundColor: '#22659c',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
    fontFamily: 'Poppins Regular', // buttons ke beech gap
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
