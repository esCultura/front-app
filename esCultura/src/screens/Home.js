import { Modal, StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import Esdeveniment from "../components/Esdeveniment";
import { StatusBar } from "react-native";
import React, { useState } from 'react';
import InfoCompleta from "../components/InfoCompleta";

export default function Home(props) {
    

  const [showDetails, setShowDetails] = useState(true);
 {/*} const [titol, setTitol] = useState([]);
  const [data, setData] = useState([]);
  console.log(titol);
  
  fetch('http://127.0.0.1:8000/esdeveniments/',{
    "method":"GET",
    "mode":"no-cors",
  }).then((response) => response.json()).then((json) => setData(json));
  
*/}
  
  

  const handlePress = () => {
    setShowDetails(!showDetails);
  }

  return (
    <View>
    {showDetails ? (
      <View>
        <TouchableOpacity onPress={handlePress}>
          <View>
            <Esdeveniment
                type="musical" 
                title="Billy Elliot, el musical"
                brief="Tant de bo el tornin a fer!" 
                date="LOLASU" 
                location="In your mind mdfk" 
              source="https://www.atrapalo.com/houdinis/wp-content/uploads/2021/06/billyelliot-cartel.jpg" /> 
            <StatusBar style="auto" />
          </View>
        </TouchableOpacity>
      </View>
    ):(
        <View> 
          <TouchableOpacity style = {styles.button} onPress={handlePress}>
            <View>
              <Text  style = {styles.buttonText} >  Enrere</Text>
            </View>
          </TouchableOpacity>
            <View>
              <InfoCompleta
                type="musical" 
                title="Billy Elliot, el musical" 
                preu = "Preu taquilla"
                complet= "La trama de la obra se centra en la lucha de Billy por seguir sus sueños a pesar de la oposición de su familia y su comunidad, que consideran la danza algo inapropiado para un niño de su edad y que esperan que siga los pasos de su padre y su hermano mayor para trabajar en la mina. Billy encuentra en la danza una forma de expresión y una vía de escape de su difícil realidad, y gracias a la ayuda de su maestra de baile, la Sra. Wilkinson, y de su mejor amigo Michael, logra superar los obstáculos que se le presentan y alcanzar su objetivo de audicionar para la prestigiosa Escuela de Ballet de la Royal Ballet en Londres."
                date="LOLASU" 
                location="In your mind mdfk" 
                source="https://www.atrapalo.com/houdinis/wp-content/uploads/2021/06/billyelliot-cartel.jpg" /> 
              </View>
          </View>
          
          )}
    </View>

);
};


 
 const styles = StyleSheet.create({

  button: {
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 5,
    alignItems: 'left',
    justifyContent: 'left',
    shadowOffset: { width: 2 , height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    width: 80,
     },
  buttonText: {
    color: 'white',
    fontSize: 16,
  }
});
          