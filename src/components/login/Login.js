import {StyleSheet, Text, View, Image, TextInput, line, TouchableOpacity} from 'react-native';
import {useFonts} from 'expo-font'
import { A } from '@expo/html-elements';
import SocialLoginButton from './SocialLoginButton';
import ContinueButton from './ContinueButton'

export default function Login() {
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
                <Image style={styles.logo} source={require('./logo.jpg')} />
            </View>

            <View style={styles.txtContainer}>
                <Text style={styles.baseText}>
                    <Text style={styles.signIn}>Sign In</Text>{'\n'}
                    <Text style={styles.newUserContainer}>
                        <View style={styles.spacer}></View>
                        <Text style={styles.newUser}>New User? </Text>
                        <A href="https://google.com" style={styles.createNew}>Create New User</A>
                    </Text>  
                </Text>
                
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email address</Text>
                    <TextInput style={styles.inputField}  />
                    <View style={styles.continueContainer}>
                        <ContinueButton />
                    </View>
                    
                </View>
            </View>

            <View style={styles.lineContainer}>
                <View style={styles.line}></View>
                    <Text style={styles.or}>Or</Text>
                <View style={styles.line}></View>
            </View>


            <View style={styles.socialContainer}>
                <SocialLoginButton socialIcon={require("./google.png")} socialDescription={"Continue with Google"} />
            </View>
            </View>
        </View>
    )
}
// <Image style={styles.logo} source={require('./logo.jpg')} />
const styles = StyleSheet.create({
    masterContainer: {
        flex:1,
        backgroundColor:"#2a1b6e",
        height: "100%",
        width: "100%", 
        justifyContent: "center",
        alignItems: "center",
        
    },
    spacer: {
        height: "17%",
        width: "100%",
    },
    continueContainer: {
        width: "100%",
        height: 50,
        alignItems: "flex-end",
        marginTop:"5%",
    },
    subContainer: {
        flex: 1,
        width: "90%",
        height: "90%",
    },
    lowerTextContainer: {
        marginTop: 10,
    },
    
    txtContainer: {
        flex:1.5,
    },
    imgContainer: {
        flex: 1,
        width: "100%",
        height: "auto",
        marginTop: 10,
        flexDirection:"column",
    },
    socialContainer: {
        flex:2,
    },
    logo: {
        flex:1,
        height: null,
        width: null,
        resizeMode: "contain",
    },
    baseText: {
        flex:1,
        color: "#dbdbdb",     
    },
    signIn: {
        fontSize: 30,
        fontFamily: "Roboto",
        marginBottom: 30,
    },
    newUser: {
        fontSize:18,
        fontFamily: "Roboto",
    },
    createNew: {
        fontSize:15,
        fontFamily: "Roboto",
        color: "#2da491",
        textDecorationLine: "underline",
    },
    inputContainer: {
        flex: 1,
        width: "100%",
    },
    inputField: {
        width: "100%",
        height: 40,
        backgroundColor: "white",
        borderRadius: 7,
        marginTop: 5,
    },
    label: {
        color: "#dbdbdb",  
    },
    lineContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "3%",
    },
    line: {
        width: "41%",
        borderColor: "#dbdbdb",
        borderWidth: 0.5,
    },
    or : {
        color: "#dbdbdb", 
        fontSize: 21,
    },

    
})