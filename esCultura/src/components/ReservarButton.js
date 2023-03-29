import React from "react";
import { View, Text, StyleSheet , TouchableOpacity} from "react-native";


/*
const URL ='http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/assistencies/';

let info ={
    perfil: "primerUsuari",
    esdeveniment: "20230323002"
}


const getReserves = async() =>{
    (async () => {
        let data = new FormData();
        data.append("json",JSON.stringify(info));
        
        await fetch(URL,{
            method:"POST",
            mode:"no-cors",
            headers: {
                'Content-Type': 'application/json', // tipo de contenido que estás enviando
              },
            body: JSON.stringify({
                
            })});
        
        //let body = await response.json();
        
      })();
    
    
}*/

export default function Reservar (){
    
    
    
    
    /*const crearReserva= async ()=>{ 
        
        getReserves();
        
        
        
        
        
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
});*/

    
    
    
    const crearReserva = async () => {     
        try {
        const response = await fetch( 'http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/assistencies/', {
        method: 'POST',
        mode:'no-cors', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ 
          perfil: "primerUsuari",
          esdeveniment: 20230315095,
        }),
      });
      if (!response.ok) {
        throw new Error('Error al enviar solicitud');
      }  
    //setLikes((prevLikes) => prevLikes + likeValue);
    //setLiked(!liked);
    } catch (error) {
      console.error(error);
    }
}
          

    return(
        <View style={styles.container}>
        <TouchableOpacity style = {styles.button} onPress={crearReserva} >
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