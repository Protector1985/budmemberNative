import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/components/Login';
import { store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';


//add store and provider!!
export default function App() {
  return (
    <View style={styles.masterContainer}>
     
        <Login />
        <StatusBar style="auto" />
     
    </View>
  );
}

const styles = StyleSheet.create({
  masterContainer: {
    flex:1,   
    alignItems: 'center',
    justifyContent: 'center',
  },
});
