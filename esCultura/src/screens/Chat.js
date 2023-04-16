import { Text, StyleSheet, View , TextInput,Image,TouchableOpacity} from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../components/Screen";
import Search from 'react-native-bootstrap-icons/icons/search';
import Plus from 'react-native-bootstrap-icons/icons/plus';
import NewXat from "../components/NewXatButton";
import Xat from "../components/XatComp";

export default function Chat(props) {
    const [data,setData]=useState('')
    const [id,setId]=useState('')
    const [usuaris, setUsuaris] = useState([])
    var users =[]
    
    useEffect(() => {

        const fetchXats = async () => {
            
            try {
              const response = await fetch( `http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/xats/`, {
                      headers: {
                    'Content-Type': 'application/json', 
                      }});
              if (!response.ok) {
                throw new Error('Error al obtener usuaris');
              }    
              
              const data = await response.json();
              setData(data);
              console.log(data)

              /*for (let i = 0; i < data.length; i++) {
                
                for(let j= 0; j<data[i].participants.length; ++j){
                    console.log('j')
                    console.log(j)
                    console.log(data[i].participants[j])
                    if (data[i].participants[j] != 2) {
                        setId(data[i].participants[j]);
                        console.log('id')
                        console.log(id)
                        console.log('http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/usuaris/perfils/'+id)
                       
                            try {
                              const response = await fetch( 'http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/usuaris/perfils/'+id, {
                                      headers: {
                                    'Content-Type': 'application/json', 
                                      }});
                              if (!response.ok) {
                                throw new Error('Error al obtener el likes2');
                              }    
                              
                              const usus = await response.json();
                              console.log(usus)
                              console.log('aaaaaaaaaaaa')
                              //console.log(usus[0].username)
                              users.push(usus[0])
                              console.log('users')
                              console.log(users)
                              setUsuaris(users);
                              console.log(usuaris)
                    
                          } catch (error) {
                            console.error(error);
                          }
                        }

                      
                      
                }
                  
              }
              //console.log(usuaris)
              //if (data.length === 0)  setReservat(false);
              //else setReservat(false);
        */
          } catch (error) {
            console.error(error);
          }
        }
      fetchXats();
      }, []);
    
     
    return (
        <Screen >
            <View style={styles.barra}>
            <View style={styles.search}>
                <TextInput style={styles.input} placeholder={'Cerca...'}/>
                <Search  color={'black'}  style={styles.icono}></Search>
                
            </View>
           <NewXat></NewXat>
           </View>
           
           <View>
            
{
        users.map((usu) => {
            return (
                <View>
                    <Xat username={usu.username}></Xat>
                    <Text>{usu}</Text>
           
            </View>);})
    }
    </View>
           
           
           
           <Xat username="patata"></Xat>
            <Text>CHAT</Text>
        </Screen>
    );
}


const styles = StyleSheet.create({
   
    barra:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    search:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#000',
        height: 45,
        borderRadius: 13,
        margin: 12,
        marginVertical:10,
        width:'75%',
        flex:1
    },
    input:{
        height: 45,
        margin: 12,
        //borderWidth: 1,
        padding: 10,
        borderRadius:13,
        flex:1,
    },
    icono:{
        marginRight:20,
        fontSize:50
        
    },

    info_xat: {
        width: '100%',
        height: 85,
        overflow: 'hidden',
        marginVertical: 10,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor:'#DCDCDC'
    },
    foto: {
        width:60,
        height:60,
        borderRadius:50,
        marginLeft:10,
        marginVertical:12,
        
        //borderColor:'green',
        //borderWidth: 4,
    },
    nom:{
        position: 'absolute',
        right: 230,
        top: 28,
        alignSelf: 'flex-start',
        fontSize: 20,
        fontStyle: "normal",
    }
})