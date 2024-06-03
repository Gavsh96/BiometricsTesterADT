import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from "../components/Button";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";

import axios from 'axios';

const LoginPage = ({ switchScreen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        switchScreen('Home');
      }
    } catch (error) {
      console.error('Error checking login status:', error.message);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      // Display alert if email or password is empty
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post('http://64.235.41.120:8080/api/users/login', {
        email: email,
        password: password
      });

      if (response.status === 200) {
        console.log("Logged in successfully");
        // Store user ID in AsyncStorage
        await AsyncStorage.setItem('userId', response.data.id.toString());
        switchScreen('Home');
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>BiometricApp</Text>
      <View style={styles.form}>
        <EmailInput value={email} onChangeText={setEmail} placeholder="Email" />
        <PasswordInput value={password} onChangeText={setPassword} placeholder="Password" />
        <Button title="Login" onPress={handleLogin} style={styles.button} />
        <Button title="Create New Account" onPress={() => switchScreen('SignUp')} style={styles.button} />
      </View>
    </View>
  );
};

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Dark background color
    width: screenWidth, // Ensure background fills whole screen
    height: screenHeight, // Ensure background fills whole screen
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff', // White text color
    marginBottom: 50,
  },
  form: {
    width: '80%',
    maxWidth: 400,
    alignItems: 'center', // Center the form horizontally
  },
  button: {
    marginTop: 20,
    backgroundColor: '#8A2BE2', // Instagram blue color
    width: '100%', // Make button full width
  },
});

export default LoginPage;
