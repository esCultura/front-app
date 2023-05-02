import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { StyleSheet, Image, Platform } from 'react-native';
import { simpleFetch } from "../utils/utilFunctions";

export default function ProfileForm (props, onSave) {
    const [username, setUsername] = useState(props.infoPerfil.username);
    console.log(props);

    const handleSave = async () => {
      const updatedInfoPerfil = { username };
      console.log(username);
      let endPoint = 'usuaris/perfils/jo';
      const data = await simpleFetch(endPoint, "POST", {username: username})
     
      //setFormVisible(false);
    };

  
    return (
        <>
        <Text> Username: </Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
        />
        
        <Button style={styles.button} title="Save" onPress={handleSave} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
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
