import { NavigationContainer } from '@react-navigation/native';
import { useContext } from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import AppStack from '../components/appStack/AppStack';
import React from 'react';
import * as Location from 'expo-location';
import AuthStack from '../components/authStack/AuthStack';

import { useDispatch, useSelector } from 'react-redux';
import { setUserToken } from '../store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setHome } from '../store/locationSlice';


export default function AppNav() {

  const [isLoading, setIsLoading] = React.useState(false)
  const { userToken } = useSelector((state)=> state.authSlice)
  const dispatch = useDispatch();

  async function isLoggedIn() {
    try {
        setIsLoading(true)
        let userToken = await AsyncStorage.getItem("userToken")
        dispatch(setUserToken(userToken))
        setIsLoading(false)
    } catch(err) {
        console.log("Is logged in error " + err)
        setIsLoading(false)
    } 
}

async function homePosition() {
  let location = await Location.getCurrentPositionAsync({});
  const hlat = location.coords.latitude
  const hlong = location.coords.longitude
  dispatch(setHome({lat: hlat, lo: hlong}))
 }

React.useEffect(() => {
  isLoggedIn()
  homePosition();
},[])



 

  if(isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    )
  }

 


 

  return (
    <NavigationContainer style={styles.masterContainer} >
      { userToken !== null ? <AppStack /> : <AuthStack/>}
    </NavigationContainer>
       
  )
}


const styles = StyleSheet.create({
    masterContainer : {
        flex: 1
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems:"center",
    }
})