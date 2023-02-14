import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import "@expo/match-media";
import {useMediaQuery} from 'react-responsive';
import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';
import store from './src/store/store.js'
import { Provider } from 'react-redux'
import { useFonts } from 'expo-font';
import * as Location from 'expo-location'
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser';

function App() {
  

  const [status, requestPermission] = Location.useForegroundPermissions()
    async function requestPermissions() {
        try {
            if(status != null) {
                if (!status?.granted) {
                    
            //   setAlertOpen(true);
            //   setAlertMessage("Some features of this app might not be available without location permission")
            //   setAlertType("WARNING")
                }
                return "GRANTED"
            }
        }catch (err) {
            console.log(err)
        }
    }

    React.useEffect(() => {
        try {
          requestPermission()
        } catch(err) {
            console.log(err)
        }
    },[status])

 

 

  return (
    <Provider store={store}>
      <AuthProvider>
        <View style={styles.masterContainer}> 
            <AppNav />
            <StatusBar style="light" />
        </View>
      </AuthProvider>
    </Provider>
    
  );
}


const styles = StyleSheet.create({
  masterContainer: {
    flex: 1,   
  },
  
});

export default App
