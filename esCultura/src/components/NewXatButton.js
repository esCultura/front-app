import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet , TouchableOpacity,Modal, FlatList,TextInput,Image} from "react-native";
import ArrowLeftShort from 'react-native-bootstrap-icons/icons/arrow-left-short' ;
import Search from 'react-native-bootstrap-icons/icons/search';

import Xat from "../components/XatComp";
import NewGrup from "./GrupXatButton";
import {simpleFetch} from '../utils/utilFunctions';


export default function NewXat (props){
    const [modalVisible, setModalVisible] = useState(false);
    const [usuaris, setUsuaris] =useState([]);
    const [data,setData]=useState('')
    const [existents, setExisteixXat] = useState([])

    
    useEffect(() => {
        const fetchUsuaris = async () => {   
            let endPoint = 'usuaris/perfils';
                simpleFetch(endPoint, "GET", "").then((data) => setUsuaris(data))
                console.log("fetchUsus")
                console.log(usuaris)
    }
    fetchUsuaris()
    existeixXat()
   
      }, []);
    
      /*const crearXat = async () => {   
        let endPoint = 'xats/';
            simpleFetch(endPoint, "POST", {participant_id:1, participant_id:6}).then((data) => setData(data))
            console.log("crearXat")
            console.log(data)
}*/

        function existeixXat (){
             let exis =[]
            if(props.xats != 0){
            let array_xats = props.xats
            console.log('piiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii',array_xats)
            array_xats.forEach(item =>{
                if(item.participants.length == 2){
                    item.participants.forEach(it=>{
                        if(it.user != 6) exis.push(it.user);
                    })
                }
            }
                
            )
            exis.push(6)
            setExisteixXat(exis)
        }}

    

    
    return(
        <View>
        <TouchableOpacity style={styles.plus} onPress ={() => setModalVisible(true)}>
            <Text style={styles.icono_plus}>+</Text>
        </TouchableOpacity>
         
         <Modal visible={modalVisible}>
            <TouchableOpacity style={styles.back} onPress={() => setModalVisible(false)}>
                <ArrowLeftShort color="black"></ArrowLeftShort>
            </TouchableOpacity>
            <View style={styles.barra}>
            <View style={styles.search}>
                <TextInput style={styles.input} placeholder={'Usuaris'}/>
                <Search  color={'black'}  style={styles.icono}></Search>
                
            </View>
            </View>
            <View>
                <TouchableOpacity >
                    <NewGrup></NewGrup>
                </TouchableOpacity>
            </View>
            <View>
            {
            usuaris.map((usu) => {
                if(existents.indexOf(usu.user) == -1){
                return (
                    <View>
                        <TouchableOpacity  key={usu.user} style={styles.info_xat} >
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
                
            
            <View>
             
            </View>
            
            
            
            
            
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
    },
    barra:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    search:{
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
        width:'75%',
        flex:1
    },
    input:{
        height: 45,
        margin: 12,
        //borderWidth: 1,
        padding: 10,
        borderRadius:13,
        flex:1,
    },
    icono:{
        marginRight:20,
        fontSize:50
        
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
    nom:{
        position: 'absolute',
        left:80,
        top: 10,
        alignSelf: 'flex-start',
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: 'bold'
    },
    

   
})