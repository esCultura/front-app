import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet , TouchableOpacity,Modal, FlatList,TextInput,Image, Pressable,Button} from "react-native";
import {simpleFetch} from '../utils/utilFunctions';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarFill from 'react-native-bootstrap-icons/icons/star-fill';

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
    
    const renderpuntuacio = (num) => {
        const punt =[]
        if(num != 0){

        
        for(let i = 0; i < num; ++i){
            punt.push(<StarFill key ={i} name="star" color={'gold'}  size={20}></StarFill>)
        }
        
        return punt
    }
    }
    const eliminarValoracio = async () =>{
        let endpoint = 'valoracions/'+props.id+'/'
        simpleFetch(endpoint,"DELETE","")
        console.log("eliminat")
        props.canvia()
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

    
    if(props.usuari.user != props.id_usuari){ 
    return (
        <View style ={styles.card}>
            <View style={styles.textMargin}>
                <Text style={styles.user}>{props.usuari.username}</Text>
                <View style={styles.stars}>
                    {renderpuntuacio(props.punt)}
                </View>
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
    else{
        return(
            <View style ={styles.card}>
                <View style={styles.textMargin}>
                <Text style={styles.user}> {props.usuari.username}</Text>
                <View style={styles.stars}>
                    {renderpuntuacio(props.punt)}
                </View>
                <Text>Comentari: {props.text}</Text>
                <Text>{props.data.slice(0, 10)}</Text>
            </View>
            
            <TouchableOpacity style={styles.trash} onPress={eliminarValoracio}>
            <Icon name={'trash-o'} size={24} color={'black'} />
            </TouchableOpacity>
            
            </View>
        )
    }
    
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
        marginVertical:5,
    },
    like: {
        marginRight: 10,
        alignSelf:'center'
    },
    trash:{
        margin:20,
        alignSelf:'center'
    },
    stars:{
        display:'flex',
        flexDirection:'row',
    },
    user:{
        fontWeight:'bold'
    }
    
})