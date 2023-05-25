import {
  Modal,
  StyleSheet,
  Image,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { simpleFetch } from "../utils/utilFunctions";


export default function Home(props) {
  const [showDetails, setShowDetails] = useState(true);
  const [llista, setLlista] = useState(0);
  const [imageUri, setImageUri] = useState(null);

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
    async function _retrieveData () {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
          let result = JSON.parse(value);
          console.log("token stored: ", result);
        }
      } catch (error) {
        console.log("error en agafar dades locals, token error: ", error);
      }
    };
    _retrieveData ();
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
  imatgePerfil: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
},
});
