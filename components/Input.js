import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = ({ value, onChangeText, placeholder, keyboardType, placeholderTextColor, textColor }) => {
    return (
      <TextInput
        style={[styles.input, { color: textColor }]} // Added support for text color
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor} // Added support for placeholder color
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
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

export default Input;
