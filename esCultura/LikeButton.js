import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LikeButton =  ( ) => {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const likeValue = liked ? -1 : 1;
    
   useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch( 'http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/interessos/esdeveniments?id==20230315095' );
        //.then ( response => response.json() );
        if (!response.ok) {
          throw new Error('Error al obtener el número de likes');
        }    
        
        const data = await response.json();
        if (!data.likes) data.likes = 0;
        setLikes(data.likes);
        
    } catch (error) {
      console.error(error);
    }
  };
  fetchLikes();
  }, []);

  const handlePress = async () => {     
          try {
          const response = await fetch( 'http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/interessos/esdeveniments?id==20230315095', {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({ 
            likeValue: likeValue,
          }),
        });
        if (!response.ok) {
          throw new Error('Error al enviar solicitud');
        
        }  
      setLikes((prevLikes) => prevLikes + likeValue);
      setLiked(!liked);
      } catch (error) {
        console.error(error);
      }
  }
    
    return (
      <TouchableOpacity onPress={handlePress}>
        <Icon name={liked ? 'heart' : 'heart-o'} size={24} color={liked ? 'red' : 'black'} />
        <Text> {likes} Likes </Text>
      </TouchableOpacity>

    );
  };


  export default LikeButton;