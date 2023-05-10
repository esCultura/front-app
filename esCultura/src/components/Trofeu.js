
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity, ScrollView, Linking } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import React, {useState, useEffect} from 'react';


const bgcolor = '#3BDE4B';
import XCircleFill from 'react-native-bootstrap-icons/icons/x-circle-fill';

  
  
export default function InfoCompleta (props) {
    const [percentatge, setPercentatge] = useState(null);

    useEffect(() => {
        console.log("entra", props);
      }, []);

      

    return(
        <Text>Trofeu</Text>
    )
    

}
