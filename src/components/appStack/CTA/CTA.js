import React from 'react';

import { useState } from 'react';
import {Modal, View, Text, StyleSheet, Image, Dimensions, Platform, Linking} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from 'react-redux';
import { closeDrawer } from '../../../store/drawerSlice';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ENDPOINT from '../../../../endpoint';

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

function AndroidButtons({navigation}) {
    const {colorPalette, Selected_Package_ID__c} = useSelector((state) => state.userSlice)
    const {currentOnboardingStep} = useSelector((state) => state.systemSlice)
 
    // function returnPath() {
    //     if(!Selected_Package_ID__c) {
    //         return navigation.navigate("Select Plan")
    //     } else {
    //     switch(currentOnboardingStep){
    //       case "3": 
    //         return navigation.navigate("Verify Phone Number")
    //       case "4": 
    //         return navigation.navigate("Enter Code")
    //       case "5":
    //         return navigation.navigate("Payment Information")
    //         default:
    //             return navigation.navigate("Select Plan")
    //     }
    //     }
    //   }

    async function handlePress() {
        const token = await AsyncStorage.getItem("userToken")
        Linking.openURL(`https://dc7ed13c0fa3.ngrok.io/nativeRequest/?token=${token}`)
          

        
        
        // console.log(obj)
    }

    function handleCancel() {
        navigation.goBack()
    }

    return (
        <View>
            <TouchableOpacity onPress={handlePress}>
                <Text>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel}>
                <Text>Cancel</Text>
            </TouchableOpacity>
        
        </View>
    )
}


export default function CTA(props) {
    const dispatch = useDispatch()
    
    
    React.useEffect(() => {
        dispatch(closeDrawer())
   },[])

    return( 
        
            <SafeAreaView style={styles.masterContainer}>
                <Image style={styles.logo} source={require("../../../assets/pictures/logo_white.png")} />
                <Text style={styles.text}>To get your QR code and start saving please <Text style={styles.greenText}>subscribe as a budmember</Text></Text>
                
                {Platform.OS === "ios" ? 
                    <IosButtons {...props} />
                    : 
                    <AndroidButtons {...props}  />
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