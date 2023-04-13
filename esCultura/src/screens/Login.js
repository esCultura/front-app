import { Text, View, StyleSheet, Button, TextInput} from "react-native";
import React, { useState} from 'react';
import Screen from "../components/Screen";

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    return (
        <View style={styles.loginBackground}>
            <Text>Login</Text>
            <TextInput 
                value={username}
                placeholder={'username'}
                placeholderTextColor={'#666'}
            >
            </TextInput>
            <TextInput 
                value={password}
                placeholder={'password'}
                placeholderTextColor={'#666'}
            >
            </TextInput>
            <Button title="Login"></Button>
        </View>
    );
}


const styles = StyleSheet.create({
    loginBackground: {
        flex: 1,
        backgroundColor: '#2FDD60',
    },
    
});