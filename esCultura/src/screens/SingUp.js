import { Text, View, Image, StyleSheet, Pressable, TextInput} from "react-native";
import React, { useState, useEffect} from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import * as Keychain from 'react-native-keychain';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {setToken} from '../utils/utilFunctions';
import { useTranslation } from 'react-i18next';


// tuturial que he seguit
//https://www.youtube.com/watch?v=MBMWiTsqnck&ab_channel=CodewithBeto
//ALERTA per poder fer login de forma correcta cal fer prebuild de l'app


WebBrowser.maybeCompleteAuthSession();

export default function SingUp({navigation, onLogin}) {

    const [accessToken, setAccessToken] = useState('null');
    const [request, response, promtAsync] = Google.useIdTokenAuthRequest({
        clientId: "770757510426-2lniaqalfcjjk33tl1lbi75u32sbc2t0.apps.googleusercontent.com",
        iosClientId: "770757510426-j3rkn6j0qcns6gk4k0rsjtpphe3lghqj.apps.googleusercontent.com",
        androidClientId: "770757510426-cklpthldhp6u7iurthc8mfjmlr2kueuv.apps.googleusercontent.com"
    });

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [data, setData] = useState('');

    const {t} = useTranslation();

    const host = 'http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/';

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

    function loginWithGoole() {
        promtAsync();
        console.log("create with google");
    }

    function singUp() {
        console.log("create");
        
        fetch(host+'usuaris/sign_up/perfils/', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify({password: password, password2: password, username: username, email: email}),
        })
            .then(res => res.json())
            .then(async data => {
                setData(data);
                //console.log("singUP: ", data);
                //console.log("token singup: ", data.token);
                
                if (data.token) {
                    setToken(JSON.stringify(data));
                    onLogin(true);
                }
                if (data.email) {
                    let str = '';
                    for (let error of data.email) {
                        str += error + "\n";
                    }
                    setErrorEmail(str);
                }
                if (data.password) {
                    let str = '';
                    for (let error of data.password) {
                        str += error + "\n";
                    }
                    setErrorPassword(str);
                }
            })
            .catch(console.error)
    }

    function handleTextChangeUsername(value) {
        setUsername(value);
    }
    function handleTextChangeEmail(value) {
        setEmail(value);
    }
    function handleTextChangePassword(value) {
        setPassword(value);
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
                placeholder={t('Username')} 
                placeholderTextColor="#FFFFFF" 
                value={username}
                onChangeText={handleTextChangeUsername}
            />

            <TextInput style={styles.inputPass} 
                placeholder={t('e_mail')} 
                placeholderTextColor="#FFFFFF"
                value={email}
                onChangeText={handleTextChangeEmail}
            />

            <Text style={styles.errorMsg} >
                {errorEmail ? errorEmail : null} 
            </Text>
            
            <TextInput style={styles.inputPass}
                placeholder={t('Password')}
                placeholderTextColor="#FFFFFF" 
                value={password}
                onChangeText={handleTextChangePassword}
                secureTextEntry={true}
            />
            
            <Text style={styles.errorMsg} >
                {errorPassword ? errorPassword : null}
            </Text>

            <Pressable 
                title="singUp" 
                onPress={() => singUp()}
                style={styles.btnSingUp} 
            >
                <Text style={styles.singUpText}>{t('Create_Account')}</Text>
            </Pressable>
            <View style={styles.spacerView}></View>
            
            <Text style={styles.createAcountText}>{t('Or_Sing_up_with')}</Text>
            <Pressable 
                title="login"
                onPress={() => loginWithGoole()}
                style={styles.btnExternSingUp} 
            >
                <Image source={require('../../assets/icon-google.png')} style={styles.iconaGoogle}/>
            </Pressable>
            <Text>{accessToken}</Text>
            <Pressable 
                title="login"
                onPress={()=>navigation.navigate("Login")}
            >
                <Text style={styles.createAcountText}>{t('Login')}</Text>                
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
        marginTop: 30,
        marginBottom: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
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
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '80%',
    },
    createAcountText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 5,
        marginBottom: 15,
    },
    btnExternSingUp: {
        width: 30,
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
    errorMsg: {
        marginTop: 5,
        marginLeft: '5%',
        marginRight: '5%',
        color: 'red',
    },
    
});