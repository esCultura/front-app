import Screen from "../components/Screen";
import { Text, ScrollView, View, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Image, Platform } from 'react-native';
import XCircleFill from 'react-native-bootstrap-icons/icons/x-circle-fill';
import { simpleFetch } from "../utils/utilFunctions";
import * as ImagePicker from 'expo-image-picker';
import ProfileForm  from '../components/ProfileForm';
import BtnPdf  from '../components/BtnPdf'; 
import FollowButton  from '../components/FollowButton'; 
import Esdeveniment  from '../components/Esdeveniment'; 
import Trofeu  from '../components/Trofeu'; 
import {setToken} from '../utils/utilFunctions';
import TranslateSelector from "./TranslateSelector";
import { useTranslation } from 'react-i18next';
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function PerfilSimple(props, updated) {

    const {t} = useTranslation();


    const handleInfoCompletaClose = () => {
        setScreenLoaded(!screenLoaded);
      };
    const [jo, setJo] = useState(null);
    const [llistaVisible, setLlistaVisible] = useState(false);
    const [esdeveniments, setEsdeveniments] = useState([]);
    const [estadistiques, setEstadistiques] = useState([]);
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

    const cerrarFormulario = () => {
        console.log("entraaaaaaaa");
        setFormVisible(false);
        setScreenLoaded(!screenLoaded);
      };

    useEffect(() => {
        async function _retrieveData() {
            try {
              const value = await AsyncStorage.getItem("token");
              if (value !== null) {
                let result = JSON.parse(value);
                console.log("result", result);
                setJo(result.user);
              }
            } catch (error) {
              console.log("error en agafar dades locals, token error: ", error);
            }
          }
          _retrieveData();

        const fetchPreferits = async () => {
            console.log("jo1", props.id);
            let endPoint = `interessos/esdeveniments/?perfil=${props.id}`;
            const data = await simpleFetch(endPoint, "GET", "");
            const reserves = [];
            for (let i = 0; i < data.length; i++) {
              const assistencies = data[i].esdeveniment;
              endPoint = 'esdeveniments?codi='+assistencies;
              const esd = await simpleFetch(endPoint, "GET", "");
              reserves.push(esd);
            }
            setEsdeveniments(reserves); 

        }

        const fetchPerfil = async () => {

          let endPoint = `usuaris/perfils/${props.id}`;
          const data = await simpleFetch(endPoint, "GET", "")
          console.log("datos11", data);
          setInfoPerfil(data);
          console.log("info5", infoPerfil);
          const e = [];

          console.log("datos", data.estadistiques.assistencies_passades);
            e.push(data.estadistiques.assistencies_passades);
            e.push(data.estadistiques.interessos_esdeveniments);
            e.push(data.estadistiques.interessos_tematiques);
            e.push(data.estadistiques.interessos_valoracions)
            e.push(data.estadistiques.missatges_enviats);
            e.push(data.estadistiques.reserves_futures);
            e.push(data.estadistiques.seguidors);
            e.push(data.estadistiques.seguits);
            e.push(data.estadistiques.xats_participant);
            e.push(data.estadistiques.valoracions)
          console.log("info3", e);
          setEstadistiques(e);
   
          //setImageUri(data.imatge);
      }

      const fetchSeguits = async () => {
        let endPoint = `seguiments/?seguidor=${props.id}`;
        const data = await simpleFetch(endPoint, "GET", "")
        console.log("datos2", data);
        const seg = []; 
        for (let j = 0; j < data.length; j++) seg.push(data[j].seguit);
        setSeguits(seg);
        console.log("info2", seguits); 
      }
    
      const fetchSeguidors = async () => {
        let endPoint = `seguiments/?seguit=${props.id}`;
        const data = await simpleFetch(endPoint, "GET", "")
        const seg = []; 
        for (let j = 0; j < data.length; j++) seg.push(data[j].seguidor);
        setSeguidors(seg);
      }

      fetchPreferits();
      fetchSeguits();
      fetchSeguidors();
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
        let endPoint = 'usuaris/perfils/jo/';

          const formData = new FormData();
            formData.append('imatge', {
                uri: newImage,
                type: 'image/jpeg', // o el tipo de imagen que sea
                name: 'image.jpg', 
            });


        const response = await simpleFetch(endPoint, "PUT", { imatge:formData});
    }

    const doLogout = () =>  {
        setToken("");
        props.onLogin(false);
    }


    function handleFollowChange () {
        setScreenLoaded(!screenLoaded);
      };

      
    if (jo != props.id && jo != null) {
    return (
        <>
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
            </View>

            <View style={styles.rightContainer} >
                <TouchableOpacity onPress={() => {setSeguitsVisible(true) }}>
                <View style={styles.follow} > 
                   <Text style={styles.num}>  {seguits.length}  </Text>
                   <Text style={styles.text}> {t('following')} </Text>
                   </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {setSeguidorsVisible(true) }}>
                <View style={styles.follow} > 
                   <Text style={styles.num}>  {seguidors.length}  </Text>
                   <Text style={styles.text}> {t('followers')} </Text>
                   </View>
                </TouchableOpacity>
            </View>
            </View>
            
            <View style={styles.followButton}>
            <FollowButton jo= {jo} seguit={props.id} onFollowChange={handleFollowChange}> </FollowButton>
            </View>
            
            <View style={styles.infoContainer}>
                <View style={styles.row}>
                    <Text style={styles.label}>{t('Username')}</Text>
                    <Text style={styles.value}>{infoPerfil.username}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.value}>{infoPerfil.email}</Text>
                </View>
                <View style={[styles.row]}>
                    <Text style={styles.label}>Bio</Text>
                    <Text style={styles.value}>{infoPerfil.bio}</Text>
                </View>
            </View> 

            <Text style={styles.usernameText}> {t('trophys')} </Text>
            <ScrollView  contentContainerStyle={styles.llistat}>
                <Trofeu 
                    assistencies_passades={estadistiques[0]}
                    interessos_esdeveniments={estadistiques[1]}
                    interessos_tematiques={estadistiques[2]}
                    interessos_valoracions={estadistiques[3]}
                    missatges_enviats={estadistiques[4]}
                    reserves_enviats={estadistiques[5]}
                    seguidors={estadistiques[6]}
                    seguits={estadistiques[7]}
                    xats_participants={estadistiques[8]}
                    valoracions={estadistiques[9]}
                />
            </ScrollView>


            <Modal visible={seguitsVisible } animationType="slide">
        
                <TouchableOpacity onPress={() => {setSeguitsVisible(false); setScreenLoaded(!screenLoaded)}} style={styles.back}>
                    <XCircleFill color="red" width={145} height={145} />
                </TouchableOpacity>
                <ScrollView  contentContainerStyle={styles.llistat}>
                {
                seguits.map(s => 
                    <TouchableOpacity key={s} style={styles.listItem} onPress={() => { setPerfilVisible(true); setPerfil(s)}}>
                    <Text> {t('user')} {s}  </Text>
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
                    <TouchableOpacity key={s} style={styles.listItem} onPress={() => { setPerfilVisible(true); setPerfil(s)}}>
                    <Text> {t('user')} {s}  </Text>
                    </TouchableOpacity>
                )}
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
        </>

    );
   }
   else {
    return (
        <>
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
                { <Text> {t('editphoto')} </Text> }
            </TouchableOpacity>
            </View>

            <View style={styles.rightContainer} >
                <TouchableOpacity onPress={() => {setSeguitsVisible(true) }}>
                <View style={styles.follow} > 
                   <Text style={styles.num}>  {seguits.length}  </Text>
                   <Text style={styles.text}> {t('following')} </Text>
                   </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {setSeguidorsVisible(true) }}>
                <View style={styles.follow} > 
                   <Text style={styles.num}>  {seguidors.length}  </Text>
                   <Text style={styles.text}> {t('followers')} </Text>
                   </View>
                </TouchableOpacity>
            </View>
            </View>
            
            <View style={styles.infoContainer}>
                <View style={styles.row}>
                    <Text style={styles.label}>{t('Username')}</Text>
                    <Text style={styles.value}>{infoPerfil.username}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.value}>{infoPerfil.email}</Text>
                </View>
                <View style={[styles.row]}>
                    <Text style={styles.label}>Bio</Text>
                    <Text style={styles.value}>{infoPerfil.bio}</Text>
                
                <TouchableOpacity style={styles.editButton} onPress={() => { setFormVisible(true)}}>
                    <Icon name="edit" size={31} color="black" />
                </TouchableOpacity> 
                </View>

             </View>

                
            
            
             <View style={styles.row}>   
            <TouchableOpacity style={styles.PreferitsButton} onPress={() => {setLlistaVisible(true); }}>
                <Text > {t('LlistaPreferits')} </Text>
            </TouchableOpacity>

                <BtnPdf ></BtnPdf> 
            </View>

            <Text style={styles.usernameText}> {t('trophys')} </Text>
            <ScrollView  contentContainerStyle={styles.llistat}>
                {estadistiques[0]!== undefined && (
                <Trofeu 
                assistencies_passades={estadistiques[0]}
                interessos_esdeveniments={estadistiques[1]}
                interessos_tematiques={estadistiques[2]}
                interessos_valoracions={estadistiques[3]}
                missatges_enviats={estadistiques[4]}
                reserves_enviats={estadistiques[5]}
                seguidors={estadistiques[6]}
                seguits={estadistiques[7]}
                xats_participants={estadistiques[8]}
                valoracions={estadistiques[9]}
                            />
                                
                )}
            </ScrollView>

            <View style={styles.bottomContainer}>
            
            <TranslateSelector> </TranslateSelector>

            <TouchableOpacity style={styles.logoutButton} onPress={() => {doLogout()}}>
            <Icon name="sign-out" size={31} color="black" />
            </TouchableOpacity>
                
            </View>

            <Modal visible={seguitsVisible } animationType="slide">
        
                <TouchableOpacity onPress={() => {setSeguitsVisible(false); setScreenLoaded(!screenLoaded)}} style={styles.back}>
                    <XCircleFill color="red" width={145} height={145} />
                </TouchableOpacity>
                <ScrollView  contentContainerStyle={styles.llistat}>
                {
                seguits.map(s => 
                    <TouchableOpacity key={s} style={styles.listItem} onPress={() => { setPerfilVisible(true); setPerfil(s)}}>
                    <Text style={styles.usuari}>  {t('user')} {s}  </Text>
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
                    <TouchableOpacity key={s} style={styles.listItem} onPress={() => { setPerfilVisible(true); setPerfil(s)}}>
                    <Text style={styles.usuari}>  {t('user')} {s}  </Text>
                    </TouchableOpacity>
                )}
                </ScrollView>

            </Modal>

            <Modal visible={formVisible} animationType="slide">
            <TouchableOpacity onPress={() => {setFormVisible(false); setScreenLoaded(!screenLoaded)}} style={styles.back}>
                    <XCircleFill color="red" width={145} height={145} />
                </TouchableOpacity>
                <ProfileForm infoPerfil={infoPerfil} onClose={cerrarFormulario} />
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
        </>

    );
   }
 
}

