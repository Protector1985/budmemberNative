import { StyleSheet, View, Text, TextInput, Image } from "react-native";
import {useFonts} from 'expo-font'

export default function Signup() {
    const [regular] = useFonts({
        Roboto: require('../../../assets/fonts/roboto-regular.ttf'),
      });

      if (!regular) {
        return null;
      }

    return (
        <View style={styles.masterContainer}>
            <View style={styles.subContainer}>
                <View style={styles.imgContainer}>
                    <Image style={styles.logo} source={require('../login/logo.jpg')} />
                </View>
                <View style={styles.topContainer}>
                    <View style={styles.headlineContainer}>
                        <Text style={styles.createAcc}>Create an account</Text>
                        <View style={styles.topTextContainer}>
                            <Text style={styles.alreadyMember}>Already a Budmember?</Text>
                            <Text style={styles.signIn}>Sign In</Text>
                        </View>
                    </View>
                    <View style={styles.socialContainer}>
                        <Text style={styles.signupWithSocial}>Sign up with Social</Text>
                        <Image style={styles.googleLogo} source={require("../login/google.png")} />
                    </View>
                </View>  

                <View style={styles.lineContainer}>
                    <View style={styles.line}></View>
                        <Text style={styles.or}>Or</Text>
                    <View style={styles.line}></View>
                </View>

                <View style={styles.inputContainer}>

                </View>

                <View style={styles.bottomContainer}>
                
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    masterContainer: {
        flex:1,
        backgroundColor:"#2a1b6e",
        height: "100%",
        width: "100%", 
        justifyContent: "center",
        alignItems: "center",      
    },

    subContainer: {
        flex: 1,
        width: "90%",
        height: "90%",
    },

    topContainer: {
        flex: 1,
        width: "100%",
       
    },

    inputContainer : {
        flex: 1,
        width: "100%",
        backgroundColor: "blue"
    },

    bottomContainer: {
        flex: 1,
        width: "100%",
        backgroundColor: "green"
    },
    createAcc:{
        color: "#dbdbdb",
        fontSize: 25,
        fontFamily: "Roboto",
        
    },
    topTextContainer: {
        flexDirection: "row",
    },
    alreadyMember: {
        fontFamily: "Roboto",
        color: "#dbdbdb",
        fontSize: 14,
    },
    signIn: {
        color: "#2da491",
        fontFamily: "Roboto",
        textDecorationLine: "underline",
        fontSize: 14,
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
    headlineContainer: {
        flex:1,
    },
    socialContainer : {
        flex:1,
        flexDirection: "column",
    },
    googleLogo: {
        marginTop: "2%"
    },
    signupWithSocial: {
        fontFamily: "Roboto",
        color: "#dbdbdb",
        fontSize: 16,
    },
    lineContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "2%",
    },
    line: {
        width: "41%",
        borderColor: "#dbdbdb",
        borderWidth: 0.5,
    },
    or : {
        fontFamily: "Roboto",
        color: "#dbdbdb", 
        fontSize: 21,
    },
    
})