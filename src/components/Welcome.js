import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import {useFonts} from 'expo-font'
import { AntDesign } from '@expo/vector-icons'; 
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Welcome({navigation}) {
    



    const [regular] = useFonts({
        Roboto: require('../../assets/fonts/roboto-regular.ttf'),
      });

      function handleNavigation() {
        navigation.navigate("Login")
      }
     
    return(
        <View style={styles.masterContainer}>
        <View style={styles.imgContainer}>
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
        fontFamily: "Roboto",
        fontSize: 20,
        marginLeft: "10%" ,
         
    }
})