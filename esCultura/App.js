import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Base from "./src/screens/Base";
import Settings from "./src/screens/Settings";

import Login from "./src/screens/Login";
import SingUp from "./src/screens/SingUp";

import i18n from "./src/utils/translateFunctions";

const Stack = createNativeStackNavigator();
const initI18n = i18n;

export default function App() {
  //isSignedIn
  const [isSignedIn, setIsSignedIn] = useState(true);

  useEffect(() => {
    console.log("isSignedIn: ", isSignedIn);
  }, [isSignedIn]);

  const onLogin = (value) => {
    setIsSignedIn(value);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
      >
        {isSignedIn ? (
          <Stack.Group>
            <Stack.Screen name="Base" component={Base} />
            <Stack.Screen name="Settings">
              {(props) => <Settings {...props} onLogin={onLogin} />}
            </Stack.Screen>
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="Login">
              {(props) => <Login {...props} onLogin={onLogin} />}
            </Stack.Screen>
            <Stack.Screen name="SingUp">
              {(props) => <SingUp {...props} onLogin={onLogin} />}
            </Stack.Screen>
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
