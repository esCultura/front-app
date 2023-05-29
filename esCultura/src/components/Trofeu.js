
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity, ScrollView, Linking, ActivityIndicator } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import React, {useState, useEffect} from 'react';



const bgcolor = '#3BDE4B';
import XCircleFill from 'react-native-bootstrap-icons/icons/x-circle-fill';

  
  
export default function Trofeu (props) {
  console.log("trofeus", props);
  const [popupVisible, setPopupVisible] = useState(false);
  const [premio, setPremio] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  const assistencies_passades = props.assistencies_passades;
  const interessos_esdeveniments= props.interessos_esdeveniments;
  const interessos_tematiques= props.interessos_tematiques;
  const interessos_valoracions= props.interessos_valoracions;
  const missatges_enviats= props.missatges_enviats;
  const reserves_enviats= props.reserves_enviats;
  const seguidors= props.seguidors;
  const seguits= props.seguits;
  const xats_participants= props.xats_participants;
  const valoracions = props.valoracions;

  const [premiosOtorgados, setPremiosOtorgados] = useState({
      "Principiant": false,
      "Amateur": false,
      "Culturista": false,
      "Dora la Exploradora": false,
      "Tadeo Jones": false, 
      "Indiana Jones": false,  
      "El polze tímid": false,  
      "El poze content": false, 
      "El poze d'or": false, 
      "Valoració consistent": false,  
      "Influència positiva": false, 
      "Aprenent ràpid": false, 
      "Cotorra": false,
      "Lloro": false,
      "Xarlatan": false,
      "Previngut": false, 
      "Esporuguit": false, 
      "Gurú": false, 
      "Popular": false,
      "Famos": false,
      "Influencer": false,
      "Fan": false,
      "Fan número 1": false,
      "Stalker": false,
      "Xataprenent": false,
      "XatMaster": false,
      "Xatadicte": false,
      "Visió global": false,
      "Present Conscient": false,
      "Ment crítica": false

    });
    
    const premios = [
      { nombre: "Principiant", imagen: require('../../assets/principiante.jpg'), descripcion: "Felicitats !! Has assistit a 5 esdeveniments" }, //0
      { nombre: "Amateur", imagen: require('../../assets/amateur.jpg') , descripcion: "Enhorabona !! Has assistit a 10 esdeveniments"},   //1
      { nombre: "Culturista", imagen: require('../../assets/culturista(1).jpg'), descripcion: "Màquina !! Has assistit a 15 esdeveniments"},  //2
      { nombre: "Dora la Exploradora", imagen: require('../../assets/dora.png') , descripcion: "Felicitats !! Has donat like a 5 esdeveniments"},  //3
      { nombre: "Tadeo Jones", imagen: require('../../assets/tadeo-jones.png'), descripcion: "Enhorabona !!  Has donat like a 10 esdeveniments"},  //4
      { nombre: "Indiana Jones", imagen: require('../../assets/indiana-jones.png'), descripcion: "Màquina !! Has donat like a 15 esdeveniments" },  //5
      { nombre: "El polze tímid", imagen: require('../../assets/niño.jpg') , descripcion: "Felicitats !! Has donat like a 5 categories"}, //6
      { nombre: "El polze content", imagen: require('../../assets/niña.jpg') , descripcion: "Enhorabona !! Has donat like a 10 categories"}, //7
      { nombre: "El polze d'or", imagen: require('../../assets/recommended.png') , descripcion: "Màquina !! Has donat like a 15 categories"}, //8
      { nombre: "Valoració consistent", imagen: require('../../assets/likev1.jpg') , descripcion: "Felicitats !!  Has donat like a 5 valoracions"}, //6
      { nombre: "Influència positiva", imagen: require('../../assets/likev2.jpg') , descripcion: "Enhorabona !! Has donat like a 10 valoracions"}, //7
      { nombre: "Aprenent ràpid", imagen: require('../../assets/likev3.jpg') , descripcion: "Màquina !! Has donat like a 15 valoracions"}, //8
      { nombre: "Cotorra", imagen: require('../../assets/cotorra.jpeg') , descripcion: "Felicitats !! Has enviat 5 missatges"}, //9
      { nombre: "Lloro", imagen: require('../../assets/loro.jpeg'), descripcion: "Enhorabona !! Has enviat 10 missatges" }, //10
      { nombre: "Xarlatan", imagen: require('../../assets/muchoschats.png') , descripcion: "Màquina !! Has enviat 15 missatges"},  //11
      { nombre: "Previngut", imagen: require('../../assets/reserved1.jpg') , descripcion: "Felicitats !! Has reservat a 5 events diferents"}, //12
      { nombre: "Esporuguit", imagen: require('../../assets/reserved2.1.jpg') , descripcion: "Enhorabona !! Has reservat a 10 events diferents" }, //13
      { nombre: "Gurú", imagen: require('../../assets/reserved3.jpg'), descripcion: "Màquina !! Has reservat a 15 events diferents" }, //14
      { nombre: "Popular", imagen: require('../../assets/popular.jpg'), descripcion: "Felicitats !! T'han seguit 5 usuaris"}, //15 
      { nombre: "Famós", imagen: require('../../assets/famos.jpg'),  descripcion: "Enhorabona !! T'han seguit 10 usuaris"}, //16 
      { nombre: "Influencer", imagen: require('../../assets/influencer.jpeg') , descripcion: "Màquina !! T'han seguit 15 usuaris"}, //17 
      { nombre: "Fan", imagen: require('../../assets/fan1.jpg') , descripcion: "Felicitats !! Has seguit a 5 usuaris"}, //18
      { nombre: "Fan número 1", imagen: require('../../assets/fan.png'), descripcion: "Enhorabona !! Has seguit a 10 usuaris"}, //19 
      { nombre: "Stalker", imagen: require('../../assets/stalker.jpg'), descripcion: "Màquina !! Has seguit a 15 usuaris"},// 20
      { nombre: "Xataprenent", imagen: require('../../assets/xatgrupal.png') ,  descripcion: "Felicitats !! Participes en 5 xats diferents"}, //21 
      { nombre: "XatMaster", imagen: require('../../assets/grups4(1).jpg'),  descripcion: "Enhorabona !! Participes en 10 xats diferents" }, //22
      { nombre: "Xatadicte", imagen: require('../../assets/grupos7.jpg') ,  descripcion: "Màquina !! Participes en 15 xats diferents"}, //23
      { nombre: "Visió global", imagen: require('../../assets/valoracions1.jpg') ,  descripcion: "Felicitats !! Has creat 5 valoracions"}, //21 
      { nombre: "Present Conscient", imagen: require('../../assets/valoracions2.jpg'),  descripcion: "Enhorabona !! Has creat 10 valoracions" }, //22
      { nombre: "Ment crítica", imagen: require('../../assets/valoracions3.jpg') ,  descripcion: "Màquina !! Has creat 15 valoracions"}, //23
     
    ];

    



  useEffect(() => {
      if (assistencies_passades >= 5 ) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Principiant": true}));
      if (assistencies_passades >=10 ) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Amateur": true}));
      if (assistencies_passades >= 15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Culturista": true}));
      if (interessos_esdeveniments >= 5 ) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Dora la Exploradora": true}));
      if (interessos_esdeveniments >= 10 ) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Tadeo Jones": true}));
      if (interessos_esdeveniments >= 15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Indiana Jones": true}));
      if (interessos_tematiques >= 5 ) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "El polze tímid": true}));
      if (interessos_tematiques >= 10) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "El polze content": true}));
      if (interessos_tematiques >= 15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "El polze d'or": true}));
      if (interessos_valoracions >= 5 ) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Valoració consistent": true}));
      if (interessos_valoracions >= 10) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Influència positiva": true}));
      if (interessos_valoracions >= 15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Aprenent ràpid": true}));
      if (missatges_enviats >= 5 ) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Cotorra": true}));
      if (missatges_enviats >= 10 ) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Lloro": true}));
      if (missatges_enviats >= 15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Xarlatan": true}));
      if (reserves_enviats >= 5 ) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Previngut": true}));
      if (reserves_enviats >= 10 ) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Esporuguit": true}));
      if (reserves_enviats >= 15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Gurú": true}));
      if (seguidors >= 5 ) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Popular": true}));
      if (seguidors >= 10 ) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Famós": true}));
      if (seguidors == 15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Influencer": true}));
      if (seguits >= 5) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Fan": true}));
      if (seguits >= 10 ) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Fan número 1": true}));
      if (seguits >= 15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Stalker": true}));
      if (xats_participants >= 5 ) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Xataprenent": true}));
      if (xats_participants >= 10 ) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "XatMaster": true}));
      if (xats_participants >= 15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Xatadicte": true}));
      if (valoracions >= 5 ) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Visió global": true}));
      if (valoracions >= 10 ) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Present Conscient": true}));
      if (valoracions >= 15) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "Ment crítica": true}));
      setIsLoading(false);
    }, []);

      
    if (isLoading) {
      return <ActivityIndicator />; // Muestra un indicador de carga mientras los datos se están cargando
    }

    return (
        < >
        <View style={styles.premiosContainer}> 
       <ScrollView  horizontal={true} contentContainerStyle={styles.llistat}>
        {premios.map((premio, index) => {
        if (premiosOtorgados[premio.nombre]) {
          return (
            <View  >
            <TouchableOpacity onPress={() => {setPopupVisible(true); setPremio(premio)}} >
            <Image 
              key={index}
              source={premio.imagen}
              style={ styles.imagen}
            />
            
            <Text style={styles.text}> {premio.nombre}</Text>
            </TouchableOpacity>
            </View >
          );
        } 
      })}
      </ScrollView>
      </View>

      <Modal visible={popupVisible} animationType="slide" transparent={true}>
        <View style={styles.popupContainer}>
          <Text style={styles.popupText}>{premio && premio.descripcion}</Text>
          <TouchableOpacity onPress={() => setPopupVisible(false)} style={styles.closeButton1} >
           <XCircleFill color="red" />
          </TouchableOpacity>
        </View>
      </Modal>


        </>
    )
    

}

const styles = StyleSheet.create({
llistat: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
},

text: {
  fontSize: 15,
  marginTop: 3, 
  textAlign: 'center',
  textAlignVertical: 'center',
},
imagen: { 
  width: 100, 
  height:  100,
   marginHorizontal: 10, 
   borderRadius: 50,
   borderWidth: 2,
   borderColor: "black",
   alignContent: 'center',
  },
  popupContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: '74%', // Ajusta la posición vertical del popup
    width: '79%', // Ajusta el ancho del popup
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
    borderRadius: 10,
  },
  closeButton1: {
    position: 'absolute',
    top: 10, // Ajusta el valor según sea necesario
    left: 10, // Ajusta el valor según sea necesario
    // Estilos para el botón de cierre
  },
  
  popupText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },

})

