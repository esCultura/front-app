import {
  Modal,
  StyleSheet,
  Image,
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
import AsyncStorage from "@react-native-async-storage/async-storage";

async function CarregarAssistencies(token, user) {
  let host = "http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/";
  let hh = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
  };
  return new Promise((resolve, reject) => {
    fetch(host + `seguiments/?seguidor=${user}`, hh)
      .then((res) => res.json())
      .then(async (seguiments) => {
        let assistencies = [];
        let userAssists = [];
        for (let i = 0; i < seguiments.length; i++) {
          let res = await fetch(
            host + `assistencies/?perfil=${seguiments[i].seguit}`,
            hh
          );
          let assists = await res.json();
          userAssists.push(...assists);
        }

        for (let i = 0; i < userAssists.length; i++) {
          let esdR = await fetch(
            host + `esdeveniments/${userAssists[i].esdeveniment}`,
            hh
          );
          let esd = await esdR.json();
          let pfR = await fetch(
            host + `usuaris/perfils/${userAssists[i].perfil}`,
            hh
          );
          let pf = await pfR.json();

          assistencies.push({
            e_codi: esd.codi,
            e_titol: esd.nom,
            e_loc: esd.espai,
            e_type: esd.tematiques.map((tema) => tema.nom),
            e_data: esd.dataIni,
            e_dataFi: esd.dataFi,
            e_imatge: esd.imatges_list[0],
            e_preu: esd.preu,
            e_desc: esd.descripcio,
            p_user: pf.user,
            p_imatge: pf.imatge,
            p_nom: pf.username,
          });
        }
        resolve(assistencies);
      })
      .catch((err) => console.error(err));
  });
}

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

    fetchEsdev();
    async function _retrieveData() {
      try {
        const value = await AsyncStorage.getItem("token");
        if (value !== null) {
          let result = JSON.parse(value);
          CarregarAssistencies(result.token, result.user).then(
            (assistencies) => {
              setAmics(assistencies);
            }
          );
        }
      } catch (error) {
        console.log("error en agafar dades locals, token error: ", error);
      }
    }
    _retrieveData();
  }, []);

  const editFoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      console.log("foto", result.assets[0].uri);
      onImatgeChange(result.assets[0].uri);
    }
  };

  const onImatgeChange = async (newImage) => {
        let endPoint = 'usuaris/perfils/jo/';
          const formData = new FormData();
            formData.append('imatge', {
                uri: newImage,
                type: 'image/jpeg', // o el tipo de imagen que sea
                name: 'image.jpg', 
            });

              console.log("form", formData);
        const response = await simpleFetch(endPoint, "PUT", {imatge:formData})
        const r = await response.text();
        console.log("res", r);
      }
  

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
            amics.map((amic, i) => (
              <AmicCard info={amic} navigation={props.navigation} key={i} />
            ))
          ) : (
            <Text>Carregant ...</Text>
          )}
        </ScrollView>
      </View>
      <StatusBar style="auto" />
      <View style={styles.leftContainer}> 
            <Image
                source={
                    imageUri
                    ? { uri: imageUri }
                    : require('../../assets/profile-base-icon.png')
                }
                style={styles.imatgePerfil}
            />
            <TouchableOpacity style={styles.FotoButton} onPress={editFoto}>
                { <Text> editphoto </Text> }
            </TouchableOpacity>
            </View>
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
