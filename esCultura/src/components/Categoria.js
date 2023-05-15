import React,{ useEffect, useState } from "react";  
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import ArrowLeftShort from 'react-native-bootstrap-icons/icons/arrow-left-short' 
import {useTranslation} from 'react-i18next'
import {simpleFetch} from '../utils/utilFunctions';

import { setDefaultNamespace } from "i18next";

export default function Categoria (props){
    const [seguidors, setSeguidors]= useState('')
    const [seguit,setSeguit] =useState('')
    const [data, setData] = useState('')
    const [update,setUpdate] = useState(false)
    const [refresh,setRefresh] =useState(false)
    const bgcolor = '#3BDE4B'
    
    const fetchSeguidors = async () =>{
        let endpoint='interessos/tematiques/?tematica='+props.tipus+'&perfil=6'
        console.log("aaaaaaaa", endpoint)
        simpleFetch(endpoint,"GET","").then((data) =>setSeguidors(data))
        console.log('hellooooooo',seguidors)
        if(seguidors != null) setSeguit(true)
        setRefresh((prevState)=>!prevState)
      
    }
    
    function recarrega (){
        setRefresh((prevState)=>!prevState)
    }

    

    
    useEffect(() =>{
       
       
   },[update])
    
    const seguir = async () =>{
        let endpoint = 'interessos/tematiques/'
        simpleFetch(endpoint,"POST",{perfil:6,tematica:props.tipus}).then((data) =>setData(data))
        console.log('segueix')
        
        setSeguit(true)
        setUpdate((prevState) =>!prevState);
        console.log(seguit)
    }
    
    const deixarDeSeguir = async () =>{
        let endpoint = 'interessos/tematiques/?tematica='+props.tipus+'&perfil=6'
        simpleFetch(endpoint,"DELETE","").then((data)=> setData(data))
       
        setSeguit(false)
        console.log('deixa de seguir')
        setUpdate((prevState) =>!prevState);
        console.log(seguit)
        
        
    }
    
    
    useEffect(()=>{
        
        console.log(seguit)
        
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
                <TouchableOpacity  onPress={seguir}>
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