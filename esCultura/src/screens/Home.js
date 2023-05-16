import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import Esdeveniment from "../components/Esdeveniment";
import { StatusBar } from "react-native";
import React, { useState, useEffect } from "react";
import Screen from "../components/Screen";
import Featured from "../components/Featured";

export default function Home(props) {
  const [showDetails, setShowDetails] = useState(true);
  const [llista, setLlista] = useState(0);

  useEffect(() => {
    const fetchEsdev = async () => {
      try {
        const response = await fetch(
          "http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/esdeveniments/"
        );
        if (!response.ok) {
          throw new Error("Error al obtener el likes");
        }
        const data = await response.json();
        setLlista(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEsdev();
  }, []);

  const handlePress = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Screen navigation={props.navigation}>
      <Featured />
      <StatusBar style="auto" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 5,
    alignItems: "left",
    justifyContent: "left",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    width: 80,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
