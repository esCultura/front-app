import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet , TouchableOpacity,Modal, FlatList} from "react-native";
import ArrowLeftShort from 'react-native-bootstrap-icons/icons/arrow-left-short' 
import Punts from 'react-native-bootstrap-icons/icons/three-dots-vertical' 
import Xat from "../components/XatComp";



export default function InfoXat (props){
    const [modalVisible, setModalVisible] = useState(false);
    const [usuaris, setUsuaris] =useState([]);
    const [data,setData]=useState('')
    return(
        <View>
             <TouchableOpacity  onPress={() => setModalVisible(true)} >
             <Punts color="black" style={styles.icono}></Punts>
            </TouchableOpacity>
       
            
            

        <Modal visible={modalVisible}>
            
            <View>
            <TouchableOpacity style={styles.back} onPress={() => setModalVisible(false)}>
                        <ArrowLeftShort color="black"></ArrowLeftShort>
                    </TouchableOpacity>
                <Text>PAtaaaaaaa</Text>
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
        display:'flex',
        flexDirection: 'row',
        margin: 12,
        
    },
    icono:{
        width:60,
        height:60,
        borderRadius:50,
        marginLeft:10,
        marginVertical:12,
    },
    titol:{

        marginLeft:50
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
    

   
})