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
            
            <People color="black"></People>
            <Text>Nou Grup</Text>
            
        <Modal visible={modalVisible}>
            
            </Modal>    
        </View>
    )
}