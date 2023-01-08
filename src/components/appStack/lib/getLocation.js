import React from 'react';
import * as Location from 'expo-location';
import { setLocation } from '../../../store/locationSlice';


export default async function getLocation(dispatch) {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      dispatch(setLocation({longitude: location.coords.longitude, latitude: location.coords.latitude}))
    

}