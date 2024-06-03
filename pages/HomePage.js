import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";
import axios from 'axios';
import Button from "../components/Button";
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';

const Biometrics = new ReactNativeBiometrics()
const HomePage = ({ switchScreen }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        authenticateAndFetchData();
        //fetchUserData();
    }, []);

    const authenticateAndFetchData = async () => {
        try {
            const hasBiometrics = await Biometrics.isSensorAvailable();
            const hasSecureDevice = await DeviceInfo.isPinOrFingerprintSet();

            if (hasBiometrics || hasSecureDevice) {
                Biometrics.biometricKeysExist()
                  .then(async (biometricKeysExist) => {
                      if (biometricKeysExist) {
                          Biometrics.simplePrompt({ promptMessage: 'Authenticate to view your data' })
                            .then(async () => {
                                fetchUserData();
                            })
                            .catch(() => {
                                console.log('Biometric authentication failed.');
                                promptForPassword();
                            });
                      } else {
                          console.log('Biometric keys do not exist.');
                          promptForPassword();
                      }
                  });
            } else {
                console.log('No biometrics or secure device detected.');
                promptForPassword();
            }
        } catch (error) {
            console.error('Error checking biometric support:', error.message);
            promptForPassword();
        }
    };

    const promptForPassword = async () => {
        try {
            const isDeviceSecure = await DeviceInfo.isPinOrFingerprintSet();
            if (isDeviceSecure) {
                Biometrics.simplePrompt({ promptMessage: 'Authenticate to view your data' })
                  .then(async () => {
                      fetchUserData();
                  })
                  .catch(() => {
                      console.log('Device password authentication failed.');
                      switchScreen('Login');
                  });
            } else {
                console.log('Device password is not set.');
                fetchUserData();
            }
        } catch (error) {
            console.error('Error checking device security:', error.message);
            switchScreen('Login');
        }
    };

    const fetchUserData = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            if (userId) {
                const response = await axios.get(`http://64.235.41.120:8080/api/users/${userId}`);
                setUserData(response.data);
            }
        } catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userId');
            switchScreen('Login');
            console.log('Logged out');
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };

    const formatDateOfBirth = (dob) => {
        const date = new Date(dob);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    return (
      <View style={styles.container}>
          <Text style={styles.welcomeText}>Welcome!</Text>
          {userData && (
            <View style={styles.userCard}>
                <Text style={styles.welcomeText}>{userData.firstName} {userData.lastName}</Text>
                <View style={styles.userInfo}>
                    <Text style={styles.userInfoLabel}>Email:</Text>
                    <Text style={styles.userInfoText}>{userData.email}</Text>
                </View>
                <View style={styles.userInfo}>
                    <Text style={styles.userInfoLabel}>Mobile Number:</Text>
                    <Text style={styles.userInfoText}>{userData.mobileNumber}</Text>
                </View>
                <View style={styles.userInfo}>
                    <Text style={styles.userInfoLabel}>Gender:</Text>
                    <Text style={styles.userInfoText}>{userData.gender}</Text>
                </View>
                <View style={styles.userInfo}>
                    <Text style={styles.userInfoLabel}>Date of Birth:</Text>
                    <Text style={styles.userInfoText}>{formatDateOfBirth(userData.dateOfBirth)}</Text>
                </View>
            </View>
          )}
          <Button title="Logout" onPress={handleLogout} />
      </View>
    );
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000", // Light background color
        alignItems: "center",
        justifyContent: "center",
        width: screenWidth, // Ensure background fills whole screen
        height: screenHeight, // Ensure background fills whole screen
    },
    userCard: {
        backgroundColor: "#333", // Dark background color for the user card
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        width: '80%', // Width of the user card
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: '#8A2BE2', // Purple color for text
    },
    userInfo: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    userInfoLabel: {
        fontWeight: 'bold',
        color: '#FFFFFF', // White color for labels
        marginRight: 10,
    },
    userInfoText: {
        color: '#FFFFFF', // White color for user information
    },
});

export default HomePage;
