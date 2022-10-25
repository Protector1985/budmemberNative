import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import "@expo/match-media";
import {useMediaQuery} from 'react-responsive';
import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';
import Amplify from 'aws-amplify'
import config from './src/aws-exports'



function App() {


  return (
    <AuthProvider>
      <View style={styles.masterContainer}> 
          <AppNav />
          <StatusBar style="light" />
      </View>
    </AuthProvider>
    
  );
}


const styles = StyleSheet.create({
  masterContainer: {
    flex: 1,   
  },
  
});

export default App
