import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet , TouchableOpacity,Modal, FlatList, Image} from "react-native";
import ArrowLeftShort from 'react-native-bootstrap-icons/icons/arrow-left-short' 
import Punts from 'react-native-bootstrap-icons/icons/three-dots-vertical' 
import { simpleFetch } from "../utils/utilFunctions";




export default function InfoXat (props){
    const [modalVisible, setModalVisible] = useState(false);
    const [usuaris, setUsuaris] =useState([]);
    const [data,setData]=useState('');
    
    useEffect(() => {
        
        
       function usuarisParticipants(){
        //console.log
        let array = props.participants
        if(array.length > 2){
            setUsuaris(array);
        }
        else setUsuaris([''])
       
       }
        
        usuarisParticipants();
          }, []);
          
    const eliminarXat = async(prop) =>{
      //console.log("eliminar xat",prop)
      let endpoint= "xats/"+ props.id+"/"
      simpleFetch(endpoint,"DELETE","").then((data)=> setData(data))
      console.log("eliminar")
      setModalVisible(false);
      props.onChange(false)
    }
    
    
    return(
        <View>
            <TouchableOpacity  style={styles.punts}onPress={() => setModalVisible(true)} >
                <Punts color="black" style={styles.icono}></Punts>
            </TouchableOpacity>
       
        <Modal visible={modalVisible}>
            <View>
            <TouchableOpacity style={styles.back} onPress={() => setModalVisible(false)}>
                <ArrowLeftShort color="black"></ArrowLeftShort>
            </TouchableOpacity>
                
            
            <View>
                <TouchableOpacity style={styles.grup} onPress={() =>eliminarXat(props.id)}>
                    <Text style={styles.textEl}>Eliminar Xat</Text>
                </TouchableOpacity>
            </View>
            </View>
            <View style={styles.textView}>
                <Text style={styles.text}>Participants:</Text>
            </View>
            <View>
                
            {
            usuaris.map((usu,u) => {
                if(usuaris.length > 2){
                return (
                    <View key={u}>
                        <TouchableOpacity   style={styles.info_xat} >
                            <Image 
                                style={styles.foto}
                                source={usu.imatge}
                                />
                            <Text style={styles.nom}>{usu.username}</Text>
                        </TouchableOpacity>
                </View>)}
                ;})
            }
            </View>

            </Modal>    
        </View>
    )
}


const styles = StyleSheet.create({

    grup:{
        marginRight:20,
        width:'95%',
        height:50,
        marginTop:80,
        borderRadius:13,
        backgroundColor:"#DC143C",
        display:'flex',
        flexDirection: 'row',
        margin: 12,
        
    },
    punts:{
        position:'absolute',
        right:0,
        //alignItems:'right'
        
    },
    textEl:{
        alignSelf:"center",
        marginLeft: 10,
        color:'white'
        
    },
    textView:{
    marginBottom:20,
    marginLeft:8    
    },
    text:{
        fontSize:18
    },
    icono:{
        position:'absolute',
        right:0,
        width:60,
        height:60,
        borderRadius:50,
        marginLeft:10,
        marginVertical:12,
    },
    titol:{

        marginLeft:50
    },
    back:{
        marginLeft:20,
        marginVertical:20,
        //position: 'absolute',
        //flex:1,
        position: 'absolute',
        left: 0,
        top: 5,
        height:30,
        width:30,
        
        
    },
    info_xat: {
        width: '100%',
        height: 70,
        overflow: 'hidden',
        //marginVertical: 10,
        borderColor: '#A9A9A9',
        //borderWidth: 1,
        borderBottomWidth:1,
        backgroundColor:'#DCDCDC'
    },
    foto: {
        width:50,
        height:50,
        borderRadius:50,
        marginLeft:10,
        marginVertical:10,

    },
    nom:{
        position: 'absolute',
        left:80,
        top: 20,
        alignSelf: 'flex-start',
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: 'bold'
    },
    

   
})