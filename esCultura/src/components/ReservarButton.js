import React from "react";
import { View, Text, StyleSheet , TouchableOpacity} from "react-native";

export default function Reservar (){
    return(
        <View style={styles.container}>
        <TouchableOpacity style = {styles.button} >
            <View>
              <Text  style = {styles.buttonText} >  Reservar</Text>
            </View>
          </TouchableOpacity>
          </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    button: {
        backgroundColor: 'green',
    padding:10,
    borderRadius: 5,
    shadowOffset: { width: 2 , height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    width: 100,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
      }
  });