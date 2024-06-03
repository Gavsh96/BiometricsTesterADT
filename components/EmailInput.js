// EmailInput.js
import React from "react";
import { TextInput, StyleSheet, View } from "react-native";

const EmailInput = ({ value, onChangeText, placeholder }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#9b59b6" // Purple placeholder color
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: "80%",
    backgroundColor: "#646161",
    borderRadius: 25,
    paddingHorizontal: 20,
    marginTop: 10,
    fontSize: 16,
  },
});

export default EmailInput;
