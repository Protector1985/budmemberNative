import React from 'react';
import {View, Text, Image, StyleSheet, TextInput, Dimensions, ActivityIndicator} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { findMemberByPhone, updateUser } from '../../../api/nodeApi';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Alert from '../../utils/Alert';
import { setPhoneNumber } from '../../../store/userSlice';


const width = Dimensions.get('window').width


function Button({loading, setLoading, phoneNumber, setAlertOpen, setAlertMessage, setAlertType, navigation}) {
    const {colorPalette} = useSelector((state) => state.userSlice)
    let submissionNumber = ''
    const dispatch = useDispatch();
    if( phoneNumber[0] === "1") {
        submissionNumber = `+${phoneNumber}`
    } else {
        submissionNumber = `+1${phoneNumber}`
    }

    // const member = await findMemberByPhone(searchObj)
    // if(!member.data.exists) {
    
    async function handleSubmit() {
        try {
            setLoading(true)
            const res = await findMemberByPhone({phone: submissionNumber})
            console.log(res.data)
            //if the user is already in the system
            if(res.data.exists) {
                setLoading(false)
                setAlertMessage("This phone number is already registered")
                setAlertType("ERROR")
                setAlertOpen(true)
            } else {
                const usr = await updateUser({
                    update: { MobilePhone: submissionNumber },
                    onboardingStep: '4',
                  });
                  if(usr.data.success) {
                    setAlertMessage("Message Sent")
                    setAlertType("SUCCESS")
                    setAlertOpen(true)
                    dispatch(setPhoneNumber(submissionNumber)) 
                    setLoading(false)
                  }
            }

        }catch(err) {
            setAlertMessage("Server Error. Please try again later")
            setAlertOpen(true)
            setLoading(false)
        }  
    }
    
    return (
        <TouchableOpacity disabled={loading} onPress={handleSubmit} style={[styles.customButton, {backgroundColor: colorPalette.accent}]}>
            <Text style={styles.btnText}>Continue</Text>
        </TouchableOpacity>

    )
}

export default function EnterPhoneNumber({navigation}) {
    const [phoneNumber, setPhoneNumber] = React.useState("")
    const [sanitizedNumber, setSanitizedNumber] = React.useState("")
    const [alertOpen, setAlertOpen] = React.useState(false)
    const [alertMessage, setAlertMessage] = React.useState("")
    const [alertType, setAlertType] = React.useState("")
    const [loading, setLoading] = React.useState(false);
    const {colorPalette} = useSelector((state) => state.userSlice)
    
    function onTextChange(text) {
        var cleaned = ('' + text).replace(/\D/g, '')
        setSanitizedNumber(cleaned)
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            var intlCode = (match[1] ? '+1 ' : ''),
                number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    
            setPhoneNumber(number)
            return;
        } 
        setPhoneNumber(text)
    }


    
    
    return (
        
        <SafeAreaView style={styles.masterContainer}>
        <ActivityIndicator color={colorPalette.accentSecondary} animating={loading} style={{zIndex: 10000, position: 'absolute', alignSelf: "center", top: "50%", bottom: "50%"}} size="large" />
        <KeyboardAwareScrollView style={styles.keyboardScrollView}>
            <Image style={styles.logo} source={require("../../../assets/pictures/phoneverify.jpg")} />
            <View style={styles.inputContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.headline}>Enter your phone number</Text>
                    <Text style={styles.expl}>{`We will send a code (via SMS text message) to your phone number`}</Text>
                </View>
                  <TextInput keyboardType='phone-pad' style={styles.inputField} value={phoneNumber} onChangeText={onTextChange} />
                </View>


                <Alert location="Enter Code" navigation={navigation} visible={alertOpen} setVisible={setAlertOpen} message={alertMessage} type={alertType}/>

                <Button loading={loading} setLoading={setLoading} setAlertType={setAlertType} setAlertOpen={setAlertOpen} setAlertMessage={setAlertMessage} phoneNumber={sanitizedNumber}/>
        </KeyboardAwareScrollView>
            </SafeAreaView>
            
    )
}

const styles = StyleSheet.create({
    masterContainer: {
        flex: 1,
        backgroundColor: "white",
    },
    keyboardScrollView: {
      
    },
    logo: {
        width: "85%",
        height: 280, 
        marginBottom: "10%",
        marginLeft: "auto",
        marginRight: "auto",
    },
    inputContainer: {
        width: "100%",
        alignItems: "center",
    },
    inputField: {
        width: "90%",
        borderColor: "grey",
        borderWidth: 1,
        fontSize: 20,
        height: 50,
        borderRadius: 8,
        marginTop: "12%",
        marginBottom: "7%",
    },
    textContainer: {
        width: "80%",
        alignItems: "center",
    },
    headline: {
        fontWeight: "700",
        fontSize: 25,
        marginBottom: 10
    },
    expl:{
        textAlign: "center",
        width: "90%",
        fontSize: 17,
        fontWeight: "500"
    },
    customButton: {
        width: "90%",
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
    },
    btnText: {
        color: "white",
        fontSize: 16,
    }
})