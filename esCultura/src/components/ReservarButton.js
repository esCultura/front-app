import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet , TouchableOpacity} from "react-native";


export default function Reservar (props){
    
    const [reservat, setReservat] = useState(false);
    let [info, setData] = useState('');
    const perfil = "primerUsuari"
    const esd = props.codi;
    
      useEffect(() => {

        const fetchReserves = async () => {
            try {
              const response = await fetch( `http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/assistencies/?perfil=${perfil}&esdeveniment=${esd}`, {
                      headers: {
                    'Content-Type': 'application/json', 
                      }});
              if (!response.ok) {
                throw new Error('Error al obtener el likes2');
              }    
              
              const data = await response.json();
         
              setData(data);


              for (let i = 0; i < data.length; i++) {
                  if (data[i].esdeveniment === esd) {
                    setReservat(true);
                  }
              }
              //if (data.length === 0)  setReservat(false);
              //else setReservat(false);
        
          } catch (error) {
            console.error(error);
          }
        }
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
          perfil: perfil,
          esdeveniment: esd,
        }),
      });
      if (!response.ok) {
        throw new Error('Error al enviar solicitud');
      }  

    setReservat(true);
    } catch (error) {
      console.error(error);
    }
}
const eliminarReserva = async () => {    
    
     
    try {
    const response = await fetch( `http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/assistencies/?perfil=${perfil}&esdeveniment=${esd}`,  {
    method: 'DELETE',
    mode:'no-cors', 
    headers: {
      'Content-Type': 'application/json', 
    },
 
  });
  if (!response.ok) {
    throw new Error('Error al enviar solicitud');
  }  
setReservat(false);
} catch (error) {
  console.error(error);
}
}

if(reservat){
    return(<View style={styles.container}>
        <TouchableOpacity style = {styles.button} onPress={eliminarReserva} >
            <View>
                <Text style = {styles.buttonText} > Eliminar Reserva</Text>
            </View>
        </TouchableOpacity>
    </View>)
}
else{
    
return(
    
    <View style={styles.container}>
    <TouchableOpacity style = {styles.button} onPress={crearReserva} >
        <View>
            <Text style = {styles.buttonText} > Reservar</Text>
        </View>
    </TouchableOpacity>
</View> 
  )}
    
       
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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