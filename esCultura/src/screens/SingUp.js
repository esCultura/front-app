import { Text, View, Image, StyleSheet, Pressable, TextInput} from "react-native";
import React, { useState} from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import * as Keychain from 'react-native-keychain';

export default function SingUp() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState('');
    let host = 'http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/';


    function loginWithGoole() {
        console.log("create with google");
    }

    function singUp() {
        console.log("create");
        
        fetch(host+'usuaris/sign_up/perfils/', {
            method: "POST",
            /*
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            */
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            },
            
            body: JSON.stringify({password: password, password2: password, username: username, email: email}),
        })
            .then(res => res.json())
            .then(async data => {
                setData(data);
                console.log("singUP: ", data);
                if (data.created) {
                    await Keychain.setGenericPassword(username, password);
                }
            })
            .catch(console.error)
    }

    function handleTextChangeUsername(value) {
        setUsername(value);
        console.log("username: ", username);
    }
    function handleTextChangeEmail(value) {
        setEmail(value);
        console.log("password: ", email);
    }
    function handleTextChangePassword(value) {
        setPassword(value);
        console.log("password: ", password);
    }

    return (
        
        <LinearGradient 
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }} 
            colors={["#00FFFF", "#2FDD60"]} 
            style={{flex: 1}}>

            <View style={styles.iconaView}>
                <Image source={require('../../assets/icona-escultura.png')} style={styles.icona}/>
            </View>
            <TextInput style={styles.inputUser} 
                placeholder="Username" 
                placeholderTextColor="#FFFFFF" 
                value={username}
                onChangeText={handleTextChangeUsername}
            />
            <TextInput style={styles.inputPass} 
                placeholder="E-mail" 
                placeholderTextColor="#FFFFFF"
                value={email}
                onChangeText={handleTextChangeEmail}

            />
            <TextInput style={styles.inputPass}
                placeholder="Password" 
                placeholderTextColor="#FFFFFF" 
                value={password}
                onChangeText={handleTextChangePassword}
                secureTextEntry={true}
            />

            <Pressable 
                title="singUp" 
                onPress={() => singUp()}
                style={styles.btnSingUp} 
            >
                <Text style={styles.singUpText}>Create Account</Text>
            </Pressable>
            <View style={styles.spacerView}></View>
            
            <Text style={styles.createAcountText}>Or Sing up with</Text>
            <Pressable 
                title="login"
                onPress={() => loginWithGoole()}
                style={styles.btnExternSingUp} 
            >
                <Image source={require('../../assets/icona-escultura.png')} style={styles.iconaGoogle}/>
            </Pressable>
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
        marginTop: 20,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
        color: 'white',
    },
    btnSingUp: {
        marginTop: '20%',
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
    singUpText: {
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
    btnExternSingUp: {
        width: 30,
        maringTop: 10,
        padding: 5,
        marginLeft: '45%',
        alignItems: 'center',
        backgroundColor: 'blue',
    },
    iconaGoogle: {
        height: 30,
        width: 17,
        resizeMode: 'contain',
    }
    
});