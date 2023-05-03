import { Text, View, Image, StyleSheet, Pressable, TextInput} from "react-native";
import React, { useState, useEffect} from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

export default function Login({navigation, onLogin}) {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [accessToken, setAccessToken] = useState(null);
    const [request, response, promtAsync] = Google.useIdTokenAuthRequest({
        clientId: "770757510426-2lniaqalfcjjk33tl1lbi75u32sbc2t0.apps.googleusercontent.com",
        iosClientId: "770757510426-j3rkn6j0qcns6gk4k0rsjtpphe3lghqj.apps.googleusercontent.com",
        androidClientId: "770757510426-cklpthldhp6u7iurthc8mfjmlr2kueuv.apps.googleusercontent.com"
    });
    const [data, setData] = useState('');
    let host = 'http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/';

    useEffect( ()=>{
        console.log("google response: ", response?.type);
        if (response?.type === "success") {
            console.log("response params: ", response.params);
            console.log("response auth: ", response.authentication);
            setAccessToken(response.authentication);
            
            fetch(host+'usuaris/sign_in/google-oauth2', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                },
                
                body: JSON.stringify({access_token: accessToken}),
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
                .catch(console.error)
            
        }
    }, [response, accessToken])


    function loginWithGoogle() {
        promtAsync();
        console.log("login amb google");
    }


    function login() {
        console.log("login");
        
        fetch(host+'usuaris/login/perfils/',  {   
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify({password: password, username: username}),
        })
            .then(res => res.json())
            .then(data => {
                setData(data);
                console.log("login: ", data);
                console.log("token: ", data.token);
                onLogin(true);
            })
            .catch(console.error)
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
            colors={["#00FFFF", "#2eca5a"]} 
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
                <Image source={require('../../assets/icon-google.png')} style={styles.iconaGoogle}/>
            </Pressable>
            <View style={styles.spacerView}></View>
            <Pressable 
                title="createAccount"
                onPress={()=>navigation.navigate("SingUp")}
            >
                <Text style={styles.createAcountText}>Create Account</Text>                
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
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 40,
        width: 150,
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
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        marginBottom: 10,
    },
    btnExternLogin: {
        width: 30,
        maringTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        width: 50,
        padding: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
    },
    iconaGoogle: {
        height: 30,
        width: 17,
        resizeMode: 'contain',
    },
    spacerView: {
        backgroundColor: 'white',
        height: 2,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '80%',
    },
    createAcountText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
    },
    
});