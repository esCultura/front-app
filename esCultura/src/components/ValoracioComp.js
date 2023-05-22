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
        <View>
            <View style ={styles.card}>
                <Text style={styles.username}>{props.usuari.username}</Text>
                <Text>{props.punt}</Text>
                <Text>{props.text}</Text>
                <Text>{props.data}</Text>
                <TouchableOpacity onPress={like}>
                    <Text>likeeee</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
    
    
}

const styles = StyleSheet.create({
    card:{
        width:'95%',
        backgroundColor:'white',
        borderWidth:1,
        alignSelf:'center',
        justifyContent:'center',
        borderRadius:10,
        
    },
    username:{
        marginLeft:10,
        marginTop:5
    }
    
})