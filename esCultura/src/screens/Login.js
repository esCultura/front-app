import { Text, View, Image, StyleSheet, Pressable, TextInput} from "react-native";
import React, { useState} from 'react';
import {LinearGradient} from 'expo-linear-gradient';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    return (
        
        <LinearGradient 
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }} 
            colors={["#00FFFF", "#2FDD60"]} 
            style={{flex: 1}}>

            <View style={styles.iconaView}>
                <Image source={require('../../assets/icona-escultura.png')} style={styles.icona}/>
            </View>
            <TextInput style={styles.inputUser} placeholder="Username" placeholderTextColor="#FFFFFF"  />
            <TextInput style={styles.inputPass} placeholder="Password" placeholderTextColor="#FFFFFF" />
            <Pressable 
                title="Login" 
                onPress={() => setModalVisible(true)}
                style={styles.btnLogin} 
            >
                <Text style={styles.loginText}>Login</Text>
            </Pressable>
            <View style={styles.spacerView}></View>
            <Text style={styles.createAcountText}>Create Account</Text>
        </LinearGradient>
        
    );
}


const styles = StyleSheet.create({
    iconaView: {
        marginTop: '10%',
        alignItems: 'center'
    },
    icona: {
        height: 180,
        width: 140,
        resizeMode: 'contain',
    },
    inputUser: {
        height: 40,
        marginTop: '15%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
        marginHorizontal: 20,
        paddingHorizontal: 10,
        color: 'white',
    },
    inputPass: {
        height: 40,
        marginTop: 30,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
        color: 'white',
    },
    btnLogin: {
        marginTop: '35%',
        marginBottom: 30,
        marginLeft: '30%',
        marginRight: '30%',
        height: 40,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
        padding: 7,
        alignItems: 'center',
    },
    loginText: {
        color: 'white',
        fontWeight: 'bold',
    },
    spacerView: {
        backgroundColor: 'white',
        height: 2,
        marginLeft: '10%',
        marginRight: '10%',
        width: '80%',
    },
    createAcountText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: '35%',
        marginTop: 10,
    },
    
});