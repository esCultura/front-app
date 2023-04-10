import React, {useState, useEffect} from 'react';
import { StyleSheet, View, TextInput} from 'react-native';
import MapView from 'react-native-maps';
//import Geolocation from 'react-native-geolocation-service';
import * as Location from 'expo-location';
import MarkersMap from './MarkersComp';
import SearchFilter from './SearchFilter';

export default function MapComp() {

  const [dataEvent, setDataEvent] = useState('');
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: 41.389324,
    longitude: 2.113703,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }); 
    })();
  }, []);

  const onVarChange = (newVariable) => {
    setDataEvent(newVariable);
  };

    return (
      <View>
        <MapView style={styles.map}
          region={region}
        >
          <MarkersMap queryFilter={dataEvent}></MarkersMap>
        </MapView>
        <SearchFilter onVariableChange={onVarChange} isList={false} ></SearchFilter>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    
    map: {
      width: '100%',
      height: '100%',
    },
  });