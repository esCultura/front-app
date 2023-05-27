import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { simpleFetch } from "../utils/utilFunctions";

const FollowButton = (props) => {
  const [follow, setFollow] = useState(0);
  const followValue = follow ? -1 : 1;
  const user = props.jo;
  const pers = props.seguit;
  console.log("props", props.jo);

  useEffect(() => {
    const fetchFollows = async () => {
      let endPoint = `seguiments/?seguidor=${user}&seguit=${pers}`;
      const data = await simpleFetch(endPoint, "GET", "");
      if (data.length === 0) setFollow(false);
      else setFollow(true);
    };
    fetchFollows();
  }, []);

  const handleFollow = async () => {
    let endPoint = 'seguiments/';
    const data = await simpleFetch(endPoint, "POST", { seguidor: user, seguit: pers });
    setFollow(true);
    props.onFollowChange();
  };

  const handleUnfollow = async () => {
    let endPoint = `seguiments/?seguidor=${user}&seguit=${pers}`;
    const data = await simpleFetch(endPoint, "DELETE", "");
    setFollow(false);
    props.onFollowChange();
  };

  return (
    <View style={styles.container}>
      {follow ? (
        <TouchableOpacity style={[styles.button, styles.unfollowButton]} onPress={handleUnfollow}>
          <Text style={styles.buttonText}>Deixar de Seguir</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[styles.button, styles.followButton]} onPress={handleFollow}>
          <Text style={styles.buttonText}>Seguir</Text>
        </TouchableOpacity>
      )}
    </View>
  );
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
    padding: 10,
    borderRadius: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  followButton: {
    backgroundColor: 'green',
  },
  unfollowButton: {
    backgroundColor: 'red',
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
