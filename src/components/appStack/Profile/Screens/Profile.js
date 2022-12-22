import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from 'moment';


export default function Profile({ email, firstName, lastName, phone, birthDate, membership}) {


    return (
        <SafeAreaView style={styles.container}>
        <ImageBackground style={styles.imgContainer} source={require("../../../../assets/pictures/splash6.jpg")}>
            <Image style={styles.profilePic} source={require("../../../../assets/pictures/profilePic.jpg")} />
            <View style={styles.nameContainer}>
                <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
                <Text style={styles.membership}>{!membership ? "Not Subscribed" : membership}</Text>
            </View>
        </ImageBackground>
            <ScrollView style={styles.inputContainer}>
                <View style={styles.inputSubContainer} >
                    <Text style={styles.label}>Your Email</Text>
                    <Text style={styles.textDisplay}>{email}</Text>
                </View>
                <View style={styles.inputSubContainer} >
                    <Text style={styles.label}>Phone</Text>
                    <Text style={styles.textDisplay}>{phone}</Text>
                </View>
                <View style={styles.inputSubContainer} >
                    <Text style={styles.label}>Birth Date</Text>
                    <Text style={styles.textDisplay}>{moment(birthDate).format("MM/DD/YYYY")}</Text>
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
    inputSubContainer: {
        borderBottomColor: "#cecece",
        borderBottomWidth: 1,
        marginBottom: 20,
        marginTop: 30,
        height: 58,
    },
    label: {
        color: "#333333"
    },
    textDisplay: {
        fontSize: 18,
        marginTop: 10,
       
        
    }
    
    
})