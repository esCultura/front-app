import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { simpleFetch } from "../utils/utilFunctions";

const FollowButton =  ( props ) => {
    const [follow, setFollow] = useState(0);
    const followValue = follow ? -1 : 1;
    const user = 3
    const esdeveniment = props.codi;
    
   useEffect(() => {
    const fetchFollows = async () => {
        let endPoint = `interessos/esdeveniments/?esdeveniment=${esdeveniment}`;
        const data = await simpleFetch(endPoint, "GET", "")
        
        let endPoint2 = `interessos/esdeveniments/?user=${user}&esdeveniment=${esdeveniment}`;
        const data2 = await simpleFetch(endPoint2, "GET", "")
        if (data2.length === 0)  setFollow(false);
        else    setFollow(true);
  };
  fetchFollows();
  }, []);

  const handleFollow = async () => {
    let endPoint = 'interessos/esdeveniments/';
        const data = await simpleFetch(endPoint, "POST", {perfil: user, esdeveniment:esdeveniment})
        setFollow(true);
  };
  
  const handleUnfollow = async () => {
    let endPoint = `interessos/esdeveniments/?perfil=${user}&esdeveniment=${esdeveniment}`;
        const data = await simpleFetch(endPoint, "DELETE", "")
        setFollow(false);

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

  export default FollowButton;
