import { View, Text, StyleSheet,ScrollView, Image, Modal,  TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {shareAsync} from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { simpleFetch } from "../utils/utilFunctions";
import XCircleFill from 'react-native-bootstrap-icons/icons/x-circle-fill';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Esdeveniment  from '../components/Esdeveniment'; 
import Icon from 'react-native-vector-icons/FontAwesome';



export default function BtnPdf({ navigation, children }) {
    const { t } = useTranslation();
    const [jo, setJo] = useState(null);
    const [llistaVisible, setLlistaVisible] = useState(false);
    const [esdeveniments, setEsdeveniments] = useState([]);
    const [infoEsdev, setInfoEsdev] = useState([]);
    const [screenLoaded, setScreenLoaded] = useState(false);
      
    const handleInfoCompletaClose = () => {
      setScreenLoaded(!screenLoaded);
    };

    useEffect(() => {
      async function _retrieveData() {
        try {
          const value = await AsyncStorage.getItem("token");
          if (value !== null) {
            let result = JSON.parse(value);
            await setJo(result.user);
            console.log("es guarda", result.user);
            let endPoint = `assistencies/?perfil=${result.user}`;
            const data = await simpleFetch(endPoint, "GET", "")
            const reserves = [];
            const esdev = [];
            for (let i = 0; i < data.length; i++) {
                const assistencies = data[i];
                console.log("assis", data[i]);
                reserves.push(assistencies);
                endPoint = 'esdeveniments?codi='+data[i].esdeveniment;
                const esd = await simpleFetch(endPoint, "GET", "");
                esd.uuid = data[i].uuid;
                esdev.push(esd);
              }
              setInfoEsdev(esdev);
              console.log("esdev", esdev);
              setEsdeveniments(reserves);        
              }
        } catch (error) {
          console.log("error en agafar dades locals, token error: ", error);
        }
      }
      _retrieveData();
    }, []);
    
   const fetchEsdevenimnent = async () => {
      let endPoint= ""

   }
   
    const fetchLlista = async () => {
      console.log("jooooooooooo", jo);
        let endPoint = `assistencies/?perfil=${jo}`;
        const data = await simpleFetch(endPoint, "GET", "")
        const reserves = [];
        for (let i = 0; i < data.length; i++) {
            const assistencies = data[i];
            console.log("assis", data[i]);
            reserves.push(assistencies);
          }

          setEsdeveniments(reserves);          
  };
    
    const saveBlob = async (blob, filename) => {
        try {
          const reader = new FileReader();
          reader.onloadend = async () => {
            const base64 = reader.result.split(',')[1];
            const fileUri = FileSystem.documentDirectory + filename;
            await FileSystem.writeAsStringAsync(fileUri, base64, { encoding: FileSystem.EncodingType.Base64 });
            await shareAsync(fileUri);
            console.log('PDF file saved successfully!');
          };
          reader.readAsDataURL(blob);
          console.log('Blob saved successfully!');
        } catch (error) {
          console.log('Error saving blob:', error);
        }
    };

      const fetchQR = async (uuid) => {
        let endPoint = `assistencies/${uuid}`;
        const data = await simpleFetch(endPoint, "GET", "")
        //const r = await data.json();
        console.log(data.hora);
        fetchEntrades(data);
             
  };

    const fetchEntrades = async (data) => {
      console.log(data);
        try {
            const response = await fetch('https://us-central1-apilicicat.cloudfunctions.net/generatePDF', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body:  JSON.stringify({
                  qr: data.qr,
                  foto: data.foto,
                  esdeveniment: data.esdeveniment,
                  data: data.data,
                  hora: data.hora,
                  nom: data.nom,
                }),
            });
            if (response.ok) {
                //const r = await response.text();
                //console.log("text: ",r);
                const pdfBlob = await response.blob();
                console.log("blob: ", pdfBlob);
                await saveBlob(pdfBlob, "entrada.pdf");
                
            } else {
              console.error('Error en la respuesta del servidor:', response.status);
            }
        } catch (error) {
          console.error("aaaaaa: ", error);
        }
    }

        return (
        <>
        <View>
            <TouchableOpacity style={styles.editButton} onPress={() => { setLlistaVisible(true);}}>
                <Text > {t('Descarregapdf')} </Text>
            </TouchableOpacity>
        </View>
        <Modal visible={llistaVisible } animationType="slide">
                
        <TouchableOpacity onPress={() => {setLlistaVisible(false); }} style={styles.back}>
            <XCircleFill color="red" width={145} height={145} />
        </TouchableOpacity>
        <ScrollView  contentContainerStyle={styles.llistat}>
                {
                infoEsdev.map(s => 
                  < View style={[styles.row]} >
                   
                    <Esdeveniment 
                    key ={s[0].codi}
                    back={() => handleInfoCompletaClose()}
                    type={s[0].tematiques.map(tema => tema.nom)}
                    desc={s[0].descripcio}
                    title={s[0].nom}
                    preu={s[0].entrades}
                    dateFi = {s[0].dataFi.slice(0,10)}
                    dateIni = {s[0].dataIni.slice(0,10)}
                    location = {s[0].espai}
                    codi = {s[0].codi}
                    source = {"http://agenda.cultura.gencat.cat"+ s[0].imatges_list[0]}
                    perfil = {jo}
                            />
                    <TouchableOpacity key={s} style={styles.button} onPress={() => { fetchQR(s.uuid); }}>
                         <Icon name="download" size={24} color={'black'} />
                     </TouchableOpacity>
                  </View >
                )}
            </ScrollView>
        </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    editButton: {
      backgroundColor: '#b2cafa',
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 20,
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      width: 170,
      marginRight: 20, 
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
    listItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
      },
      usuari: {
        fontSize: 16,
      },
      card: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      row: {
        position: 'relative',
        // Estilos para el contenedor de la tarjeta del evento
      },
      button: {
        position: 'absolute',
        top: 120, // Ajusta el valor según sea necesario
        right: 10,
      },
});