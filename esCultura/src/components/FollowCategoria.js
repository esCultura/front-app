import React,{ useEffect, useState } from "react";  
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import {useTranslation} from 'react-i18next'
import {simpleFetch} from '../utils/utilFunctions';
import { setDefaultNamespace } from "i18next";

export default function BotoSeguir (props){
    const [modalVisible, setModalVisible] = useState(false);
    const [seguidors, setSeguidors]= useState('')
    const [seguit,setSeguit] =useState('')
    const [update,setUpdate] = useState(false)
    const [refresh,setRefresh] = useState(false)
    
    useEffect(()=> {
        fetchSeguidors()
    },[update])
    
    const fetchSeguidors = async () =>{
        let endpoint='interessos/tematiques/?tematica='+props.tipus
        console.log("aaaaaaaa", endpoint)
        simpleFetch(endpoint,"GET","").then((data) =>setSeguidors(data))
        setRefresh((prevState) =>!prevState)
    }
    
    function getseguit() {
        setSeguit(false)
        console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii',seguidors)
        let array = seguidors
        if(array.length !=0){
        array.forEach(element => {
            if(element.perfil == 6){
                console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                setSeguit(true)
            }
        });}
        
    }
    
    useEffect(() =>{
        getseguit()
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
    
    
    if(seguit){
       return(
        <View>
            <TouchableOpacity onPress={deixarDeSeguir}>
                <Text>deixar de sguir</Text>
            </TouchableOpacity>
        </View>
       )
    }
    else{
        return(
            <View>
                <TouchableOpacity onPress={seguir}>
                <Text>seguir</Text>
                </TouchableOpacity>
                
            </View> 
        )
        
        
    }
}
