import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import { simpleFetch } from '../utils/utilFunctions';
import StarFill from 'react-native-bootstrap-icons/icons/star-fill';

export default function AddValoracio(props) {
    
    const [textDesc, setTextDesc] = useState('');
    const [puntuacio, setPuntuacio] = useState(0);
    const [userId, setUserId] = useState();

    const [color0, setColor0] = useState('grey');
    const [color1, setColor1] = useState('grey');
    const [color2, setColor2] = useState('grey');
    const [color3, setColor3] = useState('grey');
    const [color4, setColor4] = useState('grey');
    const [color5, setColor5] = useState('grey');


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
        props.canvia()
    }

    function setP0() {
        setPuntuacio(0);
        setColor0('gold');
        setColor1('grey');
        setColor2('grey');
        setColor3('grey');
        setColor4('grey');
        setColor5('grey');
    }
    function setP1() {
        setPuntuacio(1);
        setColor0('gold');
        setColor1('gold');
        setColor2('grey');
        setColor3('grey');
        setColor4('grey');
        setColor5('grey');
    }
    function setP2() {
        setPuntuacio(2);
        setColor0('gold');
        setColor1('gold');
        setColor2('gold');
        setColor3('grey');
        setColor4('grey');
        setColor5('grey');
    }
    function setP3() {
        setPuntuacio(3);
        setColor0('gold');
        setColor1('gold');
        setColor2('gold');
        setColor3('gold');
        setColor4('grey');
        setColor5('grey');
    }
    function setP4() {
        setPuntuacio(4);
        setColor0('gold');
        setColor1('gold');
        setColor2('gold');
        setColor3('gold');
        setColor4('gold');
        setColor5('grey');
    }
    function setP5() {
        setPuntuacio(5);
        setColor0('gold');
        setColor1('gold');
        setColor2('gold');
        setColor3('gold');
        setColor4('gold');
        setColor5('gold');
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
                    <TouchableOpacity onPress={setP0} style={styles.addPunt}>
                        <StarFill name="star" color={color0} size={20}></StarFill>
                        <Text style={styles.puntText}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={setP1} style={styles.addPunt}>
                        <StarFill name="star" color={color1} size={20}></StarFill>
                        <Text style={styles.puntText}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={setP2} style={styles.addPunt}>
                        <StarFill name="star" color={color2} size={20}></StarFill>
                        <Text style={styles.puntText}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={setP3} style={styles.addPunt}>
                        <StarFill name="star" color={color3} size={20}></StarFill>
                        <Text style={styles.puntText}>3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={setP4} style={styles.addPunt}>
                        <StarFill name="star" color={color4} size={20}></StarFill>
                        <Text style={styles.puntText}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={setP5} style={styles.addPunt}>
                        <StarFill name="star" color={color5} size={20}></StarFill>
                        <Text style={styles.puntText}>5</Text>
                    </TouchableOpacity>
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
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 15,
    },
    puntText: {
        marginLeft: 4,
    },
    addPunt: {
        marginRight: 25,
        padding: 3,
        borderRadius: 5,
    },
    addBtn: {
        marginRight: 20,
        backgroundColor: '#2eca5a',
        padding: 3,
        borderRadius: 5,
        justifyContent: 'center',
    },
    separador: {
        backgroundColor: 'grey',
        height: 2,
        marginHorizontal: 15,
        marginTop: 5,
        marginBottom: 15,
    }
});
