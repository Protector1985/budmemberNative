import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import "@expo/match-media";
import {useMediaQuery} from 'react-responsive';
import Login from './src/components/login/Login';
import Signup from './src/components/signup/Signup';


//add store and provider!!
export default function App() {

  const tablet = useMediaQuery({
    query: "(min-device-width: 650)"
  })

  return (
    <View style={styles.masterContainer}>
        <Signup />
        <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  masterContainer: {
    flex: 1,   
  },
  
});
