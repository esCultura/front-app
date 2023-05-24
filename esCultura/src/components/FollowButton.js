import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { simpleFetch } from "../utils/utilFunctions";

const FollowButton =  ( props ) => {
    const [follow, setFollow] = useState(null);
    const followValue = follow ? -1 : 1;
    const user = props.jo;
    const pers = props.seguit;
    console.log("qui soc jo", user);
    console.log("perfil extern", pers);
    
   useEffect(() => {
    const fetchFollows = async () => {
    console.log("a qui segueixo", user);
        let endPoint = `seguiments/?seguidor=${user}&seguit=${pers}`;
        const data = await simpleFetch(endPoint, "GET", "")
        if (data.length === 0)  setFollow(false);
        else    setFollow(true);
  };
  fetchFollows();
  }, []);

  const handleFollow = async () => {
    let endPoint = 'seguiments/';
        const data = await simpleFetch(endPoint, "POST", {seguidor: user, seguit:pers})
        setFollow(true);
        props.onFollowChange();
  };
  
  const handleUnfollow = async () => {
    let endPoint = `seguiments/?seguidor=${user}&seguit=${pers}`;
        const data = await simpleFetch(endPoint, "DELETE", "")
        setFollow(false);
        props.onFollowChange();

  };
  
 /* const handlePress = () => {
    if (follow) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };*/
  
  if(follow){
    return(<View style={styles.container}>
        <TouchableOpacity style = {styles.button} onPress={handleUnfollow} >
            <View>
                <Text style = {styles.buttonText} > Deixar de Seguir </Text>
            </View>
        </TouchableOpacity>
    </View>)
}
else{
    
return(
    
    <View style={styles.container}>
    <TouchableOpacity style = {styles.button} onPress={handleFollow} >
        <View>
            <Text style = {styles.buttonText} > Seguir </Text>
        </View>
    </TouchableOpacity>
</View> 
  )}
  };

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#fff',
      alignItems: "center",
    justifyContent: "center",
    maxHeight: 200,
    },
    button: {
       backgroundColor: 'green',
      padding:10,
      borderRadius: 5,
      shadowOffset: { width: 2 , height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      width: 110,
      justifyContent: 'center', 
      alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
      },
      disabledButton: {
        opacity: 0.5,
      },
    });

  export default FollowButton;
