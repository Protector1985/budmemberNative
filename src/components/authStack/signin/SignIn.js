import React from 'react';
import {useContext, useState} from 'react'
import {View, Text, TextInput, StyleSheet, Image, ActivityIndicator} from "react-native";
import {useFonts} from 'expo-font'
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from '../../../context/AuthContext';
import Alert from '../../utils/Alert'
import { findUser, forgotPassword } from '../../../api/nodeApi';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export default function SignIn({navigation}) {

    //state needed for this component
    const [email, setEmail] = useState(navigation?.state?.params?.email.toLowerCase() || "");
    const [password, setPassword] = useState("");
     //State passed from useContext - AuthContext
    const {login, logout} = useContext(AuthContext);

    const [loading, setLoading] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false)
    const [alertMessage, setAlertMessage] = React.useState("")
    const [alertType, setAlertType] = React.useState("")
    const [userFound, setUserFound] = React.useState(false)
    
    
    
    async function submitForgotPassword(){
        setLoading(true);
        try {
        const user = await findUser(email)
        if(user?.data?.success) {
          if(user?.data?.data?.Email_Verified__c === false) {
            setUserFound(false)
            setAlertOpen(true);
            setAlertMessage("Your email is not verified. This service is only available for verified users")
            setAlertType("ERROR")
          } else if(user?.data?.data?.Email_Verified__c === true) {
                const response = await forgotPassword({email});
              if(response?.data?.success){
                navigation.navigate("ForgotPassword",{
                    params: email
                  })
              }else{
                setAlertOpen(true);
                setAlertMessage(response?.data?.data?.log)
                setAlertType("ERROR")
                
          }
        }
        } else if (!user?.data?.success) {
                setAlertOpen(true);
                setAlertMessage("User not found")
                setAlertType("ERROR")
        }
        } catch (error) {
            setAlertOpen(true);
            console.log(error)
            setAlertMessage("Something went wrong. Please restart the app and try again")
            setAlertType("ERROR")
        }finally{
            setLoading(false)
        } 
  }
    


      function disableButton() {
        if(email.trim() === "" || password.trim() === "") {
            return true
        } else {
            return false
        }
      }

   

    return(
        <View style={styles.masterContainer}>
        <ActivityIndicator color={"#2CA491"} animating={loading} style={{zIndex: 10000, position: 'absolute', alignSelf: "center", top: "50%", bottom: "50%"}} size="large" />
        <Alert location="Enter Code" navigation={navigation} visible={alertOpen} setVisible={setAlertOpen} message={alertMessage} type={alertType}/>
        <KeyboardAwareScrollView
                style={{width: "100%"}}
                contentContainerStyle={{
                    
                    alignItems:"center",
                    width:"100%",
                    flexGrow: 1,
                    justifyContent:"center",
                    overflow:"scroll",
                }}>
            <View style={styles.subContainer}>
                <View style={styles.imgContainer}>
                    <Image style={styles.logo} source={require('../login/logo.jpg')} />
                </View>
                <View style={styles.signInSection}>
                    <Text style={styles.signInHeadline}>Sign In</Text>
                    <View style={styles.inputContainers}>
                        <View style={styles.inputSubContainer} >
                            <Text style={styles.label}>Email address</Text>
                            <TextInput 
                                autoComplete='email'
                                keyboardType="email-address"
                                textContentType="emailAddress"
                                value={email} 
                                onChangeText={(text) => setEmail(text.toLowerCase())} 
                                style={styles.inputField}/>
                        </View>
                        <View style={styles.inputSubContainer} >
                            <Text style={styles.label}>Password</Text>
                            <TextInput 
                                secureTextEntry={true} 
                                autoComplete="password"
                                textContentType="password"
                                value={password} 
                                onChangeText={(text) => setPassword(text)} 
                                style={styles.inputField}/>
                        </View>
                    </View>
                    <View style={styles.btnSection}>
                        
                        <View style={styles.submitBtn}>
                            <TouchableOpacity onPress={() => login(email, password)} disabled={disableButton()} style={ disableButton() === false ? styles.btn : styles.btnDisabled}>
                                <Text style={disableButton() === false ? styles.btnText : styles.btnTextDisabled}>Sign In</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.forgotPwBtn}>
                            <TouchableOpacity disabled={loading} onPress={() => submitForgotPassword()} activeOpacity={1} style={styles.fpBtn}>
                                <Text style={styles.forgotPassword}>Forgot Password</Text>
                            </TouchableOpacity>  
                        </View>
                        
                    </View>
                    
                </View>
            </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    masterContainer: {
        flex: 1,
        backgroundColor:"#2a1b6e",
        height: "100%",
        width: "100%", 
       
        
    },
    forgotPwBtn: {
        width: 170,
        marginTop: 30,
    },
    fpBtn: {
        width:"auto",
    },
    subContainer: {
        flex: 1,
        width: "90%",
        height: "90%",
    },
    imgContainer: {
        
        width: "100%",
        height: 150,
        marginTop: 10,
        flexDirection:"column",
    },
    signInSection: {
       flex:0.3
    },
    inputContainers: {
        flex: 1,
    },
    signInHeadline: {
        color: "#dbdbdb", 
        fontSize: 22,
        marginBottom: "5%",
    },
    logo: {
        flex:1,
        height: null,
        width: null,
        resizeMode: "contain",
    },
    label: {
        color: "#dbdbdb", 
        fontSize: 12,
        marginBottom: "1%",
    },

    inputField: {
        backgroundColor: "#fff",
        minHeight: 35,
        borderRadius: 5,
        paddingLeft: 10,
    },
    inputSubContainer: {
        marginBottom: "3%",
    },
    btnSection: {
        flex:2,
    },
    submitBtn: {
        width: "100%",
        borderRadius: 15,
    },
    btn: {
        backgroundColor: "#2da491",
        width: "100%",
        padding: 10,
        textAlign: "center",
        borderRadius: 15,
    }, 
    btnDisabled: {
        backgroundColor: "#2da49180",
        width: "100%",
        padding: 10,
        textAlign: "center",
        borderRadius: 15,
        opacity: 10,
    },
    btnText: {
        textAlign: "center",
        color: "#fff"
    },
    btnTextDisabled: {
        textAlign: "center",
        color: "grey"
    },
    forgotPassword: {
        marginTop: "auto",
        marginBottom:"auto",
        fontSize: 16,
        color: "#b6c0ca",
    }
})