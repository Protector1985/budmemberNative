
import {useContext, useState} from 'react'
import {View, Text, TextInput, StyleSheet, Image} from "react-native";
import {useFonts} from 'expo-font'
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from '../../../context/AuthContext';


export default function SignIn({navigation}) {
    //state needed for this component
    const [email, setEmail] = useState(navigation.state.params.email || "");
    const [password, setPassword] = useState("");
     //State passed from useContext - AuthContext
    const {login, logout} = useContext(AuthContext);
    
   
    //initialize Roboto font
    const [regular] = useFonts({
        Roboto: require("../../../../assets/fonts/roboto-regular.ttf"),
      });

      if (!regular) {
        return null;
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
                                autoComplete={'email'} 
                                value={email} 
                                onChangeText={(text) => setEmail(text)} 
                                style={styles.inputField}/>
                        </View>
                        <View style={styles.inputSubContainer} >
                            <Text style={styles.label}>Password</Text>
                            <TextInput 
                                secureTextEntry={true} 
                                autoComplete={'password'} 
                                value={password} 
                                onChangeText={(text) => setPassword(text)} 
                                style={styles.inputField}/>
                        </View>
                    </View>
                    <View style={styles.btnSection}>
                        <Text style={styles.forgotPassword}>Forgot Password</Text>
                        <TouchableOpacity onPress={() => login(email, password)} disabled={disableButton()} style={ disableButton() === false ? styles.btn : styles.btnDisabled}>
                            <Text style={disableButton() === false ? styles.btnText : styles.btnTextDisabled}>Sign In</Text>
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
    signInSection: {
        flex: 1.5,
    },
    inputContainers: {
        flex: 1,
    },
    signInHeadline: {
        fontFamily: "Roboto",
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
        fontFamily: "Roboto",
        color: "#dbdbdb", 
        fontSize: 12,
        marginBottom: "1%",
    },

    inputField: {
        backgroundColor: "#fff",
        minHeight: 35,
        borderRadius: 5,
    },
    inputSubContainer: {
        marginBottom: "3%",
    },
    btnSection: {
        flex:2,
    },
    btn: {
        backgroundColor: "#2da491",
        width: "100%",
        padding: 10,
        marginTop: 15,
        textAlign: "center",
        borderRadius: 15,
    }, 
    btnDisabled: {
        backgroundColor: "#2da49180",
        width: "100%",
        padding: 10,
        marginTop: 15,
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
        marginTop: "3%",
        color: "#b6c0ca",
    }
})