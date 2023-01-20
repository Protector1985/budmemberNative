import React from 'react';
import {View, SafeAreaView, Text, StyleSheet, Dimensions, Image} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { LinearGradient } from 'expo-linear-gradient';
import { closeDrawer } from '../../../store/drawerSlice';
const width = Dimensions.get('window').width * 0.9

export default function SubscriptionData() {
    const {FirstName, LastName, Birthdate, Membership_Status__c} = useSelector((state) => state.userSlice)
    const {colorPalette} = useSelector((state) => state.userSlice);
    const {sub} = useSelector((state) => state.cognitoDataSlice.cognitoData)
    const dispatch = useDispatch();

    //closes drawer in case it is open
    React.useEffect(() => {
        dispatch(closeDrawer())
    },[])
    

    return (
        <View style={styles.container}>
           
            <View style={styles.headerContainer}>
                <Image style={styles.img} source={require("../../../assets/pictures/logo_white.png")} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.identifier}>Member ID: </Text> 
                <Text style={styles.data}>{sub}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.identifier}>Full Name: </Text> 
                <Text style={styles.data}>{`${FirstName} ${LastName}`}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.identifier}>DOB: </Text> 
                <Text style={styles.data}>{moment(Birthdate).format("MM/DD/YYYY")}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.identifier}>Membership Status: </Text> 
                <Text style={styles.data}>{Membership_Status__c}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
        backgroundColor: "white",
    },
    img: {
        width: "100%",
        height: 140,
        resizeMode: "contain",
    },
    headerContainer: {
        backgroundColor: "white",
        paddingBottom: "10%",
        position: "absolute",
        top: 0,
        width: "100%",
        height: "30%",
        alignItems:"center",
        justifyContent: "center",
    },
    header: {
        width: "100%",
        height: "100%",
        alignItems:"center",
        borderBottomEndRadius:"50%",
        borderBottomStartRadius:"50%"

    },
    roundContainer: {
        width: "100%",
        height: "200%",
        borderRadius: "200%",
        top: "-120%",
        backgroundColor: "white",
        zIndex: 10000,
    },
    textContainer: {
        width: width,
        alignItems: "center",
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 20,
    },
    identifier : {
        fontSize: 19,
        fontWeight: "600",
        color: "#c0c0c0",
    },
    data: {
        fontSize:17,
        fontWeight: "500",
        color: "#565656"
    }

})

