import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { simpleFetch } from "../utils/utilFunctions";

const LikeButton =  ( props ) => {
    const [liked, setLiked] = useState(0);
    const [likes, setLikes] = useState(0);
    const likeValue = liked ? -1 : 1;
    const user = 6
    const esdeveniment = props.codi;
    
   useEffect(() => {
    const fetchLikes = async () => {
        let endPoint = `interessos/esdeveniments/?esdeveniment=${esdeveniment}`;
        const data = await simpleFetch(endPoint, "GET", "")
        setLikes(data.length);
        
        let endPoint2 = `interessos/esdeveniments/?user=${user}&esdeveniment=${esdeveniment}`;
        const data2 = await simpleFetch(endPoint2, "GET", "")
        if (data2.length === 0)  setLiked(false);
        else    setLiked(true);
  };
  fetchLikes();
  }, []);

  const handleLike = async () => {
    let endPoint = 'interessos/esdeveniments/';
        const data = await simpleFetch(endPoint, "POST", {perfil: user, esdeveniment:esdeveniment})
        setLikes((prevLikes) => prevLikes + likeValue);
        setLiked(true);
  };
  
  const handleUnlike = async () => {
    let endPoint = `interessos/esdeveniments/?perfil=${user}&esdeveniment=${esdeveniment}`;
        const data = await simpleFetch(endPoint, "DELETE", "")
        setLikes((prevLikes) => prevLikes + likeValue);
        setLiked(false);

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
