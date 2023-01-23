import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import {useFonts} from 'expo-font'
import { AntDesign } from '@expo/vector-icons'; 

import React from 'react';
import { useDispatch } from "react-redux";
import Alert from "./utils/Alert";
import { setLocationPermission } from "../store/permissionSlice";
import * as Location from 'expo-location';


export default function Welcome({navigation}) {
    const [alertOpen, setAlertOpen] = React.useState(false)
    const [alertMessage, setAlertMessage] = React.useState("")
    const [alertType, setAlertType] = React.useState("")
    const dispatch = useDispatch()
 
   
    const [isLoaded] = useFonts({
        'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
      });

    React.useEffect(() => {
      async function requestPermissions() {
        try {
            const {status} = await Location.requestForegroundPermissionsAsync();
     
        if (status !== 'granted') {
          setAlertOpen(true);
          setAlertMessage("Some features of this app might not be available without location permission")
          setAlertType("WARNING")
        }
        dispatch(setLocationPermission(true))

        }catch (err) {
            console.log(err)
        }
    }
        requestPermissions()
    
    },[])


      function handleNavigation() {
        navigation.navigate("Login")
      }
     
    return(
        <View style={styles.masterContainer}>
        <View style={styles.imgContainer}>
                <Alert visible={alertOpen} setVisible={setAlertOpen} message={alertMessage} type={alertType}/>
                <Image style={styles.logo} source={require('./authStack/login/logo.jpg')} />
        </View>
        
        
        <TouchableOpacity onPress={handleNavigation} style={styles.btn}>
            <Text style={styles.btnText}>Start Saving</Text>
            <AntDesign style={{marginRight: 10}} name="right" size={24} color="white" />
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    masterContainer: {
        flex: 1,
        backgroundColor:"#2a1b6e",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    imgContainer: {
        flex: 1,
        width: "100%",
        height: "auto",
        marginTop: 10,
        flexDirection:"column",
    },
    logo: {
        flex:1,
        height: null,
        width: null,
        resizeMode: "contain",
    },
    btn: {
        width: "95%",
        height: 60,
        backgroundColor: "#2da491",
        marginBottom: "30%",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
        flexDirection:"row",
    },
    btnText: {
        color: "#fff",
        fontFamily: "Roboto-Regular",
        fontSize: 20,
        marginLeft: "10%" ,
         
    }
})