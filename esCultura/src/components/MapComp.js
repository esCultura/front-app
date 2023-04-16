import React, {useState, useEffect} from 'react';
import { StyleSheet, View, TextInput} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import MarkersMap from './MarkersComp';
import SearchFilter from './SearchFilter';

export default function MapComp() {

  const [dataEvent, setDataEvent] = useState('');
  const [latitudeDivice, setLatitude] = useState(41.389324);
  const [longitudeDivice, setLongitude] = useState(2.113703);
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
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
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
        <View style={styles.search}>
          <SearchFilter onVariableChange={onVarChange} isList={false} ></SearchFilter>
        </View>
        <MapView style={styles.map}
          region={region}
        >
          <MarkersMap queryFilter={dataEvent}
            longitude = {longitudeDivice}
            latitude = {latitudeDivice}
          ></MarkersMap>
          <Marker
            coordinate={{ 
              latitude: latitudeDivice ? latitudeDivice : 0, 
              longitude: longitudeDivice ? longitudeDivice : 0
            }}
            image={require('../../assets/blue-mark.png')}
          />
          
        </MapView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    map: {
      width: '100%',
      height: '100%',
    },
    search: {
      zIndex: 1,
      position: 'absolute',
      top: 0,
      left: 0
    } 
  });