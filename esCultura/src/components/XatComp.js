import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet , TouchableOpacity,Modal,TextInput,Image, ScrollView} from "react-native";
import ArrowLeftShort from 'react-native-bootstrap-icons/icons/arrow-left-short' 
import ArrowRightShort from 'react-native-bootstrap-icons/icons/arrow-right-short' 
import {simpleFetch} from '../utils/utilFunctions';
import InfoXat from "./InfoXatComp";


export default function Xat (props){
    const [modalVisible, setModalVisible] = useState(false);
    const [urlImatge, setUrlImatge]=useState(require('../../assets/profile-base-icon.png'))
    const [missatges,setMissatges]=useState([]);
    const [textMissatge, setTextMissatge] = useState('');
    const [data,setData] = useState('');
    const [ultim_mis, setUltimMiss] = useState('');
    const scrollViewRef = useRef();
    const [update, setUpdate]=useState(false)
    const [nom, setNom]=useState('');
    const [canvia, setCanvi] =useState('')
    
    function imatgePerfil(props) {
        if(props.imatge != null){
            setUrlImatge(props.imatge);
        }
    };
    
    function handleTextChange(value) {
        setTextMissatge(value);
                
    }
    function ultimMissatge(){
        if(props.miss != null){
            setUltimMiss(props.miss.text)
        }
    }
    function getData(val){
       setModalVisible(val)
    }
    
    
    function veureXat(){
        setModalVisible(true);
    }
    
    useEffect(()=> {
        nomXat()
    })
  
    useEffect(() => {
        
        console.log("RECAREEGA")
        console.log(canvia)
    const fetchMissatges = async () => {  
        let endPoint = 'xats/'+props.id+'/missatges/';
        console.log('XATCOMP')
        simpleFetch(endPoint, "GET", "").then((data) => setMissatges(data))
        //console.log('fetchmissatges')
        //console.log(missatges)
       
    }
    
    fetchMissatges();
    ultimMissatge()
      }, [update]);
      
      function nomXat(){
        let array = props.part
        if(props.nom == null){
            array.forEach(item =>{
                    if(item.user != 6) setNom(item.username);
            })   
        }
        else{
            setNom(props.nom)
        }
     }
    const enviarMissatge = async () => { 
        let endPoint = 'xats/'+props.id+'/missatges/';
        console.log('XATCOMP')
        simpleFetch(endPoint, "POST", {text:textMissatge,xat:props.id}).then((data) => setData(data))
        //console.log(xats)  
        console.log(textMissatge)
        setTextMissatge(' ')
        setUpdate((prevState) =>!prevState)
}


    
    return(
        <View>
            <TouchableOpacity style={styles.info_xat} onPress={veureXat} >
                <Image 
                    style={styles.foto}
                    source={urlImatge}
                    />
                <Text style={styles.nom}>{nom}</Text>
                <Text style={styles.ultim_miss}>{ultim_mis}</Text>
            </TouchableOpacity>
            
            <Modal visible={modalVisible} >
                <View style={styles.top}>
                    <TouchableOpacity style={styles.back} onPress={() => setModalVisible(false)}>
                        <ArrowLeftShort color="black"></ArrowLeftShort>
                    </TouchableOpacity>
                    <Image
                    style={styles.fot}
                    source={urlImatge}/>
                    <View >
                    <Text  styles={styles.nom}>{nom}</Text>
                    </View>
                    
                    <InfoXat onChange={getData} id={props.id} participants={props.part} canvia={() =>props.canvia()}></InfoXat>
                </View>
                
                <View style={styles.scroll}>
                <ScrollView ref={scrollViewRef}
                            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                {
                    missatges?.map((miss,m) => {
                        if(miss.creador.user == props.user.user){
                            return (
                            <View key= {m} style={styles.textpropi}>  
                                <Text  style={styles.textMiss}> {miss.text}</Text>
                                <Text style={styles.hora}> {miss.data}</Text>
                            </View>) 
                        }
                        else{
                        return (
                        <View key ={m}style={styles.textextern}>
                            <Text  style={styles.textMiss}> {miss.text}</Text>
                            <Text  style={styles.hora}> {miss.data}</Text>
                        </View>);}})
                }
                </ScrollView>
                </View>
                <View style={styles.missatge}>
                <TextInput style={styles.input} placeholder={'Missatge'} value={textMissatge} onChangeText={handleTextChange}/>
                
                <TouchableOpacity style={styles.icono} onPress={enviarMissatge}>
                        <ArrowRightShort color="black"></ArrowRightShort>
                </TouchableOpacity>
                
                
                </View>
                
         </Modal>
         </View>
    )

}
    
const styles = StyleSheet.create({
    top:{
        heigh:50,
        backgroundColor:'#2FDD60',
        width:'100%',
        flexDirection: 'row',

        //alignItems: 'center', 
    },
    scroll:{
        marginBottom:125,
    },

        info_xat: {
            width: '100%',
            height: 70,
            overflow: 'hidden',
            //marginVertical: 10,
            borderColor: '#696969',
            borderBottomWidth: 1,
            backgroundColor:'#DCDCDC'
        },
        foto: {
            width:50,
            height:50,
            borderRadius:50,
            marginLeft:10,
            marginVertical:10,

        },
        fot: {
            
            left:50,
            width:50,
            height:50,
            borderRadius:50,
            justifyContent:'center',
            marginVertical:10,
            //flex:1
            
            //borderColor:'green',
            //borderWidth: 4,
        },
        a:{
            textAlign: 'center',
            justifyContent:'center',
            color:'pink'
            
        },
        nom:{
            position: 'absolute',
            left:80,
            top: 10,
            alignSelf: 'flex-start',
            fontSize: 20,
            fontStyle: "normal",
            fontWeight: 'bold'
        },
        ultim_miss:{
            position: 'absolute',
            left:80,
            top: 38,
            alignSelf: 'flex-start',
            fontSize: 12,
            fontStyle: "normal",
        },
        back:{
            marginLeft:20,
            marginVertical:20,
            //position: 'absolute',
            //flex:1,
            position: 'absolute',
            left: 0,
            top: 5,
            
        },
        input:{
            height: 45,
            margin: 12,
            //borderWidth: 1,
            padding: 10,
            borderRadius:13,
            flex:1,
        },
        missatge:{
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
            width:'95%',
            //
            position:'absolute',
            bottom:0,
        },
        icono:{
            marginRight:20,
            fontSize:50
            
        },
        textpropi:{
            backgroundColor: '#dbead5',
            borderWidth: 0.5,
            borderColor: '#000',
            height: 48,
            borderRadius: 13,
            margin: 12,
            marginVertical:10,
            minWidth:'50%',
            //width:'50%',
            right:0,
            textAlign:'right',
            alignSelf:'flex-end'
 
        },
        textextern:{
            backgroundColor: '#d3d3d3',
            borderWidth: 0.5,
            borderColor: '#000',
            height: 48,
            borderRadius: 13,
            margin: 12,
            marginVertical:10, 
            textAlign:'left',
            minWidth:'50%',
            alignSelf:'flex-start'
            //width:'50%',
            
        },
        hora:{
            position:'absolute',
            top:28,
            right:8,
            fontSize:11
            
        },
        textMiss:{
            marginVertical:12,
            marginLeft:5
        }
    })
    
