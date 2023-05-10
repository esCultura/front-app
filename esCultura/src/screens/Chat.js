import { Text, StyleSheet, View , TextInput,Image,TouchableOpacity} from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../components/Screen";
import Search from 'react-native-bootstrap-icons/icons/search';
import NewXat from "../components/NewXatButton";
import Xat from "../components/XatComp";
import {simpleFetch} from '../utils/utilFunctions';

import { useTranslation } from 'react-i18next';

export default function Chat(props) {
    const [xats, setXats] = useState([])
    const [idUser,setIdUser] = useState([]);
    const [update,setUpdate]= useState([]);
    
    
    const {t} = useTranslation();
    
    //Saber el teu usuari
    useEffect(() => {
        const getUserId = async () => { 
            let endPoint = 'usuaris/perfils/jo';
        await    simpleFetch(endPoint, "GET", "").then((data) => setIdUser(data));

    }
    getUserId();
    }, []);
    
    //GET xats
    useEffect(() => {

        const fetchXats = async () => {
            let endPoint = 'xats/';
            await simpleFetch(endPoint, "GET", "").then((data) => setXats(data))
            //console.log("fetchXats")
            //console.log(xats)
            
        }
        
        fetchXats();
    }, [update]);
      
      //Update pantalla
    function recarrega(){
        setUpdate((prevState) =>!prevState)
    }

    return (
        <Screen >
            <View style={styles.barra}>
                <View style={styles.search}>
                    <TextInput style={styles.input} placeholder={t('search')}/>
                    <Search  color={'black'}  style={styles.icono}></Search>
                </View>
                
                <NewXat user={idUser} xats={xats} canvia={recarrega}></NewXat>
            </View>
            <View>
               {
                xats.map((xat,i) => {
                return (
                    <View key={i}>
                        <Xat user={idUser}  nom ={xat.nom}part={xat.participants} id={xat.id} miss={xat.ultim_missatge} canvia={recarrega}></Xat>
                    </View>);})
                }
            </View>
        </Screen>
    );
}


const styles = StyleSheet.create({
   
    barra:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:10
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

    info_xat: {
        width: '100%',
        height: 85,
        overflow: 'hidden',
        marginVertical: 10,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor:'#DCDCDC'
    },
    foto: {
        width:60,
        height:60,
        borderRadius:50,
        marginLeft:10,
        marginVertical:12,
        
        //borderColor:'green',
        //borderWidth: 4,
    }, 
    nom:{
        position: 'absolute',
        right: 230,
        top: 28,
        alignSelf: 'flex-start',
        fontSize: 20,
        fontStyle: "normal",
    }
    
})