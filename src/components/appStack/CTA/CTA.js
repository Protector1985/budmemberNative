import React from 'react';
import * as Location from 'expo-location'
import { useState } from 'react';
import {Modal, View, Text, StyleSheet, Image, Dimensions, Platform, BackHandler, ActivityIndicator} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from 'react-redux';
import { closeDrawer } from '../../../store/drawerSlice';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ENDPOINT, webFrontend} from '../../../../endpoint';
import * as Linking from 'expo-linking';
import { makeRedirectUri} from 'expo-auth-session';
import Alert from '../../utils/Alert';
import ProgressBar from '../ProgressBar/ProgressBar';
import _init from '../lib/_init';

//CTA == call to action!

function IosButtons({navigation}) {
    const {colorPalette, Selected_Package_ID__c} = useSelector((state) => state.userSlice)

    const {currentOnboardingStep} = useSelector((state) => state.systemSlice)
 
  function returnPath() {
    if(!Selected_Package_ID__c) {
        return navigation.navigate("Select Plan")
    } else {
    switch(currentOnboardingStep){
      case "3": 
        return navigation.navigate("Verify Phone Number")
      case "4": 
        return navigation.navigate("Enter Code")
      case "5":
        return navigation.navigate("Payment Information")
        default:
            return navigation.navigate("Select Plan")
    }
    }
  }
    function handlePress() {
        return returnPath()
    }

    function handleCancel() {
        navigation.goBack()
    }
    return (
        <View>
            <TouchableOpacity style={[styles.Btn, {backgroundColor: colorPalette.accent}]} onPress={handlePress}>
                <Text style={styles.txt}>Continue</Text>
            </TouchableOpacity>

            <Button style={[styles.Btn, {backgroundColor: colorPalette.accentLight}]} onPress={handleCancel}>
                <Text style={styles.txt}>Cancel</Text>
            </Button>
        </View> 
    )
}

function AndroidButtons({disabled, navigation, setAlertOpen, setAlertMessage, setAlertType}) {
    const {colorPalette, Selected_Package_ID__c} = useSelector((state) => state.userSlice)
    const {currentOnboardingStep} = useSelector((state) => state.systemSlice)
 
    
    async function handlePress() {

        setAlertOpen(true);
        setAlertMessage("Google's policy prohibits in-app sales of cannabis related products and services. You will be redirected to Budmember Web!")
        setAlertType("INFO")
    
        // console.log(obj)
    }

    function handleCancel() {
        navigation.goBack()
    }

    return (
        <View>
            <View style={styles.androidOpacity}>
                <TouchableOpacity disabled={disabled} activeOpacity={1} style={[styles.BtnAndroid, {backgroundColor: colorPalette.accent}]} onPress={handlePress}>
                    <Text style={styles.txt}>Continue</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.androidOpacity}>
                <TouchableOpacity disabled={disabled} activeOpacity={1} style={[styles.BtnAndroid, {backgroundColor: colorPalette.accentLight}]} onPress={handleCancel}>
                    <Text style={styles.txt}>Cancel</Text>
                </TouchableOpacity>
            </View>
        
        </View>
    )
}


export default function CTA(props) {
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)
    const [status, requestPermission] = Location.useForegroundPermissions()
    const [alertOpen, setAlertOpen] = React.useState(false)
    const [alertMessage, setAlertMessage] = React.useState("")
    const [alertType, setAlertType] = React.useState("")
    const {colorPalette} = useSelector((state) => state.userSlice)
    const {userSlice} = useSelector((state) => state)
    const {cognitoData} = useSelector((state) => state.cognitoDataSlice);
    const {avatarUri} = userSlice
    const [initState, setInitState] = React.useState(null)

    const url = Linking.useURL();

    React.useEffect(() => {
        dispatch(closeDrawer())
   },[])



  React.useEffect(() => {
   if(Platform.OS === "android") {
    if(url) {
        setInitState({
          progress: 0.01,
          stepsLeft: 5,
          message: "Initializing"
      })
        WebBrowser.coolDownAsync()
        _init(status?.granted, userSlice, cognitoData, avatarUri, dispatch, setInitState)  
      }
   }
    
  },[url])

  React.useEffect(() => {
    if(Platform.OS === "android") {
    if(initState?.stepsLeft === 0) {
        setLoading(false)
        props.navigation.navigate("Map")
    }
}
  },[initState])


   async function openWebBrowser() {
        setLoading(true)
        const backToAppRedirect = Linking.createURL("status")
        const token = await AsyncStorage.getItem("userToken")  
        let result = await WebBrowser.openBrowserAsync(`${webFrontend}/nativeRequest/?token=${token}&redirect=${backToAppRedirect}`);
        console.log(result)
    }
   
    return( 
            <SafeAreaView style={styles.masterContainer}>
            <ActivityIndicator color={colorPalette.accentSecondary} animating={loading} style={{zIndex: 10000, position: 'absolute', alignSelf: "center", top: "50%", bottom: "50%"}} size="large" />
                <Image style={styles.logo} source={require("../../../assets/pictures/logo_white.png")} />
                <Text style={styles.text}>To get your QR code and start saving please <Text style={styles.greenText}>subscribe as a budmember</Text></Text>
                <Alert callBack={openWebBrowser}  visible={alertOpen} setVisible={setAlertOpen} message={alertMessage} type={alertType}/>
                {Platform.OS === "ios" ? 
                    <IosButtons {...props} />
                    : 
                    <AndroidButtons disabled={loading} {...props} setAlertType={setAlertType} setAlertMessage={setAlertMessage} setAlertOpen={setAlertOpen}  />
                }
                
                
            </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    modalBody: {
        flex:1,
        backgroundColor: "green",
        borderRadius: 8,
        justifyContent: "center",
    },
    Btn: {
        color: "white",
        height: 40,
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "auto",
        marginRight:"auto",
        borderRadius: 8,
        marginTop:15,
    },
    BtnAndroid: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        
    },
    androidOpacity: {
        width: "90%",
        height: 40,
        marginTop:15,
        marginLeft: "auto",
        marginRight:"auto",
    },
    txt: {
        color: "white",
        fontSize: 18,
    },
    logo: {
        width: "100%",
        height: 200,
        resizeMode: "contain"
    },
    logoContainer: {
        flex: 1,
        width: "100%",
        height: undefined,
        backgroundColor: "blue"
    },
    text: {
        fontSize: 16,
        marginLeft: "5%",
        marginRight: "5%",
        marginBottom: "8%"
    }

    
})