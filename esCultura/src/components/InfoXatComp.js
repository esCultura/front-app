import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet , TouchableOpacity,Modal, Image} from "react-native";
import ArrowLeftShort from 'react-native-bootstrap-icons/icons/arrow-left-short' 
import Punts from 'react-native-bootstrap-icons/icons/three-dots-vertical' 
import { simpleFetch } from "../utils/utilFunctions";
import { useTranslation } from 'react-i18next';
import PerfilSimple from '../components/PerfilSimple';
import XCircleFill from 'react-native-bootstrap-icons/icons/x-circle-fill';

export default function InfoXat (props){
    const [modalVisi, setModalVisi] = useState(false);
    const [modalPerfil, setModalPerfil] = useState(false);
    const [usuaris, setUsuaris] =useState([]);
    const [data,setData]=useState('');
    const [perfil,setPerfil] = useState(null);

    const {t} = useTranslation();
    console.log("holaa", props);
    let urlImatge =require('../../assets/profile-base-icon.png');
    
    function tanca() {
        setModalVisi(false);
    }
          
    const eliminarXat = async(prop) => {
        //console.log("eliminar xat",prop);
        let endpoint= "xats/"+ props.id+"/";
        simpleFetch(endpoint,"DELETE","").then((data)=> setData(data));
        setModalVisi(false);
        props.onChange(false);
        props.canvia();
    }

    function openPerfil(id) {
        setModalPerfil(true);
        console.log("id", id);
        setPerfil(id);
      };
    
    return(
        <>
        <View>
            <TouchableOpacity  style={styles.icono}onPress={() => setModalVisi(true)} >
                <Punts color="black" style={styles.ic}></Punts>
                <Text></Text>
            </TouchableOpacity>
       
            <Modal visible={modalVisi}>
                <View style={styles.top}>
                    <TouchableOpacity style={styles.back} onPress={tanca}>
                        <ArrowLeftShort color="black"></ArrowLeftShort>
                    </TouchableOpacity>
                    <Text style={styles.titol}>{t('infoXat')}</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.grup} onPress={() =>eliminarXat(props.id)}>
                        <Text style={styles.textEl}>{t('eliminarXat')}</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.textView}>
                    <Text style={styles.text}>{t('participants')}:</Text>
                </View>
                <View>
                    {
                    props.participants.map((usu,u) => { 
                        return (
                            <View key={u}>
                                <TouchableOpacity style={styles.info_xat} onPress={() => {openPerfil(usu.user)}} >
                                    <Image 
                                        style={styles.foto}
                                        source={urlImatge}
                                        />
                                    <Text style={styles.nom}>{usu.username}</Text>
                                </TouchableOpacity>
                        </View>)
                        ;})
                    }
                </View>
            </Modal>    
        </View>
        <Modal visible={modalPerfil} >
                <TouchableOpacity onPress={() => {setModalPerfil(false); }} style={styles.backperfil}>
                    <XCircleFill color="red" width={145} height={145} />
                </TouchableOpacity>
                    <PerfilSimple id={perfil}> jo={false} </PerfilSimple>
        </Modal>
    </>
    )

}


const styles = StyleSheet.create({

    grup:{
        marginRight:20,
        width:'95%',
        height:50,
        //marginTop:80,
        borderRadius:13,
        backgroundColor:"#DC143C",
        display:'flex',
        flexDirection: 'row',
        margin: 12,
        
    },
    punts:{
        position:'absolute',
        right:0,
        //alignItems:'right'
        
    },
    textEl:{
        alignSelf:"center",
        marginLeft: 10,
        color:'white'
        
    },
    textView:{
    marginBottom:20,
    marginLeft:8    
    },
    text:{
        fontSize:18
    },
    icono:{
        position:'absolute',
        left:180,
        width:60,
        height:60,
        borderRadius:50,
        marginLeft:10,
        marginVertical:12,
    },
    ic:{
        marginVertical:15,
        marginLeft:0
    },
    titol:{

        marginLeft:50
    },
    back:{
        margin:20,
        marginVertical:20
    },
    info_xat: {
        width: '100%',
        height: 70,
        overflow: 'hidden',
        //marginVertical: 10,
        borderColor: '#A9A9A9',
        //borderWidth: 1,
        borderBottomWidth:1,
        backgroundColor:'#DCDCDC'
    },
    foto: {
        width:50,
        height:50,
        borderRadius:50,
        marginLeft:10,
        marginVertical:10,

    },
    nom:{
        position: 'absolute',
        left:80,
        top: 20,
        alignSelf: 'flex-start',
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: 'bold'
    },
    titol:{
        textAlign:'center',
        alignSelf:'center',
        justifyContent:'center'
    },
    top:{
        heigh:50,
        backgroundColor:'#2FDD60',
        width:'100%',
        flexDirection: 'row',

        //alignItems: 'center', 
    },
    backperfil: {
        zIndex: 1,
        position: 'absolute',
        top: 6,
        left: 6,
        width: 16,
        height: 16,
    },
   
})