import Screen from "../components/Screen";
import { Text, ScrollView, View, Modal, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Image, Platform } from 'react-native';
import Esdeveniment from '../components/Esdeveniment';
import XCircleFill from 'react-native-bootstrap-icons/icons/x-circle-fill';
import { simpleFetch } from "../utils/utilFunctions";
import * as ImagePicker from 'expo-image-picker';
import ProfileForm  from '../components/ProfileForm'; 
import PerfilSimple  from '../components/PerfilSimple'; 

export default function Chat(updated) {
    const handleInfoCompletaClose = () => {
        setScreenLoaded(!screenLoaded);
      };
    const props = 6;
    const [llistaVisible, setLlistaVisible] = useState(false);
    const [esdeveniments, setEsdeveniments] = useState([]);
    const [infoPerfil, setInfoPerfil] = useState([]);
    const [screenLoaded, setScreenLoaded] = useState(updated);
    const [formVisible, setFormVisible] = useState(false);
    const [imageUri, setImageUri] = useState(null);
    const [trofeus, setTrofeus] = useState([]);
    const [seguits, setSeguits] = useState([]);
    const [seguidors, setSeguidors] = useState([]);
    const [seguitsVisible, setSeguitsVisible] = useState(false);
    const [seguidorsVisible, setSeguidorsVisible] = useState(false);
    const [perfilVisible, setPerfilVisible] = useState(false);
    const [perfil, setPerfil] = useState(null);

    useEffect(() => {

        const fetchPreferits = async () => {
            let endPoint = `interessos/esdeveniments/?perfil=${props}`;
            const data = await simpleFetch(endPoint, "GET", "");
            const reserves = [];
            for (let i = 0; i < data.length; i++) {
              const assistencies = data[i].esdeveniment;
              endPoint = 'esdeveniments?codi='+assistencies;
              const esd = await simpleFetch(endPoint, "GET", "");
              reserves.push(esd);
            }
            console.log("reserves", reserves);
            setEsdeveniments(reserves); 

        }

        const fetchPerfil = async () => {
          let endPoint = `usuaris/perfils/${props}`;
          const data = await simpleFetch(endPoint, "GET", "")
          console.log("datos1", data);
          setInfoPerfil(data);
          //setSeguits(data.estadistiques.seguits); == seguits.length
          //setSeguidors(data.estadistiques.seguidors);
          console.log("info1", infoPerfil.email);
          console.log("info1", seguidors);

          
          //setImageUri(data.imatge);r

         /* if (response.estadistiques > 5) setTrofeus(bronce);
            if (response.length > 10) setTrofeus(plata);
            if (response.length > 15) setTrofeus(or);*/
      }

      const fetchSeguits = async () => {
        let endPoint = `seguiments?seguidor=${props}`;
        const data = await simpleFetch(endPoint, "GET", "")
        console.log("datos2", data);
        const seg = []; 
        console.log(data[0].seguit);
        for (let j = 0; j < data.length; j++) seg.push(data[j].seguit);
        setSeguits(seg);
        console.log("info2", seguits); 
      }
    
      const fetchSeguidors = async () => {
        let endPoint = `seguiments?seguit=${props}`;
        const data = await simpleFetch(endPoint, "GET", "")
        const seg = []; 
        for (let j = 0; j < data.length; j++) seg.push(data[j].seguidor);
        setSeguidors(seg);
      }

      fetchSeguits();
      fetchSeguidors();
      fetchPreferits();
      fetchPerfil();
  }, [screenLoaded, updated]);


 

  const editFoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      console.log("foto", result.assets[0].uri);
      onImatgeChange(result.assets[0].uri);
    }
  };

  const onImatgeChange = async (newImage) => {
        let endPoint = `usuaris/perfils/${props}`;

          const formData = new FormData();
            formData.append('imatge', {
                uri: newImage,
                type: 'image/jpeg', // o el tipo de imagen que sea
                name: 'image.jpg', 
            });


        const response = await simpleFetch(endPoint, "PUT", { imatge:"formData"});
    }

    return (
        <Screen>
         <View style={styles.container} > 
            <View style={styles.leftContainer}> 
            <Image
                source={
                    imageUri
                    ? { uri: imageUri }
                    : require('../../assets/profile-base-icon.png')
                }
                style={styles.imatgePerfil}
            />
            <TouchableOpacity style={styles.FotoButton} onPress={editFoto}>
                { <Text> ediar foto </Text> }
            </TouchableOpacity>

            </View>

            <View style={styles.rightContainer} >
                <TouchableOpacity onPress={() => {setSeguitsVisible(true) }}>
                    <Text >  {seguits.length} Seguits </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {setSeguidorsVisible(true) }}>
                    <Text >  {seguidors.length} Seguidors </Text>
                </TouchableOpacity>
            </View>
            </View>
            
            <Text> Username: {infoPerfil.username} </Text>
            <Text> Email: {infoPerfil.email} </Text>

            <TouchableOpacity style={styles.PreferitsButton} onPress={() => {setLlistaVisible(true); }}>
                <Text > LlistaPreferits </Text>
            </TouchableOpacity>

            <Text> Escultures </Text>

        
            <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.editButton} onPress={() => { setFormVisible(true)}}>
                <Text > Edit </Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.logoutButton}>
                <Text > Logout </Text>
            </TouchableOpacity>
                
            </View>

            <Modal visible={seguitsVisible } animationType="slide">
        
                <TouchableOpacity onPress={() => {setSeguitsVisible(false); setScreenLoaded(!screenLoaded)}} style={styles.back}>
                    <XCircleFill color="red" width={145} height={145} />
                </TouchableOpacity>
                <ScrollView  contentContainerStyle={styles.llistat}>
                {
                seguits.map(s => 
                    <TouchableOpacity onPress={() => { setPerfilVisible(true); setPerfil(s)}}>
                    <Text> Usuari {s}  </Text>
                    </TouchableOpacity>
                )}
                </ScrollView>

            </Modal>

            <Modal visible={seguidorsVisible } animationType="slide">

                <TouchableOpacity onPress={() => {setSeguidorsVisible(false); setScreenLoaded(!screenLoaded)}} style={styles.back}>
                    <XCircleFill color="red" width={145} height={145} />
                </TouchableOpacity>
                <ScrollView  contentContainerStyle={styles.llistat}>
                {
                seguidors.map(s => 
                    <TouchableOpacity onPress={() => { setPerfilVisible(true); setPerfil(s)}}>
                    <Text> Usuari {s}  </Text>
                    </TouchableOpacity>
                )}
                </ScrollView>

            </Modal>

            <Modal visible={formVisible} animationType="slide">
            <TouchableOpacity onPress={() => {setFormVisible(false); setScreenLoaded(!screenLoaded)}} style={styles.back}>
                    <XCircleFill color="red" width={145} height={145} />
                </TouchableOpacity>
                <ProfileForm infoPerfil={infoPerfil} />
            </Modal>

            <Modal visible={llistaVisible } animationType="slide">
        
                <TouchableOpacity onPress={() => {setLlistaVisible(false); setScreenLoaded(!screenLoaded)}} style={styles.back}>
                    <XCircleFill color="red" width={145} height={145} />
                </TouchableOpacity>
                <ScrollView  contentContainerStyle={styles.llistat}>
                {
                esdeveniments.map(esd => (
                <Esdeveniment 
                    key ={esd[0].codi}
                    back={() => handleInfoCompletaClose()}
                    type={esd[0].tematiques.map(tema => tema.nom)}
                    desc={esd[0].descripcio}
                    title={esd[0].nom}
                    preu={esd[0].entrades}
                    dateFi = {esd[0].dataFi.slice(0,10)}
                    dateIni = {esd[0].dataIni.slice(0,10)}
                    location = {esd[0].espai}
                    codi = {esd[0].codi}
                    source = {"http://agenda.cultura.gencat.cat"+ esd[0].imatges_list[0]}
                            />
                    ))}
                    </ScrollView>
                </Modal>


                <Modal visible={perfilVisible } animationType="slide">
        
                <TouchableOpacity onPress={() => {setPerfilVisible(false); setScreenLoaded(!screenLoaded)}} style={styles.back}>
                    <XCircleFill color="red" width={145} height={145} />
                </TouchableOpacity>
                <PerfilSimple
                    key ={perfil}
                    id={perfil}
                    updated={false}
                 />
                </Modal>

        </Screen>
        

    );

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
      },
    FotoButton: {
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
    PreferitsButton: {
        backgroundColor: '#FF8BE1',
        padding:10,
        borderRadius: 5,
        shadowOffset: { width: 2 , height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        width: 130,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    editButton: {
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
    logoutButton: {
        backgroundColor: '#26B7FF',
        padding:10,
        borderRadius: 5,
        shadowOffset: { width: 2 , height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        width: 130,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    llistat: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },
    back: {
        zIndex: 1,
        position: 'absolute',
        top: 6,
        left: 6,
        width: 16,
        height: 16,
    },
    imatgePerfil: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 20,
    },
    leftContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
      },
      rightContainer: {
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        //spaddingHorizontal: 20,
      },
      statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
      },
      bottomContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
      },
});