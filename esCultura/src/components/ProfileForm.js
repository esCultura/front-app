import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { StyleSheet, Image, Platform } from 'react-native';
import { simpleFetch } from "../utils/utilFunctions";

export default function ProfileForm (props, onSave) {
    const [username, setUsername] = useState(props.infoPerfil.username);
    const [bio, setBio] = useState(props.infoPerfil.bio);
    const [password, setPassword] = useState(props.infoPerfil.password);
    console.log(props);

    const handleSave = async () => {
      const updatedInfoPerfil = { username, bio, password };
      console.log(username);
      let endPoint = 'usuaris/perfils/jo';
      const data = await simpleFetch(endPoint, "POST", {username: username, bio: bio, password:password});
    };

  
    return (
        <>
        <View style={styles.container}>
        </View>
        <Text> Username: </Text>
        <TextInput
          style={styles.input1}
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
        />
      <Text> Bio: </Text>
        <TextInput
          style={styles.input}
          value={bio}
          onChangeText={setBio}
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
