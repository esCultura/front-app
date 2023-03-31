import React, {useState, useEffect} from 'react';
import { StyleSheet, View, TextInput} from 'react-native';
import MapView from 'react-native-maps';
//import Geolocation from 'react-native-geolocation-service';
import MarkersMap from './MarkersComp';
import SearchFilter from './SearchFilter';

export default function MapComp() {

  const [dataEvent, setDataEvent] = useState('');

  const onVarChange = (newVariable) => {
    setDataEvent(newVariable);
  };

    /*
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        console.log('granted', granted);
        if (granted === 'granted') {
          console.log('You can use Geolocation');
          return true;
        } else {
          console.log('You cannot use Geolocation');
          return false;
        }
      } catch (err) {
        return false;
      }
    };
  */

    /*
    const getLocation = async () => {
      const result = await requestLocationPermission();
      console.log('result is:', result);
    
      if (result) {
          Geolocation.getCurrentPosition(
          (position) => {
              console.log("Position value: ", position);
              setLocation(position);
          },
          (error) => {
              // See error code charts below.
              //console.log(error.code, error.message);
              console.log(error);
    
              setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000},
          );
      }
      console.log(location);
    };
    */

    return (
      <View>
        <MapView style={styles.map}
          initialRegion={{
            latitude: 41.389324,
            longitude: 2.113703,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
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