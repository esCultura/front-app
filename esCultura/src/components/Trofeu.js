
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity, ScrollView, Linking } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import React, {useState, useEffect} from 'react';


const bgcolor = '#3BDE4B';
import XCircleFill from 'react-native-bootstrap-icons/icons/x-circle-fill';

  
  
export default function InfoCompleta (props) {
    const assistencies_passades = props.assistencies_passades;
    const interessos_esdeveniments= props.interessos_esdeveniments;
    const interessos_tematiques= props.interessos_tematiques;
    const missatges_enviats= props.missatges_enviats;
    const reserves_enviats= props.reserves_enviats;
    const seguidors= props.seguidors;
    const seguits= props.seguits;
    const xats_participants= props.xats_participants;
    const [premi_assistencies, setPremi_assistencies] = useState(null);
    const [premi_esdeveniments, setPremi_esdeveniments ]= useState(null);
    const [premi_tematiques, setPremi_tematiques]= useState(null);
    const [premi_missatges, setPremi_missatges ]= useState(null);
    const [premi_reserves, setPremi_reserves] = useState(null);
    const [premi_seguidors,setPremi_seguidors] = useState(null);
    const [premi_seguits, setPremi_seguits] = useState(null);
    const [premi_xats, setPremi_xats ]= useState(null); 
    const [premiosOtorgados, setPremiosOtorgados] = useState({
        "principiant": false,
        "amateur": false,
        "culturista": false,
        "principiant1": false,
        "amateur1": false,
        "culturista1": false,
        "tematiques1": false,
        "tematiques2": false,
        "tematiques3": false,
        "cotorra": false,
        "lloro": false,
        "xarlatan": false,
        "reserved1": false,
        "reserved2": false,
        "reserved3": false,
        "popular": false,
        "famos": false,
        "influencer": false,
        "seguit1": false,
        "seguit2": false,
        "seguit3": false,
        "xats1": false,
        "xats2": false,
        "xats3": false,

      });
      
      const premios = [
        { nombre: "principiant", imagen: "ruta/a/la/imagen1.jpg" }, //0
        { nombre: "amateur", imagen: require('../../assets/amateur.png') },   //1
        { nombre: "culturista", imagen: require('../../assets/culturista.png')},  //2
        { nombre: "principiant1", imagen: "ruta/a/la/imagen1.jpg" },  //3
        { nombre: "amateur1", imagen: "ruta/a/la/imagen2.jpg" },  //4
        { nombre: "culturista1", imagen: "ruta/a/la/imagen3.jpg" },  //5
        { nombre: "tematiques1", imagen: "ruta/a/la/imagen1.jpg" }, //6
        { nombre: "tematiques2", imagen: "ruta/a/la/imagen2.jpg" }, //7
        { nombre: "tematiques3", imagen: "ruta/a/la/imagen3.jpg" }, //8
        { nombre: "cotorra", imagen: require('../../assets/cotorra.jpeg') }, //9
        { nombre: "lloro", imagen: require('../../assets/loro.jpeg') }, //10
        { nombre: "xarlatan", imagen: require('../../assets/muchosxats.png') },  //11
        { nombre: "reserved1", imagen: "ruta/a/la/imagen1.jpg" }, //12
        { nombre: "reserved2", imagen: "ruta/a/la/imagen2.jpg" }, //13
        { nombre: "reserved3", imagen: "ruta/a/la/imagen3.jpg" }, //14
        { nombre: "popular", imagen: "ruta/a/la/imagen1.jpg" }, //15 
        { nombre: "famos", imagen: "ruta/a/la/imagen2.jpg" }, //16 
        { nombre: "influencer", imagen: require('../../assets/influencer.jpeg') }, //17 
        { nombre: "seguit1", imagen: "ruta/a/la/imagen1.jpg" }, //18
        { nombre: "seguit2", imagen: "ruta/a/la/imagen2.jpg" }, //19 
        { nombre: "seguit3", imagen: "ruta/a/la/imagen3.jpg" },// 20
        { nombre: "xats1", imagen: require('../../assets/xatgrupal.png') }, //21 
        { nombre: "xats2", imagen: "ruta/a/la/imagen2.jpg" }, //22
        { nombre: "xats", imagen: "ruta/a/la/imagen3.jpg" }, //23

       
      ];

      



    useEffect(() => {
        console.log("imagen", premios[21].imagen);
        console.log("entra", props);
        if (assistencies_passades < 10 && assistencies_passades > 4) setPremi_assistencies("principiant");
        else if (assistencies_passades >=10 && assistencies_passades <15) setPremi_assistencies("amateur");
        else if (assistencies_passades >= 15) setPremi_assistencies("culturista");
        if (interessos_esdeveniments >= 5&& interessos_esdeveniments<10) setPremi_esdeveniments("principiant1") ;
        else if (interessos_esdeveniments >= 10 && interessos_esdeveniments<15) setPremi_esdeveniments("amateur1");
        else if (interessos_esdeveniments >= 15) setPremi_esdeveniments("culturista1");
        if (interessos_tematiques >= 5 && interessos_tematiques<10) setPremi_tematiques(" tematiques1");
        else if (interessos_tematiques >= 10&& interessos_tematiques<15) setPremi_tematiques(" tematiques2");
        else if (interessos_tematiques >= 15) setPremi_tematiques( "tematiques3");
        if (missatges_enviats >= 5 && missatges_enviats<10) setPremi_missatges("cotorra");
        else if (missatges_enviats >= 10 && missatges_enviats <15) setPremi_missatges("lloro");
        else if (missatges_enviats >= 15) setPremi_missatges("xarlatan");
        if (reserves_enviats >= 5 && reserves_enviats <10) setPremi_reserves("reserved1");
        else if (reserves_enviats >= 10 && reserves_enviats <15) setPremi_reserves("reserved2");
        else if (reserves_enviats >= 15) setPremi_reserves("reserved3");
        if (seguidors >= 5 && seguidors<10) setPremi_seguidors("popular");
        else if (seguidors >= 10 && seguidors <15) setPremi_seguidors("famos");
        else if (seguidors == 15) setPremi_seguidors("influencer");
        if (seguits >= 5 && seguits <10) setPremi_seguits("seguit1");
        else if (seguits >= 10 && seguits <15) setPremi_seguits("seguit2");
        else if (seguits == 15)  setPremi_seguits("seguit3");
        if (xats_participants >= 5 && xats_participants <10) setPremiosOtorgados(prevPremios => ({ ...prevPremios, "xats1": true}));
        else if (xats_participants >= 10 && xats_participants<15) setPremi_xats("xats2");
        else if (xats_participants == 15) setPremi_xats("xats3");
      }, []);

      

    return(
        <>
        <Image source={ premios[21].imagen} style={{ width: 100, height: 100 }} />
            
        <Text> {premios[21].nombre} </Text>

        </>
    )
    

}
