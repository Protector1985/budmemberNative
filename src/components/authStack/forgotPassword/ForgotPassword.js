import React from 'react';
import {View, Text, TextInput, StyleSheet, Image, ActivityIndicator} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useFonts} from 'expo-font'
import { forgotPassword, resetPassword } from '../../../api/nodeApi';
import Alert from '../../utils/Alert';


export default function ForgotPassword({navigation}) {
  
    const [email, setEmail] = React.useState(navigation?.state?.params.params || "");
    const [loading, setLoading] = React.useState(false)
    const [alertOpen, setAlertOpen] = React.useState(false)
    const [alertMessage, setAlertMessage] = React.useState("")
    const [alertType, setAlertType] = React.useState("")
    const [code, setCode] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confirmedPassword, setConfirmedPassword] = React.useState("")
    let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
    
    console.log(email)
    async function handleResetPassword(){
        console.log(email)
        try {
        setLoading(true);
        if(password !== confirmedPassword) {
            setAlertOpen(true);
            setAlertMessage("The passwords don't match")
            setAlertType("ERROR")
        } else if(password === confirmedPassword) {
            if(mediumPassword.test(password)) {
                if(code.length > 2) {
                    console.log(password)
                    
                    try {
                    const response = await resetPassword({email, code, new_password: password});
                    console.log(response.data)
                    if(response?.data?.success){
                        setAlertOpen(true);
                        setAlertMessage("Your password was successfully reset")
                        setAlertType("SUCCESS")
                        
                       
                    }else{
                        setAlertOpen(true);
                        setAlertMessage("Something went wrong")
                        setAlertType("ERROR")
                  
                    }
                    } catch (error) {
                    console.log(error)
                    }finally{
                    setLoading(false)
                    }
            } else if(code.length < 2) {
                setAlertOpen(true);
                setAlertMessage("Your code doesn't look right")
                setAlertType("ERROR")
                setLoading(false)
            }
        } else {
            setAlertOpen(true);
            setAlertMessage(`Your password is too weak!
                Your password has to abide by the rules below:
                - At least 8 characters long.
                - Contain at least one upper- and one lowercase letter.
                - Contain at least one special character
                - Contain at least one number
                - Contain at least one special character - $ % ! ? # @ *
            `)
            setAlertType("ERROR")
            setLoading(false)
         }
        }
    }catch(err) {
        console.log(err)
    }
}

    
    return(
        <View style={styles.masterContainer}>
        <ActivityIndicator color={"#2CA491"} animating={loading} style={{zIndex: 10000, position: 'absolute', alignSelf: "center", top: "50%", bottom: "50%"}} size="large" />
        <Alert location="Signin" navigation={navigation} visible={alertOpen} setVisible={setAlertOpen} message={alertMessage} type={alertType}/>
            <View style={styles.subContainer}>
                <View style={styles.imgContainer}>
                    <Image style={styles.logo} source={require('../login/logo.jpg')} />
                </View>

                <View style={styles.resetSection}>
                    <Text style={styles.resetDisclaimer}>A reset confirmation code has been sent to your verified email.</Text>
                    <View>
                        <View style={styles.inputSubContainer} >
                            <Text style={styles.label}>code</Text>
                            <TextInput value={code} onChangeText={(text) => setCode(text)} style={styles.inputField}/>
                        </View>
                        <View style={styles.inputSubContainer} >
                            <Text style={styles.label}>Password</Text>
                            <TextInput secureTextEntry={true} autoComplete={'password'}  value={password} onChangeText={(text) => setPassword(text)} style={styles.inputField}/>
                        </View>
                      
                        <View style={styles.inputSubContainer} >
                            <Text style={styles.label}>Re-Type Password</Text>
                            <TextInput secureTextEntry={true} autoComplete={'password'} value={confirmedPassword} onChangeText={(text) => setConfirmedPassword(text)} style={styles.inputField}/>
                        </View>
                    </View>
                    <View style={styles.btnSection}>
                        <TouchableOpacity onPress={handleResetPassword} style={styles.btn}>
                            <Text style={styles.btnText}>Reset Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    masterContainer: {
        flex: 1,
        backgroundColor:"#2a1b6e",
        height: "100%",
        width: "100%", 
        justifyContent: "center",
        alignItems: "center", 
    },
    
    resetSection: {
        flex: 1.5,
    },
    subContainer: {
        flex: 1,
        width: "90%",
        height: "90%",
    },
    imgContainer: {
        flex: 0.7,
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
    inputField: {
        backgroundColor: "#fff",
        minHeight: 35,
        borderRadius: 5,
    },
    inputSubContainer: {
        marginBottom: "3%",
    },
    label: {
        fontFamily: "Roboto-Regular",
        color: "#dbdbdb", 
        fontSize: 12,
        marginBottom: "1%",
    },
    btn: {
        backgroundColor: "#2da491",
        width: "100%",
        padding: 10,
        marginTop: 15,
        textAlign: "center",
        borderRadius: 15,
       
    }, 
    btnText: {
        textAlign: "center",
        color: "#fff"
    },
    resetDisclaimer : {
        fontFamily: "Roboto-Regular",
        color: "#dbdbdb", 
        fontSize: 17,
        marginBottom:"5%",
        textAlign: "center",
    }
})