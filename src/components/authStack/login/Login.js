
import {useContext, useState} from "react";
import {StyleSheet, Text, View, Image, TextInput, line, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView} from 'react-native';
import {useFonts} from 'expo-font'
import { A } from '@expo/html-elements';
import SocialLoginButton from './SocialLoginButton';
import ContinueButton from './ContinueButton'
import { findUser } from "../../../api/nodeApi";
import Spinner from '../../utils/Spinner';
import GoogleSignIn from "../googleSignIn/GoogleSignIn";
import { useSelector } from "react-redux";
import { setIsLoading } from "../../../store/authSlice";


export default function Login({navigation}) {
    //state for login component
    const [email, setEmail] = useState("");
    const [isLoading, setLoading] = useState(false);
    const {globalSpinnerOn} = useSelector((state) => state.authSlice)
   

      // onPress function passed to Continue button
      async function handlePress() {
        try {
        setLoading(true)
       
        //Checks if user is already signed up    
        const res = await findUser(email)
        //if user is not signed up, navigate to signup
        if(!res.data.success) {
            setLoading(false)
            navigation.navigate('Signup', {email: email.toLowerCase()})
        
            //if user is signed up, navigate to signin    
        } else if(res.data.success) {
            setLoading(false)
            navigation.navigate('Signin', {email: email.toLowerCase()})
        }   
    } catch(err) {
        console.log(err)
    }
}

    //if isLoading === true, return the loading spinner
    if(isLoading) {
        return <Spinner />
    }

   
    
    
    return (
        <View style={styles.masterContainer}>
            <KeyboardAvoidingView style={styles.subContainer}>
            <View style={styles.imgContainer}>
                <Image style={styles.logo} source={require('./logo.jpg')} />
            </View>

            <View style={styles.txtContainer}>
                <Text style={styles.baseText}>
                    <Text style={styles.signIn}>Sign In</Text>{'\n'}
                    <Text style={styles.newUserContainer}>
                        <View style={styles.spacer}></View>
                        <View style={styles.newUserTextContainer}>
                            <Text style={{color: "#dbdbdb", fontSize: 17}}>New User? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Signup")}><Text style={styles.createNew}>Create New User</Text></TouchableOpacity>
                        </View>
                        </Text>  
                </Text>
                
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email address</Text>
                    <TextInput keyboardType="email-address" textContentType="emailAddress" autoComplete={'email'} value={email} onChangeText={(text) => setEmail(() => text)} style={styles.inputField}  />
                    <View style={styles.continueContainer}>
                        <ContinueButton disabled={isLoading || email.length < 3} pressed={handlePress} />
                    </View>
                    
                </View>
            </View>

            <View style={styles.lineContainer}>
                <View style={styles.line}></View>
                    <Text style={styles.or}>Or</Text>
                <View style={styles.line}></View>
            </View>


            <View style={styles.socialContainer}>
                <GoogleSignIn setLoading={setLoading} navigation={navigation} />
            </View>
            </KeyboardAvoidingView>
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
    
    newUserTextContainer: {
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems:"center",
    },
    spacer: {
        height: 30,
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
        marginBottom: "25%",
    },
    newUser: {
        fontSize:18,
    },
    createNew: {
        fontSize:15,
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
        paddingLeft: 10,
    },
    label: {
        color: "#dbdbdb",  
    },
    lineContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "11%",
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