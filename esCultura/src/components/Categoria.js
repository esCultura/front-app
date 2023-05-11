import React,{ useEffect, useState } from "react";  
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import ArrowLeftShort from 'react-native-bootstrap-icons/icons/arrow-left-short' 
import {useTranslation} from 'react-i18next'
import {simpleFetch} from '../utils/utilFunctions';
import BotoSeguir from "./FollowCategoria";
import { setDefaultNamespace } from "i18next";

export default function Categoria (props){
    const [modalVisible, setModalVisible] = useState(false);
    const [seguidors, setSeguidors]= useState('')
    const [seguit,setSeguit] =useState('')
    const [data, setData] = useState('')
    const [update,setUpdate] = useState(false)
    const [refresh,setRefresh] =useState(false)
    const bgcolor = '#3BDE4B'
    
    const fetchSeguidors = async () =>{
        let endpoint='interessos/tematiques/?tematica='+props.tipus
        console.log("aaaaaaaa", endpoint)
        simpleFetch(endpoint,"GET","").then((data) =>setSeguidors(data))
        setRefresh((prevState)=>!prevState)
      
    }
    
    function getseguit() {
        setSeguit(false)
        let array = seguidors
        if(array.length !=0){
        array.forEach(element => {
            if(element.perfil == 6){
                setSeguit(true)
            }
        });}
    }
    
    function recarrega (){
        setModalVisible(true)
        setRefresh((prevState)=>!prevState)
    }
    

    
    useEffect(() =>{
        getseguit()
        renderBotoFollow()
   },[refresh])
    
    const seguir = async () =>{
        let endpoint = 'interessos/tematiques/'
        simpleFetch(endpoint,"POST",{perfil:6,tematica:props.tipus}).then((data) =>setData(data))
        setUpdate((prevState) =>!prevState);
    }
    
    const deixarDeSeguir = async () =>{
        let endpoint = 'interessos/tematiques/?tematica='+props.tipus+'&perfil=6'
        simpleFetch(endpoint,"DELETE","").then((data)=> setData(data))
        setUpdate((prevState) =>!prevState);
        
    }
    
 
    useEffect(()=>{
        fetchSeguidors()
    },[update])

    
    if(seguit){
    return(
        <View>
            <TouchableOpacity onPress={deixarDeSeguir}>
                <Text style={styles.type_unfollow}>{props.tipus}</Text>
            </TouchableOpacity>
        </View>
    )
    }
    else{
        return(
            <View>
                <TouchableOpacity onPress={seguir}>
                    <Text style={styles.type}>{props.tipus}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
    type:{
        paddingVertical: 2,
        paddingHorizontal: 11,
        borderRadius: 12,
        backgroundColor: '#3BDE4B',
        color: "white",
    },
    type_unfollow:{
        paddingVertical: 2,
        paddingHorizontal: 11,
        borderRadius: 12,
        backgroundColor: '#DCDCDC',
        color: "white",
    },
    top:{
        heigh:50,
        backgroundColor:'#DCDCDC',
        width:'100%',
        flexDirection: 'row',

        //alignItems: 'center', 
    },
    titol:{
        textAlign:'center',
        alignSelf:'center',    
        justifyContent:'center'
    },
    back:{
        margin:20,
        marginVertical:20
    },
    nomCategoria:{
        alignItems:'center',
        justifyContent:'center',
        marginVertical:13,
        height:40,
    },
    text:{
       fontSize:20, 
    },
    follow:{
        alignItems:'center',
        backgroundColor:'#2FDD60',
        height:40,
        width:125,
        borderRadius:13,
        justifyContent:'center'
        
    },
    unfollow:{
       
            alignItems:'center',
            backgroundColor:'#DCDCDC',
            height:40,
            width:125,
            borderRadius:13,
            justifyContent:'center'
            
        
    }
})