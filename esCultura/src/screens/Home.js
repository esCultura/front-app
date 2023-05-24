import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  ScrollView,
} from "react-native";
import Esdeveniment from "../components/Esdeveniment";
import { StatusBar } from "react-native";
import React, { useState, useEffect } from "react";
import Screen from "../components/Screen";
import Featured from "../components/Featured";
import { simpleFetch } from "../utils/utilFunctions";
import AmicCard from "../components/AmicCard";

export default function Home(props) {
  const [showDetails, setShowDetails] = useState(true);
  const [llista, setLlista] = useState(0); // Esdeveniments destacats
  const [amics, setAmics] = useState([]);

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

    const fetchAmics = async () => {
      const seguiments = await simpleFetch(
        `seguiments/?seguidor=${28}`,
        "GET",
        ""
      );
      let a = [];
      let perfils = {};
      seguiments.forEach(async (seguiment) => {
        let assistencies = await simpleFetch(
          `assistencies/?perfil=${seguiment.seguit}`
        );
        a.push(...assistencies);
      });
      setAmics(a);
    };

    // fetchEsdev();
    // fetchAmics();
  }, []);

  const handlePress = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Screen navigation={props.navigation}>
      <Featured />
      <View style={styles.viewAmics}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "left",
            width: "100%",
          }}
        >
          Què fan els amics?
        </Text>
        <ScrollView contentContainerStyle={styles.scrollAmics}>
          {amics.length > 0 ? (
            amics.map((amic, i) => <AmicCard info={amic} key={i} />)
          ) : (
            <Text>Carregant ...</Text>
          )}
        </ScrollView>
      </View>
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
  scrollAmics: {
    width: "100%",
    display: "flex",
    gap: 15,
  },
  viewAmics: {
    width: "90%",
    display: "flex",
    gap: 10,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
  },
});
