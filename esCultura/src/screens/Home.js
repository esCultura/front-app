import { Modal, StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import Esdeveniment from "../components/Esdeveniment";
import { StatusBar } from "react-native";
import React, { useState } from 'react';
import InfoCompleta from "../components/InfoCompleta";

export default function Home(props) {
  const [showDetails, setShowDetails] = useState(false);

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
                complet= "hola que tal"
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
  },
  card: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});
          