import React from 'react';

import {Text, StyleSheet, ActivityIndicator, Image, ScrollView, KeyboardAvoidingView, View, TouchableOpacity, Linking} from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { userContact } from '../../../api/nodeApi';
import Alert from '../../utils/Alert';

export default function ContactUs({navigation}) {
    const [txt, setTxt] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [alertOpen, setAlertOpen] = React.useState(false)
    const [alertMessage, setAlertMessage] = React.useState("")
    const [alertType, setAlertType] = React.useState("")
    const color = useSelector((state) => state.userSlice.colorPalette)
    const {Email} = useSelector((state) => state.userSlice)
    

    function sendWhatsApp(){
        console.log("Clicked")
        try {
        let phoneWithCountryCode = "14242832035";
        let mobile = Platform.OS == "ios" ? phoneWithCountryCode : "+" + phoneWithCountryCode;
            let url = "whatsapp://send?phone=" + mobile;
            Linking.openURL(url)
              .then(data => {
                console.log("WhatsApp Opened");
              })
              .catch(() => {
                alert("Make sure WhatsApp installed on your device");
              });
            } catch(err) {
                console.log(err)
            }
      };
    

    async function submitMessage() {
        setLoading(true)
          //call API and Submit data
          try{
            let res = await userContact({from:Email,message: txt})
            if (res?.data?.success) {
              // notification("We recieved your message successfully","success","Message Sent");
                setAlertOpen(true);
                setLoading(false)
                setAlertMessage("Your message was sent to the support team")
                setAlertType("SUCCESS")
                
            } else {
                setAlertOpen(true);
                setLoading(false)
                setAlertMessage("Your message was not sent. Please close the app and try again")
                setAlertType("ERROR")
            }
          }catch(err){
            notification("Error submitting your message","danger","Message not Sent");
          }finally{
            setLoading(false);
          }
        }

    return (
        <SafeAreaView style={styles.container}>
            <ActivityIndicator color={color.accentSecondary} animating={loading} style={{zIndex: 10000, position: 'absolute', alignSelf: "center", top: "50%", bottom: "50%"}} size="large" />
            <Alert navigation={navigation} location="Map" visible={alertOpen} setVisible={setAlertOpen} message={alertMessage} type={alertType}/>
        <ScrollView>
            <KeyboardAvoidingView>
                <View>
                    <TouchableOpacity onPress={sendWhatsApp}>
                        <Image style={styles.img} source={require("../../../assets/pictures/logo_white.png")} />
                    </TouchableOpacity>
                </View>
               
            <View style={styles.contactUsContainer}>
                <Text style={styles.contactUsHeadline}>Contact Us</Text>
                <View style={styles.addressItems}><Text style={styles.boldItem}>Name: </Text><Text style={styles.addressText}>My Kinda Media Corp</Text></View>
                <View style={styles.addressItems}><Text style={styles.boldItem}>Street Address: </Text><Text style={styles.addressText}>17328 Ventura Blvd Ste #175</Text></View>
                <View style={styles.addressItems}><Text style={styles.boldItem}>City/State: </Text><Text style={styles.addressText}>Los Angeles, California</Text></View>
                <View style={styles.addressItems}><Text style={styles.boldItem}>Country/Postal Code: </Text><Text style={styles.addressText}>United States, 91316</Text></View>
                <View style={styles.addressItems}><Text style={styles.boldItem}>Telephone: </Text><Text style={styles.addressText}>888.BUD.2035</Text></View>
            </View>
            <View style={styles.whatsAppContainer}>
                <Text style={styles.whatsAppStyle}>You can contact us on WhatsApp</Text>
                <View><FontAwesome5 name="whatsapp-square" size={24} color="#25D366" /></View>
            </View>
            <View style={styles.helpImproveContainer}>
                <Text style={styles.helpImprove}>Let us know how we can improve!</Text>
            </View>
            <View style={styles.textFieldContainer}>
                <Text style={styles.textFieldHeadline}>How can we help you</Text>
                <TextInput multiline={true} onChangeText={(text) => setTxt(text) } value={txt} style={styles.textField} editable maxLength={300} />
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity disabled={loading} onPress={submitMessage} style={styles.btn}>
                    <Text style={styles.btnTxt}>Send Message</Text>
                </TouchableOpacity>
                
            </View>
      
            </KeyboardAvoidingView>
            
            </ScrollView>
        </SafeAreaView>
       
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "flex-start",
    },
    img: {
        resizeMode: "contain",
        width: "100%",
        height: 110,
    },
    contactUsContainer: {
        width: "90%",
        height: undefined,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginRight: 'auto',
        marginLeft: "auto",
        marginBottom: 25,
    },
    contactUsHeadline: {
        fontWeight: "600",
        fontSize: 20,
        marginTop: 30,
        marginBottom: 15,
    },
    whatsAppContainer: {
        width: "90%",
        marginLeft: "auto",
        marginRight:"auto",
        flexDirection: "row",
        alignItems: "center",
    },
    whatsAppStyle: {
        fontSize: 17,
        fontWeight: "500",
        marginRight: 15,
    },
    addressItems: {
        flexDirection: "row",
    },
    boldItem: {
        fontWeight: "600",
        fontSize:16,
    },
    addressText: {
        fontSize: 15,
    },
    textField: {
        width: "100%",
        height: "100%",
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 8,
   
    },
    helpImproveContainer: {
        width: "90%",
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: 15,
        marginBottom: 15,
    },
    helpImprove: {
        fontSize: 22,
    },
    textFieldContainer: {
        width: "90%",
        height: "30%",
        marginLeft:"auto",
        marginRight: "auto",
        marginBottom: 35,
       
    },
    textFieldHeadline: {
        color: "grey",
    },
    btnContainer: {
        width: "90%",
        height: 50,
        marginRight: "auto",
        marginLeft:"auto",
    },
    btn: {
        width: "100%",
        height: "100%",
        backgroundColor: "#2CA491",
        borderRadius: 8,
        justifyContent: "center",
        alignItems:"center",
    },
    btnTxt: {
        color: "white",
        fontSize: 17,
        fontWeight: "600"
    }
})