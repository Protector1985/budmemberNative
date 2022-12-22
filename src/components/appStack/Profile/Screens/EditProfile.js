
import { SafeAreaView} from "react-native-safe-area-context"
import {View, Text, TextInput, StyleSheet, ImageBackground, Image, Dimensions } from 'react-native';
import moment from 'moment';

export default function EditProfile ({email, setEmail, firstName, setFirstName, lastName,setLastName,phone,setPhone,birthDate,setBirtDate}) {
    
    return (
        <SafeAreaView style={styles.container}>
        <ImageBackground style={styles.imgContainer} source={require("../../../../assets/pictures/splash6.jpg")}>
            <Image style={styles.profilePic} source={require("../../../../assets/pictures/profilePic.jpg")} />
        </ImageBackground>
            <View style={styles.inputContainer}>
                <View style={Dimensions.get("window").height > 690 ? styles.inputSubContainer :styles.inputSubContainerSmall} >
                    <Text style={Dimensions.get("window").height > 690 ? styles.label : styles.labelSmall}>First Name</Text>
                    <TextInput value={firstName} style={Dimensions.get("window").height > 690 ? styles.textDisplay : styles.textDisplaySmall} onChangeText={(text) => setFirstName(() => text)}/>
                </View>
                <View style={Dimensions.get("window").height > 690 ? styles.inputSubContainer :styles.inputSubContainerSmall} >
                    <Text style={Dimensions.get("window").height > 690 ? styles.label : styles.labelSmall}>Last Name</Text>
                    <TextInput value={lastName} style={Dimensions.get("window").height > 690 ? styles.textDisplay : styles.textDisplaySmall} onChangeText={(text) => setLastName(() => text)} />
                </View>
                <View style={Dimensions.get("window").height > 690 ? styles.inputSubContainer :styles.inputSubContainerSmall} >
                    <Text style={Dimensions.get("window").height > 690 ? styles.label : styles.labelSmall}>Your Email</Text>
                    <TextInput value={email} style={Dimensions.get("window").height > 690 ? styles.textDisplay : styles.textDisplaySmall} onChangeText={(text) => setEmail(() => text)} />
                </View>
                <View style={Dimensions.get("window").height > 690 ? styles.inputSubContainer :styles.inputSubContainerSmall} >
                    <Text style={Dimensions.get("window").height > 690 ? styles.label : styles.labelSmall}>Phone</Text>
                    <TextInput value={phone} style={Dimensions.get("window").height > 690 ? styles.textDisplay : styles.textDisplaySmall} onChangeText={(text) => setPhone(() => text)} />
                </View>
                <View style={Dimensions.get("window").height > 690 ? styles.inputSubContainer :styles.inputSubContainerSmall} >
                    <Text style={Dimensions.get("window").height > 690 ? styles.label : styles.labelSmall}>Date of birth</Text>
                    <TextInput value={moment(birthDate).format("MM/DD/YYYY")} style={Dimensions.get("window").height > 690 ? styles.textDisplay : styles.textDisplaySmall} onChangeText={(text) => setBirtDate(() => text)} />
                </View>
            </View> 
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgContainer: {
        flexDirection: "row",
        width: undefined,
        height: 'auto',
        position: "relative",
        top: -100,
        paddingTop:80,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 0,
    },
    profilePic: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 3,
        borderColor: "#FFF",
        marginBottom: 20,
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
        height: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        position: 'relative',
        top: -80,
        
    },
    inputSubContainer: {
        borderBottomColor: "#cecece",
        borderBottomWidth: 1,
        marginBottom: 20,
        height: 58,
    },
    inputSubContainerSmall: {
        borderBottomColor: "#cecece",
        borderBottomWidth: 1,
        marginBottom: 10,
        height: 58,
    },
    label: {
        color: "#333333",
    },
    labelSmall: {
        color: "#333333",
        fontSize:11,
    },
    textDisplay: {
        fontSize: 18,
        marginTop: 10,    
    },
    textDisplaySmall: {
        fontSize: 16,
        marginTop: 10,    
    }
    
    
})
