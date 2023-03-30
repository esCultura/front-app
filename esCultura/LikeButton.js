import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LikeButton =  ( ) => {
    const [liked, setLiked] = useState(0);
    const [likes, setLikes] = useState(0);
    const likeValue = liked ? -1 : 1;
    const perfil = "primerUsuari";
    const esdeveniment = 20230315095;
    
   useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch( `http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/interessos/esdeveniments/?esdeveniment=${esdeveniment}` );
        if (!response.ok) {
          throw new Error('Error al obtener el número de likes');
        }    
        const data = await response.json();
        setLikes(data.length);
        if (data.length ==  0) setId(0);

        const response2 = await fetch( `http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/interessos/esdeveniments/?perfil=${perfil}&esdeveniment=${esdeveniment}` );
        if (!response2.ok) {
          throw new Error('Error al obtener el like');
        }    
        const data2 = await response2.json();
        if (data2.length === 0)  setLiked(false);
        else    setLiked(true);

    } catch (error) {
      console.error(error);
    }
  };
  fetchLikes();
  }, []);

  const handleLike = async () => {
    try {
      const response = await fetch('http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/interessos/esdeveniments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          perfil: perfil,
          esdeveniment: esdeveniment,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error al enviar solicitud');
      }
  
      setLikes((prevLikes) => prevLikes + likeValue);
      setLiked(true);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleUnlike = async () => {
    try {
      const response = await fetch(`http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/interessos/esdeveniments/?perfil=${perfil}&esdeveniment=${esdeveniment}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Error al enviar solicitud1');
      }
  
      setLikes((prevLikes) => prevLikes + likeValue);
      setLiked(false);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handlePress = () => {
    if (liked) {
      handleUnlike();
    } else {
      handleLike();
    }
  };
  
    
    return (
      <TouchableOpacity onPress={handlePress}>
        <Icon name={liked ? 'heart' : 'heart-o'} size={24} color={liked ? 'red' : 'black'} />
        <Text> {likes} Likes </Text>
      </TouchableOpacity>

    );
  };

  export default LikeButton;