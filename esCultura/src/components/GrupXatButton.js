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
    
    function handleTextChange(value) {
        setTextMissatge(value);
                
    }
    return(
        <View>
            <TouchableOpacity style={styles.grup} onPress={() => setModalVisible(true)}>
                <People color="black" style={styles.icono}></People>
                <View styles={styles.text}>
                    <Text style={styles.t}>Nou Grup</Text>
                    </View>
                
            </TouchableOpacity>

            <Modal visible={modalVisible}>
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
                <View>
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
    </View>
            </Modal>
            </View>
    )
}


const styles = StyleSheet.create({

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
    icono:{
        width:60,
        height:60,
        borderRadius:50,
        marginLeft:10,
        marginVertical:12,
        
    },
    text:{
        backgroundColor: 'blue',
        marginLeft:600
        
    },
    t:{
        
        alignSelf:'center'
    },
    barra:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        top:50
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
        width:'80%'
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