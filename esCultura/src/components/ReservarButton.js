import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";

export default function Reservar (){
    return(
        <View style = {styles.container}>
        <Button 
            onPress={() => {console.log("AAAA")} }
            title="Reservar"
            color="#841584"
        />
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });