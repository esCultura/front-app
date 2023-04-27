import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet , TouchableOpacity,Modal, FlatList} from "react-native";
import ArrowLeftShort from 'react-native-bootstrap-icons/icons/arrow-left-short' 
import People from 'react-native-bootstrap-icons/icons/people-fill' 
import Xat from "../components/XatComp";



export default function NewGrup (props){
    const [modalVisible, setModalVisible] = useState(false);
    const [usuaris, setUsuaris] =useState([]);
    const [data,setData]=useState('')
    return(
        <View style={styles.grup} onPress={() => setModalVisible(true)}>
            
            <People color="black" style={styles.icono}></People>
            <Text styles={styles.titol}>Nou Grup</Text>
            
        <Modal visible={modalVisible}>
            
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
    }
    

   
})