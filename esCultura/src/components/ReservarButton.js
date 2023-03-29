import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";

export default function Reservar (){
    
    function crearReserva(){ 
        fetch("http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/assistencies/",{
            method: 'POST',
            headers: {
            Accept: 'application/json',
                    'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                perfil: 'primerUsuari',
                esdeveniment: '20230323021',
            }),
});


    }
          useEffect(() => {
              getReserves();
            }, []);

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
      //alignItems: 'center',
      justifyContent: 'center',
    }
  });