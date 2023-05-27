import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';
import { simpleFetch } from "../utils/utilFunctions";

export default function ProfileForm(props) {
  const [username, setUsername] = useState(props.infoPerfil.username);
  const [bio, setBio] = useState(props.infoPerfil.bio);
  const [password, setPassword] = useState('');

  const handleSave = async () => {
    let endPoint = 'usuaris/perfils/jo/';
    const response = await simpleFetch(endPoint, "PUT", { bio: bio });

    props.onClose();
  };

  function handleChange(value) {
    setBio(value);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Bio:</Text>
      <TextInput
        style={styles.input}
        value={bio}
        onChangeText={handleChange}
        placeholder="Escriu aquí"
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Escriu aquí"
        secureTextEntry={true}
      />

        <TouchableOpacity style={styles.editButton} onPress={() => { handleSave()}}>
                    <Icon name="save" size={31} color="black" />
         </TouchableOpacity> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  editButton: {
    marginTop: 10,
alignSelf: 'flex-end',
padding: 10,
borderRadius: 5,
marginRight: 5,},
});
