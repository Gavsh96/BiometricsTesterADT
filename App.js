import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import AccountCreatedPage from "./pages/AccountCreatedPage";
import 'react-native-gesture-handler';
import { View } from "react-native";

// Import other screens if you have


function App() {
  const [currentScreen, setCurrentScreen] = useState('Login');

  const switchScreen = (screenName) => {
    setCurrentScreen(screenName);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {currentScreen === 'Login' && <LoginPage switchScreen={switchScreen} />}
      {currentScreen === 'SignUp' && <SignUpPage switchScreen={switchScreen} />}
      {currentScreen === 'Home' && <HomePage switchScreen={switchScreen} />}
      {currentScreen === 'AccCreated' && <AccountCreatedPage switchScreen={switchScreen} />}
    </View>
  );
}

export default App;
