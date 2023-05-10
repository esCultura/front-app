import React,{ useEffect, useState } from "react";  
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function Categoria (props){
    const [modalVisible, setModalVisible] = useState(false);
    const bgcolor = '#3BDE4B'
    
    
    return(
        <View>
            <TouchableOpacity onPress={()=>setModalVisible(true)}>
                <Text style={styles.type}>{props.tipus}</Text>
            </TouchableOpacity>
            
        <Modal visible={modalVisible}>
        <TouchableOpacity onPress={()=>setModalVisible(false)}>
                <Text>AAAAAAAAAAAAAAAAAAAAA</Text>
            </TouchableOpacity>
        </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    
    type:{
        paddingVertical: 2,
        paddingHorizontal: 11,
        borderRadius: 12,
        backgroundColor: '#3BDE4B',
        color: "white",
    },
})