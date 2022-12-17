import { NavigationContainer } from '@react-navigation/native';
import { useContext } from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import AppStack from '../components/appStack/AppStack';


import AuthStack from '../components/authStack/AuthStack';
import { AuthContext } from '../context/AuthContext';



export default function AppNav() {
  const {isLoading, userToken} = useContext(AuthContext)

 
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