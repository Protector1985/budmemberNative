import {Modal, View, Text, StyleSheet, Image, Dimensions, Platform} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
//CTA == call to action!


function IosButtons({navigation}) {
    function handlePress() {
        navigation.navigate("Select Plan")
    }

    function handleCancel() {
        console.log("Cancelled")
    }
    return (
        <View>
            <Button onPress={handlePress}>
                <Text>Continue</Text>
            </Button>

            <Button onPress={handleCancel}>
                <Text>Cancel</Text>
            </Button>
        </View> 
    )
}

function AndroidButtons({navigation}) {
    function handlePress() {
        navigation.navigate("Select Plan")
    }
    function handleCancel() {
        console.log("Cancelled")
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
    }

    
})