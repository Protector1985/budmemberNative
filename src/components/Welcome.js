import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import {useFonts} from 'expo-font'
import { AntDesign } from '@expo/vector-icons'; 
import React from 'react';
import { useDispatch } from "react-redux";
import Alert from "./utils/Alert";
import { CookieStorage } from "amazon-cognito-identity-js";



export default function Welcome({navigation}) {
    
    const [alertOpen, setAlertOpen] = React.useState(false)
    const [alertMessage, setAlertMessage] = React.useState("")
    const [alertType, setAlertType] = React.useState("")
    const dispatch = useDispatch()

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
        fontSize: 20,
        marginLeft: "10%" ,
         
    }
})