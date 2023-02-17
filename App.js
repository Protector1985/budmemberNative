import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import "@expo/match-media";
import {useMediaQuery} from 'react-responsive';

import AppNav from './src/navigation/AppNav';
import store from './src/store/store.js'
import { Provider } from 'react-redux'
import { useFonts } from 'expo-font';
import * as Location from 'expo-location'
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser';

function App() {
  const [status, requestPermission] = Location.useForegroundPermissions()


    React.useEffect(() => {
        try {
          requestPermission()
        } catch(err) {
            console.log(err)
        }
    },[status])

 

 

  return (
    <Provider store={store}>
        <View style={styles.masterContainer}> 
            <AppNav />
            <StatusBar style="light" />
        </View>
    </Provider>
    
  );
}


const styles = StyleSheet.create({
  masterContainer: {
    flex: 1,   
  },
  
});

export default App