const styles = StyleSheet.create({
    infoContainer: {
        padding: 10,
        borderRadius: 10,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
      },
      lastRow: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingBottom: 10,
      },
      label: {
        fontSize: 18,
        fontWeight: 'bold',
        width: 80,
        marginRight: 10,
        color: '#333',
      },
      usernameText: {
        fontSize: 18,
        fontWeight: 'bold',
        width: 100,
        marginRight: 10,
        color: '#333',
        paddingTop: 10, 
      },
      value: {
        flex: 1,
        fontSize: 16,
        color: '#666',
      },
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
        width: 110,
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 5,
    },
    PreferitsButton: {
        backgroundColor: '#FF8E88',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        width: 170,
        marginLeft: 20, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    editButton: {
        marginTop: 10,
    alignSelf: 'flex-end',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
       
    },
    followButton: {
        justifyContent: 'flex-end', 
        alignItems: 'flex-end',
        paddingRight: 50,
    },
    logoutButton: {
        marginLeft: 50, 
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
    listItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
      },
      usuari: {
        fontSize: 16,
      },
      follow: {
        paddingHorizontal: 15,
        //paddingRight: 10,
        alignItems: 'center',
      },
      num: {
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
        textAlignVertical: 'center', 
      },
      text: {
        fontSize: 16,
        textAlign: 'center',
        textAlignVertical: 'center',
      },
    imatgePerfil: {
        width: 110,
        height: 110,
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
        //alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        //spaddingHorizontal: 20,
        paddingRight: 70, 
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
        marginBottom: 50,
        flexDirection: 'row',
      },
});