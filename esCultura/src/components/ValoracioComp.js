import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet , TouchableOpacity,Modal, FlatList,TextInput,Image, Pressable,Button} from "react-native";
import {simpleFetch} from '../utils/utilFunctions';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Valoracio (props){
    const[valoracions,setValoracions]= useState('')
    const[likes, setLikes] = useState(0)
    const[liked,setLiked] = useState(false)
    const likeValue = liked ? -1 : 1;
    
    const fetchlike =async() =>{
        endpoint= 'interessos/valoracions/?valoracio='+props.id+'&perfil='+props.usuari.user
        console.log(endpoint)
        simpleFetch(endpoint,"GET","").then((data)=>setLikes(data.length))
        //if (data.length === 0)  setLiked(false);
        //else    setLiked(true);
        //fer un fetch per aconseguir el nombre de likes
        //i un altre per saber si jo li he donat like o no 
        // i un altre per saber si la valoracio les has fet tu o no, per saber si basura o cor
    }
    const handleLike = async () =>{
        let endpoint = 'interessos/valoracions/'
        simpleFetch(endpoint,"POST",{perfil:props.usuari.user,valoracio:props.id})
        console.log("creat")
        setLikes((prevLikes) => prevLikes + likeValue);
    }
    
    const handleUnlike = async () =>{
        let endpoint = 'interessos/valoracions/'
        simpleFetch(endpoint,"POST",{perfil:props.usuari.user,valoracio:props.id})
        console.log("borrat")
        setLikes((prevLikes) => prevLikes + likeValue);
        setLiked(false);
    }

    useEffect(()=> {
        fetchlike();
    },[])

    const handlePress = () => {
        if (liked) {
          handleUnlike();
        } else {
          handleLike();
        }
      };

    
    return (
        <View style ={styles.card}>
            <View style={styles.textMargin}>
                <Text>User: {props.usuari.username}</Text>
                <Text>Puntuacio: {props.punt}</Text>
                <Text>Comentari: {props.text}</Text>
                <Text>{props.data.slice(0, 10)}</Text>
            </View> 
            
            <TouchableOpacity onPress={handleLike} style={styles.like}>
            <Icon name={liked ? 'heart' : 'heart-o'} size={24} color={liked ? 'red' : 'black'} />
            <Text> {likes} Likes </Text>
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