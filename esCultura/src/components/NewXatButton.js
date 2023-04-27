import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet , TouchableOpacity,Modal, FlatList,TextInput} from "react-native";
import ArrowLeftShort from 'react-native-bootstrap-icons/icons/arrow-left-short' ;
import Search from 'react-native-bootstrap-icons/icons/search';

import Xat from "../components/XatComp";
import NewGrup from "./GrupXatButton";
import {simpleFetch} from '../utils/utilFunctions';


export default function NewXat (props){
    const [modalVisible, setModalVisible] = useState(false);
    const [usuaris, setUsuaris] =useState([]);
    const [data,setData]=useState('')
    
    useEffect(() => {

      }, []);
    
      const crearXat = async () => {   
        /*let endPoint = 'xats/';
            simpleFetch(endPoint, "POST", {participant_id:1,paricipant_id:2}).then((data) => setData(data))
            console.log("crearXat")
            console.log(data)*/
}

    
/*<View>
{
        usuaris.map((usu) => {
            return (
                <View>
            <Xat username={usu.username} source={usu.imatge}/>
            </View>);})
    }
    </View>*/
    
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
                <TouchableOpacity onPress={crearXat}>
                    <NewGrup></NewGrup>
                </TouchableOpacity>
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
    

   
})