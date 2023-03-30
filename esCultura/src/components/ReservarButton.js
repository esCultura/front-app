import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet , TouchableOpacity} from "react-native";


export default function Reservar (){
    
    const [reservat, setReservat] = useState(false);
    const [id,setId] = useState('');
    let [info, setData] = useState('');
    
    const fetchReserves = async () => {
        try {
          const response = await fetch( 'http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/assistencies/?perfil=primerUsuari' , {
                  headers: {
                'Content-Type': 'application/json', 
              }});
          if (!response.ok) {
            throw new Error('Error al obtener el likes');
          }    
          
          var data = await response.json();
     
          setData(data);
          console.log(data);
          if ((data[0].esdeveniment) == 20230315095) {
              setReservat(true);
          }
          else setReservat(false);
    
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
       
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

    setReservat(true);
    id +=1;
    } catch (error) {
      console.error(error);
    }
}
const eliminarReserva = async (id) => {    
    
    var url ='http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/assistencies/' + id + '/' ;
    console.log(id)
    try {
    const response = await fetch( url, {
    method: 'DELETE',
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
setReservat(false);
} catch (error) {
  console.error(error);
}
}
return(
    <View>
        {reservat ? (
    <View style={styles.container}>
                    <TouchableOpacity style = {styles.button} /*onPress={eliminarReserva(id)}*/ >
                        <View>
                            <Text style = {styles.buttonText} > Eliminar Reserva</Text>
                        </View>
                    </TouchableOpacity>
                </View>
  ):(
    <View style={styles.container}>
    <TouchableOpacity style = {styles.button} onPress={crearReserva} >
        <View>
            <Text style = {styles.buttonText} > Reservar</Text>
        </View>
    </TouchableOpacity>
</View> 
  )}
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