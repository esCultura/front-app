import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet , TouchableOpacity,Modal,TextInput,Image, ScrollView} from "react-native";
import ArrowLeftShort from 'react-native-bootstrap-icons/icons/arrow-left-short' 
import ArrowRightShort from 'react-native-bootstrap-icons/icons/arrow-right-short' 

export default function Xat (props){
    const [modalVisible, setModalVisible] = useState(false);
    const [urlImatge, setUrlImatge]=useState(require('../../assets/profile-base-icon.png'))
    const [missatges,setMissatges]=useState([]);
    const [textMissatge, setTextMissatge] = useState('');
    
    function imatgePerfil(props) {
        if(props.imatge != null){
            setUrlImatge(props.imatge);
        }
    };
    function handleTextChange(value) {
        setTextMissatge(value);
        
        
    }
    
    function veureXat(){
        
        setModalVisible(true);
        
        fetchMissatges();
    }
    //useEffect(() => {
    const fetchMissatges = async (id) => {
        
        try {
          const response = await fetch( `http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/xats/1/missatges/`, {
                  headers: {
                'Content-Type': 'application/json', 
                  }});
          if (!response.ok) {
            throw new Error('Error al obtenir missatges');
          }    
          
          const data = await response.json();
          
          setMissatges(data);
      
    
      } catch (error) {
        console.error(error);
      }
    }
    //fetchMissatges();
    //  }, []);
    const enviarMissatge = async () => {   
        console.log(textMissatge)
        try {
        const response = await fetch( 'http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/xats/1/missatges/', {
        method: 'POST',
        
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ 
          text:textMissatge,
          xat:1,
          creador:2,
        }),
      });
      console.log(response.ok)
      if (!response.ok) {
        throw new Error('Error al enviar solicitud');
      }  

    } catch (error) {
      console.error(error);
    }
}
    
    return(
        <View>
            <TouchableOpacity style={styles.info_xat} onPress={veureXat} >
                <Image 
                    style={styles.foto}
                    source={urlImatge}
                    />
                <Text style={styles.nom}>{props.username}</Text>
            </TouchableOpacity>
            
            <Modal visible={modalVisible} >
                <View style={styles.top}>
                    <TouchableOpacity style={styles.back} onPress={() => setModalVisible(false)}>
                        <ArrowLeftShort color="black"></ArrowLeftShort>
                    </TouchableOpacity>
                    <Image
                    style={styles.fot}
                    source={urlImatge}/>
                    <Text >{props.username}</Text>
                </View>
                <ScrollView>
                <View>
                {
                    missatges?.map((miss) => {
                        
                        if(miss.creador == 2){
                            return (
                            <View style={styles.textpropi}>  
                                <Text key={miss.id} style={styles.textMiss}> {miss.text}</Text>
                            </View>) 
                        }
                        else{
                        return (
                        <View style={styles.textextern}>
                            <Text key={miss.id} style={styles.textMiss}> {miss.text}</Text>
                        </View>);}})
                }
                </View>  
                </ScrollView>
               
                <View style={styles.missatge}>
                <TextInput style={styles.input} placeholder={'Missatge'} value={textMissatge} onChangeText={handleTextChange}/>
                
                <TouchableOpacity style={styles.icono} onPress={enviarMissatge}>
                        <ArrowRightShort color="black"></ArrowRightShort>
                </TouchableOpacity>
                
                </View>
         </Modal>
         </View>
    )

}
    
const styles = StyleSheet.create({
    top:{
        heigh:50,
        backgroundColor:'#2FDD60',
        width:'100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', 
    },

        info_xat: {
            width: '100%',
            height: 70,
            overflow: 'hidden',
            marginVertical: 10,
            borderColor: 'black',
            borderWidth: 1,
            backgroundColor:'#DCDCDC'
        },
        foto: {
            width:50,
            height:50,
            borderRadius:50,
            marginLeft:10,
            marginVertical:10,

        },
        fot: {
            width:50,
            height:50,
            borderRadius:50,
            //marginLeft:10,
            marginVertical:10,
            //position: 'absolute',
            left: 0 ,
            
            
            
            //borderColor:'green',
            //borderWidth: 4,
        },
        nom:{
            position: 'absolute',
            right: 240,
            top: 20,
            alignSelf: 'flex-start',
            fontSize: 20,
            fontStyle: "normal",
        },
        back:{
            marginLeft:20,
            marginVertical:20,
            //position: 'absolute',
            //flex:1,
            position: 'absolute',
            left: 0,
            top: 5,
            
        },
        input:{
            height: 45,
            margin: 12,
            //borderWidth: 1,
            padding: 10,
            borderRadius:13,
            flex:1,
        },
        missatge:{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderWidth: 0.5,
            borderColor: '#000',
            height: 45,
            borderRadius: 13,
            margin: 12,
            marginVertical:10,
            width:'95%',
            //flex:1
        },
        icono:{
            marginRight:20,
            fontSize:50
            
        },
        textpropi:{
            backgroundColor: '#dbead5',
            borderWidth: 0.5,
            borderColor: '#000',
            height: 45,
            borderRadius: 13,
            margin: 12,
            marginVertical:10,
            width:'50%',
            right:0,
            textAlign:'right',
            alignSelf:'flex-end'
            
            
        },
        textextern:{
            backgroundColor: '#fff',
            borderWidth: 0.5,
            borderColor: '#000',
            height: 45,
            borderRadius: 13,
            margin: 12,
            marginVertical:10,
            width:'95%',
            
        },
        textMiss:{
            marginVertical:10,
            marginLeft:5
        }
    })
    
