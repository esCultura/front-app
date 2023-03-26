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
                <Text style={styles.brief}>{props.brief}</Text>
                <Text style={styles.info}>🗓️ {props.date} 📌 {props.location}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: '100%',
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
    }
});