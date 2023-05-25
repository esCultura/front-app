import { View, Text, StyleSheet,ScrollView, Image, Modal,  TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {shareAsync} from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { simpleFetch } from "../utils/utilFunctions";
import XCircleFill from 'react-native-bootstrap-icons/icons/x-circle-fill';
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function BtnPdf({ navigation, children }) {
    const { t } = useTranslation();
    const [jo, setJo] = useState(null);
    const [llistaVisible, setLlistaVisible] = useState(false);
    const [esdeveniments, setEsdeveniments] = useState([]);
      
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
            for (let i = 0; i < data.length; i++) {
                const assistencies = data[i];
                reserves.push(assistencies);
              }

              setEsdeveniments(reserves);        
              }
        } catch (error) {
          console.log("error en agafar dades locals, token error: ", error);
        }
      }
      _retrieveData();
    }, []);
    
    const fetchLlista = async () => {
      console.log("jooooooooooo", jo);
        let endPoint = `assistencies/?perfil=${jo}`;
        const data = await simpleFetch(endPoint, "GET", "")
        const reserves = [];
        for (let i = 0; i < data.length; i++) {
            const assistencies = data[i];
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
                <Text > {t('Descarrega pdf')} </Text>
            </TouchableOpacity>
        </View>
        <Modal visible={llistaVisible } animationType="slide">
                
        <TouchableOpacity onPress={() => {setLlistaVisible(false); }} style={styles.back}>
            <XCircleFill color="red" width={145} height={145} />
        </TouchableOpacity>
        <ScrollView  contentContainerStyle={styles.llistat}>
                {
                esdeveniments.map(s => 
                    <TouchableOpacity key={s} style={styles.listItem} onPress={() => { fetchQR(s.uuid); }}>
                    <Text style={styles.usuari}>  {s.uuid} esdev  </Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    editButton: {
        backgroundColor: 'aqua',
        marginRight: 'auto',
        marginVertical: 10,
        padding: 20,
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
});