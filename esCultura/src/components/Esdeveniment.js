import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import InfoCompleta from "./InfoCompleta";

let typecolor = '#3BDE4B';
const colored_types = ["musical", "teatre", "exposicions", "concert"];
const type_colors   = ['#3BDE4B', '#3BDE4B', '#3BDE4B', '#3BDE4B'];

export default function Esdeveniment (props) {
    const [modalVisible, setModalVisible] = useState(false);

    let type = props.type[0].nom;

    return (
        <>
            <TouchableOpacity style={styles.card} onPress={() => setModalVisible(true)}>
                <Image source={{uri: props.source}} style={styles.image}/>
                <Text style={styles.type}>{type}</Text>
                
                <View style={styles.card_info}>
                    {/* <Text style={styles.like}><LikeButton></LikeButton></Text> */}
                    <Text style={styles.title}>{props.title}</Text>
                    {/* <Text style={styles.brief}>{props.brief}</Text> */}
                    <Text style={styles.info}>🗓️ {props.date}</Text>
                    <Text style={styles.info}>📌 {props.location}</Text>
                    {/* <Text style><Reservar ></Reservar></Text> */}
                </View>
            </TouchableOpacity>

            <InfoCompleta 
                visible={modalVisible} 
                back={() => setModalVisible(false)}
                type={props.type}
                title={props.title}
                preu={props.preu}
                complet = {props.desc}
                date = {props.date}
                location = {props.location}
                source= {props.source}
            />
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '95%',
        height: 150,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 4,
        shadowOpacity: 1,
        borderRadius: 13,
        overflow: 'hidden',
        marginVertical: 10,
        borderColor: 'black',
        borderWidth: 1,
    },
    type: {
        position: 'absolute',
        right: 6,
        top: 6,
        alignSelf: 'flex-start',
        paddingVertical: 2,
        paddingHorizontal: 11,
        borderRadius: 12,
        backgroundColor: typecolor,
        color: "white",
    },
    title: {
        fontSize: RFPercentage(2),
        fontWeight: "700",
        fontStyle: "normal",
        color: "#000000"
    },
    brief: {
        paddingTop: 5,
        fontSize: 15,
        fontWeight: "400",
        fontStyle: "normal",
        lineHeight: 15,
        color: "#000000"
    },
    info: {
        paddingTop: 5,
        fontSize: 13,
        fontWeight: "400",
        fontStyle: "normal",
        lineHeight: 13,
        color: "#000000"
    },
    card_info: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        height: "50%",
        backgroundColor: "white",
        borderColor: "#2FDD60",
        borderTopWidth: 2,
    },
    image: {
        width: "100%",
        aspectRatio: 15/3,
    },
    like:{
        position: 'absolute',
        right: 6,
        top: 6,
        alignSelf: 'flex-start',
        padding: 10
       
    },
    
});