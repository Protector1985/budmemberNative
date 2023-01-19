import React from 'react';
import * as Location from 'expo-location';
import { setLocation } from '../../../store/locationSlice';


export default async function getLocation(dispatch, locationPermission) {
  try {
   
    if (!locationPermission) {
      console.log("Location permission not granted")
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    dispatch(setLocation({longitude: location.coords.longitude, latitude: location.coords.latitude}))

  } catch(err) {
    console.log(err)
  }
     

}