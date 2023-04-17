import { Text, View, Image, StyleSheet, Pressable, TextInput} from "react-native";
import React, { useState} from 'react';
import {LinearGradient} from 'expo-linear-gradient';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState('');
    let host = 'http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/';


    function login() {
        console.log("login");
        
        fetch(host+'usuaris/login/perfils/',  {   
            method: "POST",
            /*
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            */
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            
            body: JSON.stringify({password: password, username: username}),
        })
            .then(res => res.json())
            .then(data => {
                setData(data);
                console.log("login: ", data);
            })
            .catch(console.error)
    }

    function loginWithGoogle() {
        console.log("login with google");
    }

    function handleTextChangePassword(value) {
        setPassword(value);
    }
    function handleTextChangeUsername(value) {
        setUsername(value);
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
                placeholder="Password" 
                placeholderTextColor="#FFFFFF" 
                value={password}
                onChangeText={handleTextChangePassword}
                secureTextEntry={true}
            />
            <Pressable 
                title="Login" 
                onPress={() => login()}
                style={styles.btnLogin} 
            >
                <Text style={styles.loginText}>Login</Text>
            </Pressable>
            <Text style={styles.loginWith}>Or Login with</Text>
            <Pressable 
                title="login"
                onPress={() => loginWithGoogle()}
                style={styles.btnExternLogin} 
            >
                <Image source={require('../../assets/icona-escultura.png')} style={styles.iconaGoogle}/>
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
    loginWith: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: '35%',
        marginTop: 10,
        marginBottom: 10,
    },
    btnExternLogin: {
        width: 30,
        maringTop: 10,
        marginBottom: 10,
        padding: 5,
        marginLeft: '45%',
        alignItems: 'center',
        backgroundColor: 'blue',
    },
    iconaGoogle: {
        height: 30,
        width: 17,
        resizeMode: 'contain',
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