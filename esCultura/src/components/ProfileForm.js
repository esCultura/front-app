import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { StyleSheet, Image, Platform } from 'react-native';
import { simpleFetch } from "../utils/utilFunctions";

export default function ProfileForm (props, onClose) {
    const [username, setUsername] = useState(props.infoPerfil.username);
    const [bio, setBio] = useState(props.infoPerfil.bio);
    const [password, setPassword] = useState('');
    const[data, setdata] = useState('');
    console.log("aquest", props);

    const handleSave = async () => {
      console.log("bio2", bio);
      let endPoint = 'usuaris/perfils/jo/';
      const response = await simpleFetch(endPoint, "PUT", {bio: bio});
      console.log("reposn", response);

      onClose;
    };

    function handleChange(value) {
      setBio(value);
    }
  
    return (
        <>
        <View style={styles.container}>
        </View>
      <Text> Bio: </Text>
        <TextInput
          style={styles.input}
          value={bio}
          onChangeText={handleChange}
          placeholder="Escriu aquí"
        />

      <Text> Password: </Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Escriu aquí"
        />

        
        <Button style={styles.button} title="Save" onPress={handleSave} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
      },
      input1: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,

      },
      input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
      },
      button: {
        backgroundColor: 'green',
        padding:10,
        borderRadius: 5,
        shadowOffset: { width: 2 , height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        width: 130,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    });
