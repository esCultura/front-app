import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const bgcolor = '#3BDE4B';

export default function Esdeveniment (props) {
    return (
        <View style={styles.card}>
            <Image source={{uri: props.source}} style={styles.image}/>
            <Text style={styles.type}>{props.type}</Text>
            <View style={styles.card_info}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.info}>🗓️ {props.date} 📌 {props.location}</Text>
                <Text style={styles.preu}>{props.preu}</Text>
                <Text style={styles.complet}>{props.complet}</Text>
                <Text style={styles.source}>{props.source}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: 404,
        height: 761,
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
        textAlign: 'justify'
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
    image: {
        width: "100%",
        height: "23%",
    }
});