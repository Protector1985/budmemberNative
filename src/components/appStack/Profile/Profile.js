import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Dimensions from "react-native"


export default function Profile() {
    const [email, setEmail] = React.useState("")
    const [phone, setPhone] = React.useState("")
    const [birthDate, setBirtDate] = React.useState("")
   
    return (
        <SafeAreaView style={styles.container}>
        <ImageBackground style={styles.imgContainer} source={require("../../../assets/pictures/splash6.jpg")}>
            <Image style={styles.profilePic} source={require("../../../assets/pictures/profilePic.jpg")} />
            <View style={styles.nameContainer}>
                <Text style={styles.name}>Michael Braun</Text>
                <Text style={styles.membership}>VIP Gold Member</Text>
            </View>
        </ImageBackground>
            <ScrollView style={styles.inputContainer}>
                <View style={styles.inputSubContainer} >
                    <Text style={styles.label}>Your Email</Text>
                    <TextInput style={styles.inputField} autoComplete={'email'} value={email} onChangeText={(text) => setEmail(() => text)}/>
                </View>
                <View style={styles.inputSubContainer} >
                    <Text style={styles.label}>Phone</Text>
                    <TextInput style={styles.inputField} autoComplete={'tel'} value={phone} onChangeText={(text) => setPhone(() => text)}/>
                </View>
                <View style={styles.inputSubContainer} >
                    <Text style={styles.label}>Birth Date</Text>
                    <TextInput style={styles.inputField} autoComplete={'birthdate-full'} value={phone} onChangeText={(text) => setPhone(() => text)}/>
                </View>
            </ScrollView> 
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imgContainer: {
        flexDirection: "row",
        width: undefined,
        height: 'auto',
        position: "relative",
        top: -100,
        paddingTop:110,
        alignItems: "center",
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "#FFF",
        marginBottom: -25,
        marginLeft:15,
    },
    nameContainer: {
        flexDirection:"column",
        marginLeft: 15,
    },
    name: {
        fontFamily: "Roboto-Regular",
        color: "#FFF",
        fontSize: 20,
        fontWeight: "800",
        marginVertical: 8,
        marginBottom: 0,
    },
    membership: {
        fontFamily: "Roboto-Regular",
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: 13,
        marginRight: 4,
    },
    inputContainer: {
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
    },
    inputField: {
        borderBottomColor: "#cecece",
        borderBottomWidth: 1,
        marginBottom: 20,
        height: 40,
    },
    label: {
        color: "#333333"
    }
    
    
})