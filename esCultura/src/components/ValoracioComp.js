import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet , TouchableOpacity,Modal, FlatList,TextInput,Image, Pressable,Button} from "react-native";
import {simpleFetch} from '../utils/utilFunctions';
import { useTranslation } from 'react-i18next';

export default function Valoracio (props){
    const[valoracions,setValoracions]= useState('')
    
    const like =async() =>{
        endpoint= 'iteressos/valoracions/'
        simpleFetch()
    }
    
    return (
        <View>
            <View style ={styles.card}>
                <Text>{props.usuari.username}</Text>
                <Text>{props.punt}</Text>
                <Text>{props.text}</Text>
                <Text>{props.data}</Text>
            </View>
            
        </View>
    )
    
    
}

const styles = StyleSheet.create({
    card:{
        width:'90%',
        backgroundColor:'white',
        borderWidth:1,
        alignSelf:'center',
        justifyContent:'center'
    }
    
})