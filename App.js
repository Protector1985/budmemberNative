import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import "@expo/match-media";
import {useMediaQuery} from 'react-responsive';
import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';
import store from './src/store/store.js'
import { Provider } from 'react-redux'


function App() {
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
