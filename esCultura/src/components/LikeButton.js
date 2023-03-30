import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LikeButton =  ( ) => {
    const [liked, setLiked] = useState(0);
    const [likes, setLikes] = useState(0);
    const likeValue = liked ? -1 : 1;
    const [id, setId] = useState(0); 
    
   useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch( 'http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/interessos/esdeveniments?esdeveniment=20230315095' );
        if (!response.ok) {
          throw new Error('Error al obtener el número de likes');
        }    
        const data = await response.json();
        setLikes(data.length);
        if (data.length ==  0) setId(0);
    } catch (error) {
      console.error(error);
    }
  };
  fetchLikes();
  }, []);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch( 'http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/interessos/esdeveniments?perfil=primerUsuari&esdeveniment=20230315095' );
        if (!response.ok) {
          throw new Error('Error al obtener el like');
        }    
        const data = await response.json();
        if (data.length === 0)  {
          setLiked(false);
          setId(0);
        }
        else  {
          setLiked(true);
          setId(data[0].id);
        }
    } catch (error) {
      console.error(error);
    }
  };
  fetchLikes();
  }, []);

  const handlePress = async () => {     
    if (liked) {
        try {
          const response = await fetch( `http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/interessos/esdeveniments/?${id}`, {
          method: 'DELETE', 
          /*headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({ 
            id: id,
            //perfil: "primerUsuari",
            //esdeveniment: "20230315095",
          }),*/
        });
        if (!response.ok) {
          throw new Error('Error al enviar solicitud1');
        } 
      setLikes((prevLikes) => prevLikes + likeValue);
      setLiked(!liked);
      } catch (error) {
        console.error(error);
      }
    }
      else {
        try {
          const response = await fetch( 'http://deploy-env.eba-6a6b2amf.us-west-2.elasticbeanstalk.com/interessos/esdeveniments', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({ 
            perfil: "primerUsuari",
            esdeveniment: "20230315095",
          }),
        });
        if (!response.ok) {
          throw new Error('Error al enviar solicitud');
        } 
      setLikes((prevLikes) => prevLikes + likeValue);
      setLiked(!liked);
      } catch (error) {
        console.error(error);
      }}

  }
    
    return (
      <TouchableOpacity onPress={handlePress}>
        <Icon name={liked ? 'heart' : 'heart-o'} size={24} color={liked ? 'red' : 'black'} />
        <Text> {likes} Likes </Text>
        <Text> {id} id </Text>
      </TouchableOpacity>

    );
  };

  export default LikeButton;