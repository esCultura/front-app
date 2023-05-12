import { Text, View, Image, StyleSheet, Pressable, TextInput} from "react-native";
import React, { useState, useEffect} from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {setToken} from '../utils/utilFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';


WebBrowser.maybeCompleteAuthSession();

export default function Login({navigation, onLogin}) {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMesage, setErrorMesage] = useState('');
    const [accessToken, setAccessToken] = useState(null);
    const [request, response, promtAsync] = Google.useIdTokenAuthRequest({
        clientId: "770757510426-2lniaqalfcjjk33tl1lbi75u32sbc2t0.apps.googleusercontent.com",
        iosClientId: "770757510426-j3rkn6j0qcns6gk4k0rsjtpphe3lghqj.apps.googleusercontent.com",
        androidClientId: "770757510426-cklpthldhp6u7iurthc8mfjmlr2kueuv.apps.googleusercontent.com"
    });
    const [data, setData] = useState('');

    const {t} = useTranslation();

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

    async function _storeData() {
      try {
        await AsyncStorage.setItem(
          "userInfo",
          data,
        );
      } catch (error) {
        console.log("error to save in local store, error: ", error);
      }
    };

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
                //console.log("token: ", data.token);

                //save data local
                /*
                    Info que he de guardar en local
                    - data.imatge                                   --> imatge
                    - data.user                                     --> userID
                    - data.bio                                      --> userBio
                    - data.email                                    --> userEmail
                    - data.estadistiques.assistencies_passades      --> userAssis
                    - data.estadistiques.interessos_esdeveniments   --> userIntEsde
                    - data.estadistiques.interessis_tematiques      --> userIntTema
                    - data.estadistiques.missatges_enviats          --> userMsg
                    - data.estadistiques.reserves_futures           --> userRes
                    - data.estadistiques.seguidors                  --> userSeguidors
                    - data.estadistiques.seguits                    --> userSeguits
                    - data.estadistiques.xats_participant           --> userXats
                */
                
                if (data.token) {
                    setToken(data.token);
                    onLogin(true);
                    _storeData();
                }
                if (data.non_field_errors) {
                    setErrorMesage(data.non_field_errors);
                }
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
                placeholder={t('Username')}
                placeholderTextColor="#FFFFFF"  
                value={username}
                onChangeText={handleTextChangeUsername}
            />
            <TextInput style={styles.inputPass} 
                placeholder={t('Password')}
                placeholderTextColor="#FFFFFF" 
                value={password}
                onChangeText={handleTextChangePassword}
                secureTextEntry={true}
            />
            <Text style={styles.errorMsg} >
                {errorMesage ? errorMesage : null}
            </Text>
            <Pressable 
                title="Login" 
                onPress={() => login()}
                style={styles.btnLogin} 
            >
                <Text style={styles.loginText}>{t('Login')}</Text>
            </Pressable>
            <Text style={styles.loginWith}>{t('Or_Login_with')}</Text>
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
                <Text style={styles.createAcountText}>{t('Create_Account')}</Text>                
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
    errorMsg: {
        marginTop: 5,
        marginLeft: '5%',
        marginRight: '5%',
        color: 'red',
    },
    
});