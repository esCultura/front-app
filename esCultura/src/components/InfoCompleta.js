import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import LikeButton from "./LikeButton";
import Reservar from "./ReservarButton";

const bgcolor = '#3BDE4B';

export default function InfoCompleta (props) {
    return (
        <View style={styles.card}>
            <Image source={{uri: props.source}} style={styles.image}/>
            <Text style={styles.type}>{props.type}</Text>
            <View style={styles.card_info}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.like}><LikeButton  ></LikeButton></Text>
                <Text style={styles.info}>🗓️ {props.date} 📌 {props.location}</Text>
                <Text style={styles.preu}>{props.preu}</Text>
                <Text style={styles.complet}>{props.complet}</Text>
                <Text style={styles.source}>{props.source}</Text>
                <Text ><Reservar perfil="primerUsuari" esdeveniment="20230315095" ></Reservar></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: "100%",
        aspectRatio: 5/3,
    },
    card: {
        width: '100%',
        height: '100%',
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 4,
        shadowOpacity: 1,
        borderRadius: 13,
        overflow: 'hidden',
        marginVertical: 10,
    },
    type: {
        position: 'absolute',
        right: 6,
        top: 6,
        alignSelf: 'flex-start',
        paddingVertical: 2,
        paddingHorizontal: 11,
        borderRadius: 12,
        backgroundColor: bgcolor,
        color: "white",
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        fontStyle: "normal",
        lineHeight: 24,
        color: "#000000"
    },
    info: {
        paddingTop: 8,
        fontSize: 14,
        fontWeight: "400",
        fontStyle: "normal",
        lineHeight: 13,
        color: "#000000"
    },
    preu: {
        paddingTop: 10,
        fontSize: 14,
        fontWeight: "400",
        fontStyle: "normal",
        lineHeight: 13,
        color: "#000000"
    },
    complet: {
        paddingTop: 10,
        fontSize: 15,
        fontWeight: "400",
        fontStyle: "normal",
        lineHeight: 15,
        color: "#000000",
        textAlign: "justify"
    },
    source: {
        paddingTop: 10,
        fontSize: 14,
        fontWeight: "400",
        fontStyle: "normal",
        lineHeight: 13,
        color: "#000000"
    },
    card_info: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        height: "50%",
        backgroundColor: "bgcolor",
        borderColor: "#2FDD60",
        borderTopWidth: 2,
    },
    like:{
        position: 'absolute',
        right: 6,
        top: 6,
        alignSelf: 'flex-start',
        padding: 10
    },
   
    
});