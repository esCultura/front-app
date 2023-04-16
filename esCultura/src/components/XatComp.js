import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet , TouchableOpacity,Modal,TextInput,Image} from "react-native";
import ArrowLeftShort from 'react-native-bootstrap-icons/icons/arrow-left-short' 

export default function Xat (props){
    const [modalVisible, setModalVisible] = useState(false);
    
    
    return(
        <View>
            <TouchableOpacity style={styles.info_xat} onPress={() => setModalVisible(true)} >
                <Image 
                    style={styles.foto}
                    source={{
                        uri:'https://reactnative.dev/img/tiny_logo.png'
                    }}/>
                <Text style={styles.nom}>PATATA</Text>
            </TouchableOpacity>
            
            <Modal visible={modalVisible}>
            <TouchableOpacity style={styles.back} onPress={() => setModalVisible(false)}>
                <ArrowLeftShort color="black"></ArrowLeftShort>
            </TouchableOpacity>
        
         </Modal>
         </View>
    )

}
    
const styles = StyleSheet.create({
   
        
    
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
        nom:{
            position: 'absolute',
            right: 240,
            top: 20,
            alignSelf: 'flex-start',
            fontSize: 20,
            fontStyle: "normal",
        },
        back:{
            margin:20,
            marginVertical:20
        }
    })
    
