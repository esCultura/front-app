import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet , TouchableOpacity,Modal,} from "react-native";
import ArrowLeftShort from 'react-native-bootstrap-icons/icons/arrow-left-short' 


export default function NewXat (props){
    const [modalVisible, setModalVisible] = useState(false);
    const [usuaris, setUsuaris] =useState('');
    
    useEffect(() => {

        const fetchUsuaris = async () => {
            try {
              const response = await fetch( `http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/usuaris/perfils`, {
                      headers: {
                    'Content-Type': 'application/json', 
                      }});
              if (!response.ok) {
                throw new Error('Error al obtener usuaris');
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
      fetchUsuaris();
      }, []);
    
    
    
    
    
    return(
        <View>
        <TouchableOpacity style={styles.plus} onPress={() => setModalVisible(true)}>
            <Text style={styles.icono_plus}>+</Text>
        </TouchableOpacity>
         
         <Modal visible={modalVisible}>
            <TouchableOpacity style={styles.back} onPress={() => setModalVisible(false)}>
                <ArrowLeftShort color="black"></ArrowLeftShort>
            </TouchableOpacity>
            
            
            
            
            
         </Modal>
         </View>
          
    )
    
}

const styles = StyleSheet.create({

    plus:{
        marginRight:20,
        width:45,
        height:45,
        borderRadius:13,
        backgroundColor:"#DCDCDC"
    },
    icono_plus:{
       fontSize:30,
       marginLeft:14,
       marginVertical:1.5,
       
    },
    back:{
        margin:20,
        marginVertical:20
    }

   
})