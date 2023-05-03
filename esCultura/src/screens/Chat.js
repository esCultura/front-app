import { Text, StyleSheet, View , TextInput,Image,TouchableOpacity} from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../components/Screen";
import Search from 'react-native-bootstrap-icons/icons/search';
import Plus from 'react-native-bootstrap-icons/icons/plus';
import NewXat from "../components/NewXatButton";
import Xat from "../components/XatComp";
import {simpleFetch} from '../utils/utilFunctions';

export default function Chat(props) {
    const [data,setData]=useState('')
    const [usuaris, setUsuaris] = useState([])
    const [xats, setXats] = useState([])
    const [idUser,setIdUser] = useState([]);
    var users =[]
    
    
    
    

    useEffect(() => {

        const fetchXats = async () => {
            let endPoint = 'xats/';
            await simpleFetch(endPoint, "GET", "").then((data) => setXats(data))
            //console.log("fetchXats")
            //console.log(xats)
            
        }
        const getUserId = async () => { 
            let endPoint = 'usuaris/perfils/jo';
            console.log('CHAT')
        await    simpleFetch(endPoint, "GET", "").then((data) => setIdUser(data));

    }
      fetchXats();
      getUserId();
      //nomXat()
      }, []);
    
      
      
      
       
      //<NewXat xats={xats}></NewXat>
     
    return (
        <Screen >
            <View style={styles.barra}>
            <View style={styles.search}>
                <TextInput style={styles.input} placeholder={'Cerca...'}/>
                <Search  color={'black'}  style={styles.icono}></Search>
                
            </View>
           
           <NewXat user={idUser} xats={xats}></NewXat>
           </View>
           <View>
           
           {
            xats.map((xat,i) => {
            return (

                <View key={i}>
                    <Xat user={idUser}  part={xat.participants} id={xat.id} miss={xat.ultim_missatge}></Xat>
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