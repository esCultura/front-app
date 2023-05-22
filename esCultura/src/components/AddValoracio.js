import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import { simpleFetch } from '../utils/utilFunctions';

export default function AddValoracio(props) {
    
    const [textDesc, setTextDesc] = useState('');
    const [puntuacio, setPuntuacio] = useState(0);
    const [userId, setUserId] = useState();

    useEffect(()=> {
        simpleFetch("usuaris/perfils/jo", "GET", ).then((data) => setUserId(data.user));
    },[])

    function creaValoracio() {
        console.log("s'ha creat la valoracio: ", {"creador_id": userId, "text": textDesc, "puntuacio": puntuacio, "esdeveniment": props.esdeveniment });
        simpleFetch("valoracions/", "POST", 
            {
                "creador_id": userId,
                "text": textDesc,
                "puntuacio": puntuacio,
                "esdeveniment": props.esdeveniment
            }
        );
    }

    return (
        <View>
            <Text style={styles.textValorar}>Valorar:</Text>
            <View style={styles.contentView}>
                <TextInput 
                    value={textDesc}
                    onChangeText={setTextDesc}
                    placeholder="Descripcio"
                    placeholderTextColor="#666"
                />
            </View>
            <View style={styles.puntuarSend}>
                <View style={styles.puntuacio}>
                    <TextInput 
                        value={puntuacio}
                        onChangeText={setPuntuacio}
                        placeholder="Puntuacio"
                        keyboardType="numeric"
                        placeholderTextColor="#666"
                    />
                </View>
                <TouchableOpacity onPress={creaValoracio} style={styles.addBtn}>
                    <Text>ADD</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.separador}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    textValorar: {
        marginLeft: 15,
        marginBottom: 5,
    },
    contentView: {
        width: 330, 
        borderRadius: 10,
        //margin: 10,
        marginHorizontal: 10,
        color: '#000',
        borderColor: '#666',
        backgroundColor: '#FFF',
        borderWidth: 1,
        height: 45,
        fontSize: 18,
        flexDirection: 'row',
        justifyContent: 'space-between', 
    },
    puntuarSend: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    puntuacio: {
        marginLeft: 15,
    },
    addBtn: {
        marginRight: 20,
        backgroundColor: 'gold',
        padding: 3,
        borderRadius: 5,
    },
    separador: {
        backgroundColor: 'grey',
        height: 2,
        marginHorizontal: 15,
        marginTop: 5,
        marginBottom: 15,
    }
});
