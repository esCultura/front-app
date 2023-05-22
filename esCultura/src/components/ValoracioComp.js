import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet , TouchableOpacity,Modal, FlatList,TextInput,Image, Pressable,Button} from "react-native";
import {simpleFetch} from '../utils/utilFunctions';
import { useTranslation } from 'react-i18next';

export default function Valoracio (props){
    const[valoracions,setValoracions]= useState('')
    const[likes, setLikes] = useState([])
    const[liked,setLiked] = useState(false)
    
    const fetchlike =async() =>{
        endpoint= 'interessos/valoracions/?valoracio='+props.id+'&perfil='+props.usuari.user
        console.log(endpoint)
        simpleFetch(endpoint,"GET","").then((data)=>setLikes(data))
        if(likes.length !== 0) setLiked(true)
    }
    const like = async () =>{
        let endpoint = 'interessos/valoracions/'
        simpleFetch(endpoint,"POST",{perfil:props.usuari.user,valoracio:props.id})
        console.log("creat")
    }
    
    useEffect(()=> {
        fetchlike();
    },[])
    
    return (
        <View style ={styles.card}>
            <View style={styles.textMargin}>
                <Text>User: {props.usuari.username}</Text>
                <Text>Puntuacio: {props.punt}</Text>
                <Text>Comentari: {props.text}</Text>
                <Text>{props.data}</Text>
            </View> 
            
            <TouchableOpacity onPress={like} style={styles.like}>
                <Text>likeeee</Text>
            </TouchableOpacity>
        </View>
    )
    
    
}

const styles = StyleSheet.create({
    card:{
        width:'95%',
        backgroundColor:'white',
        borderWidth:1,
        alignSelf:'center',
        borderRadius:10,
        marginVertical: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textMargin:{
        marginLeft:10,
        marginTop:5,
    },
    like: {
        marginRight: 10,
        marginTop: 5,
    }
    
})