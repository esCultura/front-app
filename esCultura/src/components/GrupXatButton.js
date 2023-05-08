import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet , TouchableOpacity,Modal, FlatList,TextInput,Button, Pressable} from "react-native";
import ArrowLeftShort from 'react-native-bootstrap-icons/icons/arrow-left-short' 
import People from 'react-native-bootstrap-icons/icons/people-fill' 




export default function NewGrup (props){
    const [modalVisible, setModalVisible] = useState(false);
    const [usuaris, setUsuaris] =useState([]);
    const [nomGrup,setNomGrup]=useState('');
    const [usuarisSelected, setUsuarisSelected] = useState([])
    const [textMissatge, setTextMissatge] = useState('');
    const [selected,setSelected] =useState([])
    const [hihaselected,setHiHaSelected] = useState(false)
    const [update,setUpdate] = useState(false)
    
    function handleTextChange(value) {
        setTextMissatge(value);     
    }
    function patata(){
        setModalVisible(false)
    }
    function iniciaSelected(){
        
    }
    
    
    
    renderSeleccionats = () =>{
        if(hihaselected){
            return(
                <View>
                    {
                   selected.map((usu,u) => {
                
                return (
                    <View key={u}>
                            <Text style={styles.nom}>{usu.username}</Text>
                            <Text>{usu.id}</Text>
                        
                </View>)
                ;})
        }
                </View>
            )
        
                
    }}
        
  
    
    function seleccionarUsuaris(user,username){
        let usus
        console.log(user,username)
        if(selected.length != 0){
            console.log("ifffffffffff")
            usus = selected
            usus.push({id:user, username:username})
        }
        else{
            console.log('elseeeeee')
            usus =[{id:user,username:username}]
        }
        console.log(usus)
        setSelected(usus)
        console.log(selected)
        setHiHaSelected(true)
        console.log(hihaselected)
        setUpdate((prevState) =>!prevState)
        
    }
    
    useEffect(()=> {
        renderSeleccionats()
        
    },[update])
    
    
    
    return(
        <View>
            <TouchableOpacity style={styles.grup} onPress={() => setModalVisible(true)}>
                <People color="black" style={styles.icono}></People>
                <View styles={styles.text}>
                    <Text style={styles.t}>Nou Grup</Text>
                    </View>
                
            </TouchableOpacity>

            <Modal visible={modalVisible}>
                
            <View style={styles.crearGrup}>

                <View style={styles.top}>
                    
                <TouchableOpacity style={styles.back} onPress={() => setModalVisible(false)}>
                        <ArrowLeftShort color="black"></ArrowLeftShort>
                    </TouchableOpacity>
                
                <Text style={styles.titol}>Crear Grup</Text>
                </View>
                <Text>Nom Grup:</Text>
                <View style={styles.barra}>
                    <View style={styles.search}>
                        <TextInput style={styles.input} placeholder={'Nom'} value={nomGrup} onChangeText={handleTextChange}/>
                    </View>
                    
                    
                    
                </View>
                <TouchableOpacity style={styles.boto_crear}>
                        <Text>Crear</Text>
                    </TouchableOpacity>
                    <View>
                        {this.renderSeleccionats()}
                    </View>
                <View>
            {
            props.usuaris.map((usu,u) => {
                //let index =selected.find((a) =>a.user === usu.user)
                //onsole.log("indexaaaa",index.bool)
                if(usu.user != props.user ){
                return (
                    <View key={u}>
                        <TouchableOpacity   style={styles.info_xat} onPress={()=>seleccionarUsuaris(usu.user,usu.username)}>
                            <Text style={styles.nom}>{usu.username}</Text>
                        </TouchableOpacity>
                </View>)}
                else if(usu.user != props.user){
                    return (
                        <View key={u}>
                            <TouchableOpacity   style={styles.info_xat_selected} onPress={()=>seleccionarUsuaris(usu.username)}>
                                <Text style={styles.nom}>{usu.username}</Text>
                            </TouchableOpacity>
                    </View>)
                }
                ;})
            }
    </View>
            </View>
             
            </Modal>
            </View>
    )
}

/*   <View>
            {
            props.usuaris.map((usu,u) => {
                if(usu.user != props.user){
                return (
                    <View key={u}>
                        <TouchableOpacity   style={styles.info_xat} onPress={()=>setUsuarisSelected(usu.user)}>
                            <Text style={styles.nom}>{usu.username}</Text>
                        </TouchableOpacity>
                </View>)}
                ;})
            }
    </View>*/


const styles = StyleSheet.create({
    
    plus:{
        marginRight:20,
        width:45,
        height:45,
        borderRadius:13,
        backgroundColor:"#DCDCDC"
    },
    icono_plus:{
       fontSize:30,
       marginLeft:14,
       marginVertical:1.5,
       
    },
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
        justifyContent:'center'
        
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
        height: 70,
        overflow: 'hidden',
        //marginVertical: 10,
        borderColor: 'black',
        borderWidth: 0.5,
        backgroundColor:'#DCDCDC'
    },
    info_xat_selected: {
        width: '100%',
        height: 70,
        overflow: 'hidden',
        marginVertical: 10,
        borderColor: 'black',
        borderWidth: 1,
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
    crearGrup:{
        width:'100%',
        height:'100%'
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
        backgroundColor: 'blue',
        marginLeft:600
        
    },
    t:{

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
    button:{
        height:35,
        width:50,
        borderRadius:13,
        backgroundColor: '#2FDD60'
    }
    

   
})

