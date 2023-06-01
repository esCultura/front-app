import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity, ScrollView, Linking } from "react-native";
import LikeButton from "./LikeButton";
import Reservar from "./ReservarButton";
import { RFPercentage } from "react-native-responsive-fontsize";
import Categoria from "./Categoria";
import Valoracio from "./ValoracioComp";
import AddValoracio from "./AddValoracio";
import {simpleFetch} from '../utils/utilFunctions';
import XCircleFill from 'react-native-bootstrap-icons/icons/x-circle-fill';
const bgcolor = '#3BDE4B';
  
export default function InfoCompleta (props) {
    const [valoracions, setValoracions]= useState([]);
    const [update, setUpdate] = useState([]);
    
    const fetchvaloracions = async() => {
        console.log("codi_esdev", props.codi);
        let endpoint = 'valoracions/?esdeveniment__codi='+props.codi;
        simpleFetch(endpoint,"GET","").then((data) =>setValoracions(data));
    }
    

    const mesinfo = async () => {
        await Linking.openURL(props.source);
    }
    function recarrega() {
        setUpdate((prevState) => !prevState);
      }
    
    useEffect(()=> {
        fetchvaloracions();
    },[update])

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={{height: '100%'}}>
                <TouchableOpacity onPress={props.back} style={styles.back}>
                    <XCircleFill color="white" width={175} height={175} />
                </TouchableOpacity>
                <View>
                    <Image source={{uri: props.source}} style={styles.image}/>
                    <Text style={styles.like}><LikeButton id={props.perfil} codi={props.codi} ></LikeButton></Text>
                </View>
                <ScrollView>
                    <View style={styles.card_info}>
                        <View style={styles.mainInfo}>
                            <ScrollView contentContainerStyle={styles.typesContainer}>
                                {
                                    props.type.map((type, i) => {
                                        return (<Categoria key={i} id={props.perfil} tipus={type}> </Categoria>);
                                    })
                                }
                            </ScrollView>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={styles.info}>🗓️ {props.dateIni} {props.dateIni !== 'Online' && props.dateIni !== props.dateFi &&  <Text> fins {props.dateFi} </Text>} 📌 {props.location}</Text>
                        </View>
                        <View style={{maxHeight: 390}}>
                            <ScrollView>
                                <Text style={styles.complet}>{props.complet}</Text>
                            </ScrollView>
                        </View>
                        <View style={styles.botInfo}>
                            {props.preu && <Text style={styles.preu}>Preu: {props.preu}</Text>}
                            <View style={{flexDirection: 'row', gap: 10}}>
                                <View >
                                <Text ><Reservar id={props.perfil} codi={props.codi} dataIni={props.dateIni} dataFi={props.dateFi}></Reservar></Text>
                                </View>
                                <View style={{width: '50%'}}>
                                <TouchableOpacity style={styles.button} onPress={mesinfo}>
                                    <Text style={{color: 'white', fontSize: 18, textAlign: 'center',}}>Més Informació</Text>
                                </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                    <AddValoracio esdeveniment={props.codi} canvia={recarrega}></AddValoracio>        
                        
                    <View>
                    {
                        valoracions.map((valoracio, v) => {
                            console.log(valoracio)
                            return(
                                <Valoracio 
                                    key ={v}
                                    id={valoracio.id}
                                    id_usuari={props.perfil}
                                    esdeveniment={valoracio.esdeveniment}
                                    usuari ={valoracio.creador} 
                                    text={valoracio.text} 
                                    punt = {valoracio.puntuacio}
                                    imatge ={valoracio.imatge}
                                    data = {valoracio.data}
                                    canvia={recarrega}
                                />
                            )
                        })
                    }
                    </View>
                </ScrollView>
            </View>
  
    </Modal>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 5 / 2.5,
    backgroundColor: "#D0D0D0",
  },
  card_info: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: "auto",
    backgroundColor: "bgcolor",
    borderColor: "#2FDD60",
    borderTopWidth: 2,
  },
  mainInfo: {},
  typesContainer: {
    marginBottom: 8,
    display: "flex",
    flexDirection: "row",
    gap: 7,
  },
  type: {
    paddingVertical: 2,
    paddingHorizontal: 11,
    borderRadius: 12,
    backgroundColor: bgcolor,
    color: "white",
  },
  like: {
    position: "absolute",
    right: 0,
    bottom: 0,
    alignSelf: "flex-start",
    padding: 10,
  },
  title: {
    fontSize: RFPercentage(2.7),
    fontWeight: "700",
    fontStyle: "normal",
    lineHeight: 24,
    color: "#000000",
  },
  info: {
    paddingVertical: 8,
    fontSize: 14,
    fontWeight: "400",
    fontStyle: "normal",
    color: "#000000",
  },
  botInfo: {
    paddingTop: 10,
    marginTop: "auto",
  },
  preu: {
    paddingTop: 8,
    fontSize: 14,
    fontWeight: "400",
    fontStyle: "normal",
    color: "#000000",
  },
  complet: {
    fontSize: 15,
    fontWeight: "400",
    fontStyle: "normal",
    color: "#000000",
    textAlign: "justify",
  },
  button: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  back: {
    zIndex: 1,
    position: "absolute",
    top: 6,
    left: 6,
    width: 16,
    height: 16,
  },
});
