import {View, Text, TextInput, StyleSheet, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useFonts} from 'expo-font'

export default function ForgotPassword() {
    
    return(
        <View style={styles.masterContainer}>
            <View style={styles.subContainer}>
                <View style={styles.imgContainer}>
                    <Image style={styles.logo} source={require('../login/logo.jpg')} />
                </View>

                <View style={styles.resetSection}>
                    <Text style={styles.resetDisclaimer}>A reset confirmation code has been sent to your verified email.</Text>
                    <View>
                        <View style={styles.inputSubContainer} >
                            <Text style={styles.label}>code</Text>
                            <TextInput style={styles.inputField}/>
                        </View>
                        <View style={styles.inputSubContainer} >
                            <Text style={styles.label}>Password</Text>
                            <TextInput style={styles.inputField}/>
                        </View>
                      
                        <View style={styles.inputSubContainer} >
                            <Text style={styles.label}>Re-Type Password</Text>
                            <TextInput style={styles.inputField}/>
                        </View>
                    </View>
                    <View style={styles.btnSection}>
                        <TouchableOpacity style={styles.btn}>
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