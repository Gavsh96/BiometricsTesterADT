import React from "react";
import { View, Text, StyleSheet, Button, Dimensions } from "react-native";

const AccountCreatedPage = ({ switchScreen }) => {
    const handleLogin = () => {
        switchScreen('Login'); // Navigate back to the login page
    };

    return (
      <View style={styles.container}>
          <Text style={styles.title}>Account Created Successfully!</Text>
          <Text style={styles.text}>Your account has been successfully created.</Text>
          <Button title="Login" onPress={handleLogin} color=" " />
      </View>
    );
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
        width: screenWidth, // Ensure background fills whole screen
        height: screenHeight, // Ensure background fills whole screen
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#8A2BE2", // Purple color
    },
    text: {
        fontSize: 16,
        marginBottom: 20,
        color: "#666", // Medium text color
    },
});

export default AccountCreatedPage;
