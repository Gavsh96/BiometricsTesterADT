import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput"; // Assuming this is a custom component
import axios from 'axios';
import Button from "../components/Button";
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons from react-native-vector-icons

const SignUpPage = ({ switchScreen }) => {

    // State for sign-up form fields and validation
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [gender, setGender] = useState("");
    const [dobDay, setDobDay] = useState("");
    const [dobMonth, setDobMonth] = useState("");
    const [dobYear, setDobYear] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    // Function to handle sign-up submission
    const handleSignUp = () => {
        const user = {
            firstName,
            lastName,
            email,
            password,
            mobileNumber,
            gender,
            dateOfBirth: `${dobYear}-${dobMonth}-${dobDay}`
        };

        axios.post('http://64.235.41.120:8080/api/users/register', user)
          .then(response => {
              console.log(response.data); // Success message
              switchScreen('AccCreated');
          })
          .catch(error => {
              console.error('Error registering user:', error.message);
              // Handle error, e.g., display error message to user
          });
    };

    // useEffect to validate form on field change
    useEffect(() => {
        // Validate form fields
        if (firstName && lastName && email && password && mobileNumber && gender && dobDay && dobMonth && dobYear) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [firstName, lastName, email, password, mobileNumber, gender, dobDay, dobMonth, dobYear]);

    return (
      <View style={styles.container}>
          {/* Purple arrow button to go back to the previous page */}
          <TouchableOpacity style={styles.backButton} onPress={() => switchScreen('Login')}>
              <Icon name="arrow-back" size={35} color="#8A2BE2" />
          </TouchableOpacity>
          <Text style={styles.title}>Create an Account</Text>
          {/* Sign-up form fields */}
          <Input
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First Name"
            icon="person-outline" // Add an icon
            color="#8A2BE2"
            placeholderTextColor="#8A2BE2"
            inputStyle={styles.inputField}
          />
          <Input
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last Name"
            icon="person-outline" // Add an icon
            color="#8A2BE2"
            placeholderTextColor="#8A2BE2"
            inputStyle={styles.inputField}
          />
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address" // Use email keyboard type
            icon="mail-outline" // Add an icon
            color="#8A2BE2"
            placeholderTextColor="#8A2BE2"
            inputStyle={styles.inputField}
          />
          <PasswordInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            icon="lock-closed-outline" // Add an icon
            color="#8A2BE2"
            placeholderTextColor="#8A2BE2"
            inputStyle={styles.inputField}
          />
          <Input
            value={mobileNumber}
            onChangeText={setMobileNumber}
            placeholder="Mobile Number"
            keyboardType="phone-pad" // Use phone keyboard type
            icon="call-outline" // Add an icon
            color="#8A2BE2"
            placeholderTextColor="#8A2BE2"
            inputStyle={styles.inputField}
          />
          <View style={styles.genderContainer}>
              <Text style={styles.genderLabel}>Gender:</Text>
              <View style={styles.genderPicker}>
                  <TouchableOpacity
                    style={[styles.genderOption, gender === "male" && styles.selectedGenderOption]}
                    onPress={() => setGender("male")}
                  >
                      <Text style={styles.genderOptionText}>Male</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.genderOption, gender === "female" && styles.selectedGenderOption]}
                    onPress={() => setGender("female")}
                  >
                      <Text style={styles.genderOptionText}>Female</Text>
                  </TouchableOpacity>
              </View>
          </View>
          {/* Date of Birth */}
          <View style={styles.dobContainer}>
              <TextInput
                style={styles.dobInput}
                value={dobDay}
                onChangeText={setDobDay}
                placeholder="DD"
                keyboardType="numeric"
                maxLength={2}
                placeholderTextColor="#8A2BE2" // Purple placeholder text color
              />
              <Text style={styles.dobSeparator}>/</Text>
              <TextInput
                style={styles.dobInput}
                value={dobMonth}
                onChangeText={setDobMonth}
                placeholder="MM"
                keyboardType="numeric"
                maxLength={2}
                placeholderTextColor="#8A2BE2" // Purple placeholder text color
              />
              <Text style={styles.dobSeparator}>/</Text>
              <TextInput
                style={styles.dobInput}
                value={dobYear}
                onChangeText={setDobYear}
                placeholder="YYYY"
                keyboardType="numeric"
                maxLength={4}
                placeholderTextColor="#8A2BE2" // Purple placeholder text color
              />
          </View>

          <Button title="Sign Up" onPress={handleSignUp} disabled={!isFormValid} />
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000", // Black background color
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#8A2BE2", // Purple color
    },
    inputField: {
        backgroundColor: "#333333", // Dark grey background color
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        color: "#FFFFFF", // White text color
        height: 50,
        marginBottom: 10, // Added margin bottom
        width: "100%", // Full width
    },
    genderContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    genderLabel: {
        marginRight: 10,
    },
    genderPicker: {
        flexDirection: "row",
    },
    genderOption: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#ccc",
        marginRight: 10,
    },
    genderOptionText: {
        fontSize: 16,
    },
    selectedGenderOption: {
        backgroundColor: "#8A2BE2",
        borderColor: "#8A2BE2",
    },
    dobContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15, // Increased spacing
    },
    dobInput: {
        flex: 1,
        height: 50,
        backgroundColor: "#646161",
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        marginRight: 5,
        color: "#8A2BE2",
        marginBottom: 10,// Purple text color
    },
    dobSeparator: {
        fontSize: 20,
        marginHorizontal: 5,
    },
    backButton: {
        position: 'absolute',
        top: 30,
        left: 20,
    },
});

export default SignUpPage;
