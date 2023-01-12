import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import UserAvatar from 'react-native-user-avatar';
import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import SideDrawer from '../../SideDrawer/SideDrawer';
import SideMenu from 'react-native-side-menu';


export default function Profile({ email, firstName, lastName, phone, birthDate, membership, image, navigation}) {
    const colors = useSelector((state) => state.userSlice.colorPalette)
    const {open} = useSelector((state)=> state.drawerSlice)
    const menu = <SideDrawer navigation={navigation} />
    
    return (
        <SafeAreaView style={styles.container}>
        
        <View style={{height: 200, position:"relative"}}>
        <LinearGradient
            style={{
                flexDirection: "row",
                width: undefined,
                height: "100%",
                // position: "relative",
                top: -100,
                paddingTop:110,
                alignItems: "center",
                
                }}
                colors={[colors.main, colors.mainLight]}
                start={{x: 0.5, y: 0}}
                end={{x: 1, y: 0.7}}
            >
                
            </LinearGradient>
                <View style={styles.avatarContainer}>
                        <UserAvatar style={styles.profilePic} size={97} name={`${firstName} ${lastName}`} src={image}  />
                        <View style={styles.nameContainer}>
                            <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
                            <Text style={styles.membership}>{!membership ? "Not Subscribed" : membership}</Text>
                        </View>
                </View>
            </View>
            
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
        flex: 1,
        backgroundColor:"white",
    },
    imgContainer: {
        flexDirection: "row",
        width: undefined,
        height: 'auto',
        position: "absolute",
        top: -100,
        paddingTop:110,
        alignItems: "center",
       
    },
    avatarContainer: { top: -180, position: 'relative', flexDirection: "row", alignItems: 'center'},
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "#FFF",
        marginBottom: -25,
        marginLeft:15,
        zIndex:1000,
        position: 'relative',
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
        postion:'relative',
        top: -50,
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