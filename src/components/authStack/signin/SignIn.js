
import {View, Text, TextInput, StyleSheet, Image} from "react-native";
import {useFonts} from 'expo-font'
import { TouchableOpacity } from "react-native-gesture-handler";


export default function SignIn() {
    const [regular] = useFonts({
        Roboto: require("../../../../assets/fonts/roboto-regular.ttf"),
      });

      if (!regular) {
        return null;
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
                            <TextInput style={styles.inputField}/>
                        </View>
                        <View style={styles.inputSubContainer} >
                            <Text style={styles.label}>Password</Text>
                            <TextInput style={styles.inputField}/>
                        </View>
                    </View>
                    <View style={styles.btnSection}>
                        <Text style={styles.forgotPassword}>Forgot Password</Text>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.btnText}>Sign In</Text>
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
    btnText: {
        textAlign: "center",
        color: "#fff"
    },
    forgotPassword: {
        marginTop: "3%",
        color: "#b6c0ca",
    }
})