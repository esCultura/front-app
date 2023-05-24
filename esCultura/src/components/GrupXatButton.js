import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet , TouchableOpacity,Modal,TextInput, Pressable,Image, Alert} from "react-native";
import ArrowLeftShort from 'react-native-bootstrap-icons/icons/arrow-left-short' 
import People from 'react-native-bootstrap-icons/icons/people-fill' 
import { simpleFetch } from "../utils/utilFunctions";
import { useTranslation } from 'react-i18next';




export default function NewGrup (props){
    const [modalVisible, setModalVisible] = useState(false);
    const [usuaris, setUsuaris] =useState([]);
    const [nomGrup,setNomGrup]=useState('');
    const [usuarisSelected, setUsuarisSelected] = useState([]);
    const [textMissatge, setTextMissatge] = useState('');
    const [selected,setSelected] =useState([]);
    const [hihaselected,setHiHaSelected] = useState(false);
    const [update,setUpdate] = useState(false);
    const [data,setData] = useState('');
    const {t} = useTranslation();
    
    let urlImatge =require('../../assets/profile-base-icon.png');
    
    //Canvi input
    function handleTextChange(value) {
        setNomGrup(value);     
    }

    function getIndex(id) {
        return selected.findIndex(obj => obj.id === id);
    }
    
    //Tanca Modal
    function tanca(){
        setModalVisible(false);
        let buit =[];
        setSelected(buit);
    }
    
    //Mostrar Usuaris seleccionats
    renderSeleccionats = () =>{
        if(selected.length){
            return(
                <View>
                    {
                    selected.map((usu,u) => {
                        return (
                            <View key={u}>
                            <Image
                                style={styles.foto}
                                source={urlImatge}/>
                                <Text style={styles.user_seleccionat}>{usu.username}</Text>
                            </View>
                        )
                    ;})
                    }
                </View>
            )
        }
    }
        
    //Function sleccionar usuaris
    function seleccionarUsuaris(user,username){
        let usus;
        if (selected.length != 0) {
            let index =getIndex(user);
            usus = selected;
            if (index == -1) {
                usus.push({id:user, username:username});
            }
            else {
                usus.splice(index,1);
            }
        }
        else {
            usus =[{id:user,username:username}];
        }
        setSelected(usus);
        setUpdate((prevState) =>!prevState);
    }
    
    //Crear Grup
    function crearGrup() {
        if (nomGrup == '') {
            alert("Falta el nom del grup");
        }
        else if (selected.length == 0) {
            alert("No hi han usuaris seleccionats");
        }
        else {
            var partId = [].map.call(selected,e => e.id);
            partId.push(props.user.user);
            let endpoint = 'xats/';
            simpleFetch(endpoint,"POST",{participant_id:partId,nom:nomGrup}).then((data) => setData(data));
            setModalVisible(false);
            props.function(false);
            props.canvia();
        }
    }
    
    useEffect(()=> {
        renderSeleccionats();
    },[update])
    
    return(
        <View>
            <TouchableOpacity style={styles.grup} onPress={() => setModalVisible(true)}>
                <People color="black" style={styles.icono}></People>
                <View>
                    <Text style={styles.text}>{t('createGroup')}</Text>
                </View>  
            </TouchableOpacity>

            <Modal visible={modalVisible}>
                <View >
                    <View style={styles.top}>
                        <TouchableOpacity style={styles.back} onPress={tanca}>
                            <ArrowLeftShort color="black"></ArrowLeftShort>
                        </TouchableOpacity>
                        <Text style={styles.titol}>{t('createGroup')}</Text>
                    </View>
                    <Text style={styles.nomgrup}>{t('groupName')}:</Text>
                
                    <View style={styles.barra}>
                        <View style={styles.search}>
                            <TextInput style={styles.input} placeholder={t('name')} value={nomGrup} onChangeText={handleTextChange}/>
                        </View>   
                    </View>
                    
                    <TouchableOpacity style={styles.boto_crear} onPress={crearGrup}>
                        <Text style={styles.text}>{t('create')}</Text>
                    </TouchableOpacity>
                        
                    <View>
                    {
                    props.usuaris.map((usu,u) => {
                        let index =getIndex(usu.user)
                        if (usu.user != props.user.user & index == -1) {
                            return (
                                <View key={u}>
                                    <TouchableOpacity   style={styles.usuari} onPress={()=>seleccionarUsuaris(usu.user,usu.username)}>
                                        <Text style={styles.nom}>{usu.username}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                        else if (usu.user != props.user.user) {
                            return (
                                <View key={u}>
                                    <TouchableOpacity   style={styles.usuari_selected} onPress={()=>seleccionarUsuaris(usu.user,usu.username)}>
                                        <Text style={styles.nom}>{usu.username}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    ;})
                    }
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    
    back:{
        margin:20,
        marginVertical:20
    },
    barra:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
    boto_crear:{
        width:'75%',
        borderRadius: 13,
        backgroundColor:'#2FDD60',
        height: 35,
        margin:12,
        justifyContent:'center',
        alignSelf:'center'
        
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
    usuari: {
        width: '100%',
        height: 70,
        overflow: 'hidden',
        //marginVertical: 10,
        borderColor: 'black',
        borderWidth: 0.5,
        backgroundColor:'#DCDCDC'
    },
    usuari_selected: {
        width: '100%',
        height: 70,
        overflow: 'hidden',
       //marginVertical: 10,
        borderColor: 'black',
        borderWidth: 0.5,
        backgroundColor:'#AFE1AF'
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
    grup:{
        marginRight:20,
        width:'95%',
        height:60,
        borderRadius:13,
        backgroundColor:"#DCDCDC",
        //display:'flex',
        //flexDirection: 'row',
        margin: 12,
    },
    text:{
        alignSelf:'center'
    },

    top:{
        heigh:50,
        backgroundColor:'#2FDD60',
        width:'100%',
        flexDirection: 'row',

        //alignItems: 'center', 
    },
    titol:{
        textAlign:'center',
        alignSelf:'center',
        justifyContent:'center'
    },
    nomgrup:{
        marginLeft:15,
        marginTop:10
    } 
})

