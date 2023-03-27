import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LikeButton = ({ itemId} ) => {
    const [liked, setLiked] = useState(false);
  
    // aixo serveix per canviar el disseny. 
    const handlePress = async () => {      
      if (liked) {
          /* fetch('https://tu-api-backend.com/tu-endpoint', {
          method: 'PUT', // método PUT
          headers: {
            'Content-Type': 'application/json', // tipo de contenido que estás enviando
          },
          body: JSON.stringify({ 
            // datos que deseas actualizar en formato JSON
            key1: value1,
            key2: value2,
            // ...
          }),
        })
        //.then((response) => response.json())
        .catch((error) => {
          console.error(error);
        }); */

      }  
      else {
      }
      //setLiked(response.data.liked);
      setLiked(!liked);
    };
    return (
      <TouchableOpacity onPress={handlePress}>
        <Icon name={liked ? 'heart' : 'heart-o'} size={24} color={liked ? 'red' : 'black'} />
      </TouchableOpacity>
    );
  };

export default LikeButton;