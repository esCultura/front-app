import Screen from "../components/Screen";
import { Text, ScrollView, View, Modal, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Image, Platform } from 'react-native';
import Esdeveniment from '../components/Esdeveniment';
import XCircleFill from 'react-native-bootstrap-icons/icons/x-circle-fill';
import { simpleFetch } from "../utils/utilFunctions";
import * as ImagePicker from 'expo-image-picker';

export default function Chat(updated) {
    const handleInfoCompletaClose = () => {
        setScreenLoaded(!screenLoaded);
      };

    const user = 3;
    const [llistaVisible, setLlistaVisible] = useState(false);
    const [esdeveniments, setEsdeveniments] = useState([]);
    const [infoPerfil, setInfoPerfil] = useState([]);
    const [screenLoaded, setScreenLoaded] = useState(updated);
    const [imageUri, setImageUri] = useState(null);
    const [trofeus, setTrofeus] = useState(null);

    useEffect(() => {

        const fetchPreferits = async () => {
            let endPoint = 'interessos/esdeveniments/?perfil=3';
            const data = await simpleFetch(endPoint, "GET", "");
            const reserves = [];
            for (let i = 0; i < data.length; i++) {
              const assistencies = data[i].esdeveniment;
              endPoint = 'esdeveniments?codi='+assistencies;
              const esd = await simpleFetch(endPoint, "GET", "");
              reserves.push(esd);
            }
            console.log("reserves", reserves);
            setEsdeveniments(reserves); 

        /*const fetchTrofeus = async () => {
            let endPoint = 'usuaris/perfils?user=3/estadistiques';
            const response = await simpleFetch(endPoint, "GET", "");
            if (response.length > 5) setTrofeus(bronce);
            if (response.length > 10) setTrofeus(plata);
            if (response.length > 15) setTrofeus(or);
            
        }*/
      };

  
      const fetchPerfil = async () => {
          let endPoint = 'usuaris/perfils?user=3';
          const data = await simpleFetch(endPoint, "GET", "")
          console.log("datos", data[2]);
          setInfoPerfil(data[2]);
          setImageUri(data[2].imatge);
      }

      fetchPerfil();
      fetchPreferits();
  }, [screenLoaded, updated]);

  const editFoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
      onImatgeChange(result.uri);
    }
  };

  const onImatgeChange = async (newImage) => {
        let endPoint = 'usuaris/perfils?user=3'
        const response = await simpleFetch(endPoint, "PUT", { imatge:newImage.uri });
    }

    return (
        <Screen>
            <Image
                source={
                    imageUri
                    ? { uri: imageUri }
                    : require('../../assets/profile-base-icon.png')
                }
                style={styles.imatgePerfil}
            />
            <TouchableOpacity style={styles.button} onPress={editFoto}>
                { <Text> ediar foto </Text> }
            </TouchableOpacity>
            
            <Text> Username: {infoPerfil.username} </Text>
            <Text> Email: {infoPerfil.email} </Text>

            <TouchableOpacity style={styles.button} onPress={() => {setLlistaVisible(true); }}>
                <Text > LlistaPreferits </Text>
            </TouchableOpacity>

            <Text> Trofeus </Text>

            <TouchableOpacity style={styles.button}>
                <Text > Logout </Text>
            </TouchableOpacity>

            <Modal visible={llistaVisible } animationType="slide">
        
                <TouchableOpacity onPress={() => {setLlistaVisible(false); setScreenLoaded(!screenLoaded)}} style={styles.back}>
                    <XCircleFill color="red" width={145} height={145} />
                </TouchableOpacity>
                <ScrollView  contentContainerStyle={styles.llistat}>
                {
                esdeveniments.map(esd => (
                <Esdeveniment 
                    key ={esd[0].codi}
                    back={() => handleInfoCompletaClose()}
                    type={esd[0].tematiques.map(tema => tema.nom)}
                    desc={esd[0].descripcio}
                    title={esd[0].nom}
                    preu={esd[0].entrades}
                    dateFi = {esd[0].dataFi.slice(0,10)}
                    dateIni = {esd[0].dataIni.slice(0,10)}
                    location = {esd[0].espai}
                    codi = {esd[0].codi}
                    source = {"http://agenda.cultura.gencat.cat"+ esd[0].imatges_list[0]}
                            />
                    ))}
                    </ScrollView>
                </Modal>


        </Screen>
        

    );

}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'green',
        padding:10,
        borderRadius: 5,
        shadowOffset: { width: 2 , height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        width: 130,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    llistat: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },
    back: {
        zIndex: 1,
        position: 'absolute',
        top: 6,
        left: 6,
        width: 16,
        height: 16,
    },
    imatgePerfil: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 20,
    }
});