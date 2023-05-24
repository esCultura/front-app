import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet , TouchableOpacity,Modal, FlatList,TextInput,Image, Pressable,Button} from "react-native";
import {simpleFetch} from '../utils/utilFunctions';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarFill from 'react-native-bootstrap-icons/icons/star-fill';

export default function Valoracio (props){
    const[valoracions,setValoracions]= useState('')
    const[numlikes, setNumLikes] = useState(0)
    const[liked,setLiked] = useState(false)
    const[info,setInfo] = useState([])
    const likeValue = liked ? -1 : 1;
    const [interes,setInteres] = useState(0)
    const [update, setUpdate] = useState([]);
    
    const fetchtotallike =async() =>{
        endpoint= 'interessos/valoracions/?valoracio='+props.id
        simpleFetch(endpoint,"GET","").then((data)=>setNumLikes(data.length))
    }
    
    const fetchlike =async() =>{
        endpoint= 'interessos/valoracions/?valoracio='+props.id+'&perfil='+props.id_usuari
        simpleFetch(endpoint,"GET","").then((data) => setLiked(data.length))
        if (liked === 0)  {
            setLiked(false)
        }
        else {
            setLiked(true)
        }
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
        await simpleFetch(endpoint,"POST",{perfil:props.id_usuari,valoracio:props.id})
        setLiked(true)
        //setNumLikes((prevnum) => prevnum +1)
        setUpdate((prevState) => !prevState);
    }
    
    const handleUnlike = async () =>{
        
        let endpoint = 'interessos/valoracions/?valoracio='+props.id+'&perfil='+props.id_usuari
        simpleFetch(endpoint,"DELETE","")
        console.log("borrat")
        setLiked(false);
        //setNumLikes((prevnum)=> prevnum-1)
        setUpdate((prevState) => !prevState);
    }

    useEffect(()=> {
        if(props.usuari.user != props.id_usuari){
        fetchtotallike();
        }
    },[update])
    
    useEffect(()=> {
        if(props.usuari.user != props.id_usuari){
            fetchlike();
        
        }
    },[])
    

    const handlePress = () => {
        if (liked ) {
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
            
            <TouchableOpacity onPress={handlePress} >
            <Icon style={styles.like} name={liked ? 'heart' : 'heart-o'} size={24} color={liked ? 'red' : 'black'} />
            <Text style={styles.numlike}> {numlikes} Likes </Text>
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
        marginRight: 12,
        alignSelf:'center',
        marginTop:20
        
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
    },
    numlike:{
        marginRight:15
    },
    likeview:{
        //alignSelf:'center'
    }
    
})