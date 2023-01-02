import { useState } from 'react';
import {Modal, View, Text, StyleSheet, Image, Dimensions, Platform} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from 'react-redux';
//CTA == call to action!


function IosButtons({navigation}) {
    const {colorPalette} = useSelector((state) => state.userSlice)
    function handlePress() {
        navigation.navigate("Select Plan")
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
    function handlePress() {
        navigation.navigate("Select Plan")
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