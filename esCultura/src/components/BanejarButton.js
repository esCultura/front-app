import { Text, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { simpleFetch } from "../utils/utilFunctions";
import React, { useEffect, useState } from 'react';

const BanejarButton =  ( props ) => {
  const [jo, setJo] = useState(props.id);
  console.log("jo", props.id);
    const [clicked, setClicked] = useState(false);
    const esdeveniment = props.codi;
    
  /* useEffect(() => {

    const fetchBanejar = async () => {
   
        let endPoint2 = `esdeveniments/${esdeveniment}/report/?reports=${jo}&esdeveniment=${esdeveniment}`;
        const data2 = await simpleFetch(endPoint2, "GET", "")
        console.log("like", data2.length);
        if (data2.length === 0)  setClicked(false);
        else    setClicked(true);
        
  };
  fetchBanejar();
  }, []);*/

 

  const handlePress = async () => {
    let endPoint = `esdeveniments/${esdeveniment}/report/`;
        const data = await simpleFetch(endPoint, "GET", "");
        Alert.alert(
            data.error || data.message,
          );
  };


  
    
    return (
      <TouchableOpacity onPress={handlePress}>
        <Icon name="exclamation-circle" size={24} color="black" />
      </TouchableOpacity>

    );
  };

  export default BanejarButton;
