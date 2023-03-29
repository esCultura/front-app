import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet , TouchableOpacity} from "react-native";


export default function Reservar (){
    
    const [reservat, setReservat] = useState(false);
    const [info, setData] = useState('');
    

    useEffect(() => {
        const fetchReserves = async () => {
          try {
            const response = await fetch( 'http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/assistencies/?perfil=primerUsuari' , {
                    headers: {
                  'Content-Type': 'application/json', 
                }});
            if (!response.ok) {
              throw new Error('Error al obtener el likes');
            }    
            const data = await response.json();
            //let i =JSON.parse(data);
            console.log(data);
            setData(data);
            console.log(info.esdeveniment);
            if ((info.esdeveniment) === 20230315095) {
                setReservat(true);
            }
            else setReservat(false);
            
            console.log(reservat);
        } catch (error) {
          console.error(error);
        }
      };
      fetchReserves();
      }, []);
    
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
          

    
        
        
        if(!reservat){
            return(
                <View style={styles.container}>
        <TouchableOpacity style = {styles.button} onPress={crearReserva} >
            <View>
              <Text style = {styles.buttonText} >  Reservar</Text>
            </View>
          </TouchableOpacity>
          </View>
            )
        }
        else{
            return(
                <View style={styles.container}>
                <TouchableOpacity style = {styles.button} /*onPress={crearReserva}*/ >
                    <View>
                      <Text  style = {styles.buttonText} > Eliminar Reservar</Text>
                    </View>
                  </TouchableOpacity>
                  </View> 
            )
        }
        
    
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