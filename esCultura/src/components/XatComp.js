import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet , TouchableOpacity,Modal,TextInput,Image} from "react-native";
import ArrowLeftShort from 'react-native-bootstrap-icons/icons/arrow-left-short' 

export default function Xat (props){
    const [modalVisible, setModalVisible] = useState(false);
    const [urlImatge, setUrlImatge]=useState(require('../../assets/profile-base-icon.png'))
    
    function imatgePerfil(props) {
        if(props.imatge != null){
            setUrlImatge(props.imatge);
        }
    };
    
    
    return(
        <View>
            <TouchableOpacity style={styles.info_xat} onPress={() => setModalVisible(true)} >
                <Image 
                    style={styles.foto}
                    source={urlImatge}
                    />
                <Text style={styles.nom}>{props.username}</Text>
            </TouchableOpacity>
            
            <Modal visible={modalVisible}>
                <View style={styles.top}>
                    <TouchableOpacity style={styles.back} onPress={() => setModalVisible(false)}>
                        <ArrowLeftShort color="black"></ArrowLeftShort>
                    </TouchableOpacity>
                    <Image
                    style={styles.fot}
                    source={urlImatge}/>
                    <Text >{props.username}</Text>
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
        justifyContent: 'center',
        alignItems: 'center', 
    },

        info_xat: {
            width: '100%',
            height: 70,
            overflow: 'hidden',
            marginVertical: 10,
            borderColor: 'black',
            borderWidth: 1,
            backgroundColor:'#DCDCDC'
        },
        foto: {
            width:50,
            height:50,
            borderRadius:50,
            marginLeft:10,
            marginVertical:10,
            
            //borderColor:'green',
            //borderWidth: 4,
        },
        fot: {
            width:50,
            height:50,
            borderRadius:50,
            //marginLeft:10,
            marginVertical:10,
            //position: 'absolute',
            left: 0 ,
            
            
            
            //borderColor:'green',
            //borderWidth: 4,
        },
        nom:{
            position: 'absolute',
            right: 240,
            top: 20,
            alignSelf: 'flex-start',
            fontSize: 20,
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
            
        }
    })
    
