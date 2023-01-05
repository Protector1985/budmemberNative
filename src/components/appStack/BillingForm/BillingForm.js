import { SafeAreaView, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity,StyleSheet, ActivityIndicator} from "react-native"
import React from 'react';

import { FloatingLabelInput } from 'react-native-floating-label-input';
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector,useDispatch } from "react-redux";
import { setBillingInfo } from "../../../store/billingSlice";
import { createNewSubscription } from "../../../api/nodeApi";
import Alert from "../../utils/Alert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useInitData from "../lib/useInitData";


export default function BillingForm({navigation}) {
    const paymentInfo = useSelector((state) => state.paymentInfoSlice)
    const billingInformation = useSelector((state) => state.billingSlice)
    const {cognitoData} = useSelector((state) => state.cognitoDataSlice)
    const {colorPalette } = useSelector((state) => state.userSlice)
    const {selectedPlan, previousPlan} = useSelector((state) => state.membershipPlanSlice)
    const [streetAddress, setStreetAddress] = React.useState("");
    const [city, setCity] = React.useState("");
    const [zip, setZip] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const items = [{label: 'CA', value: 'CA'}]
    const [state, setState] = React.useState(items[0])
    const [loading, setLoading] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false)
    const [alertMessage, setAlertMessage] = React.useState("")
    const [alertType, setAlertType] = React.useState("")
    const {fetchAllDataUpdate} = useInitData();

    //submits data package to the backend for signup
    async function dataSubmission(){
        const fullname = paymentInfo.holderName.trim().split(" ");
        const firstName = fullname.shift();
        const lastName = fullname.join(" ");
        

        try {
          setLoading(true);
          const updateObject = {
            salesForceId: cognitoData["custom:salesforceId"],
            onboardingStep: "7",
            packageId: selectedPlan,
            formDetails: {
              billingFirstName: firstName,
              billingLastName: lastName,
              billingStreet: streetAddress,
              billingCity: city,
              billingState: state,
              billingZip: zip,
              cardExpirationDate: `${paymentInfo.expiration.slice(0,2)}${paymentInfo.expiration.slice(3,5)}`,
              cardNumber: paymentInfo.cardNumber.trim(),
              cvv: paymentInfo.cvv,
              Email_Opt_Out__c: false,
              
            },
          };
          
          const res = await createNewSubscription(updateObject);
          //if credit card charge was successful
          if (res?.data?.success) {
            //update token for new field in the token
            AsyncStorage.setItem("userToken", res.data.token)
            setAlertOpen(true);
            setAlertMessage("Thank your for signing up!")
            setAlertType("SUCCESS")
     
        //if credit card charge was not successful
          }else {
            setAlertOpen(true);
            setAlertMessage(res.data.msg)
            setAlertType("ERROR")
            
          }
        } catch (error) {
            console.log(error)
          setLoading(false);
          
        } finally {
          setLoading(false);
        }
      };

    async function handleSubmit(){
        try {
            setLoading(true);
            //conditional logic for update etc here
            dataSubmission()
        } catch(err) {
            console.log(err)
        }
        
    }



    return (
        <SafeAreaView style={styles.container} >
        <ActivityIndicator color={colorPalette.accentSecondary} animating={loading} style={{zIndex: 10000, position: 'absolute', alignSelf: "center", top: "50%", bottom: "50%"}} size="large" />
        <Alert callBack={fetchAllDataUpdate} navigation={navigation} location="Map" visible={alertOpen} setVisible={setAlertOpen} message={alertMessage} type={alertType}/>
            <KeyboardAvoidingView style={styles.inputContainer}>
            <View style={styles.inputSub}>
                <FloatingLabelInput
                        label={'Street'}
                        labelStyles={styles.labelStyles}
                        containerStyles={styles.containerStyles}
                        isPassword={false}
                        value={streetAddress}
                        onChangeText={value => setStreetAddress(value)}        
                />
            </View>
            <View style={styles.inputSub}>
             
                <FloatingLabelInput
                        label={'City'}
                        containerStyles={styles.containerStyles}
                        isPassword={false}
                        value={city}
                        onChangeText={value => setCity(value)}        
                />
            </View>
            
            <View style={styles.inputSub}>
            <FloatingLabelInput
                label={'Zip'}
                containerStyles={styles.containerStyles}
                isPassword={false}
                value={zip}
                onChangeText={value => setZip(value)}        
            />
            </View>
            <View style={styles.inputSub}>
                <DropDownPicker
                    style={styles.dropdown}
                    dropDownDirection={"TOP"}
                    open={open}
                    value={state}
                    items={items}
                    setOpen={setOpen}
                    setValue={setState}
                    // setItems={setItems}
                />
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity disabled={loading} onPress={handleSubmit} style={[styles.btn, {backgroundColor: colorPalette.accent}]}>
                    <Text style={styles.btnText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            
                
            </KeyboardAvoidingView>
        
        </SafeAreaView>

    )
}


const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    inputSub: {
        width: "90%",
        marginBottom: 10
    },
    btnContainer: {
        width: "90%",
        height: 55,
        borderRadius: 8
    },
    btn: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
        justifyContent: "center",
        alignItems:"center",
    },
    btnText: {
        color:"white",
        fontWeight: "500",
        fontSize: 16,
    },
    inputContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    inputField: {
        width: "90%",
        height: 45,
        borderColor: "grey",
        borderWidth: 1,
        marginLeft:"auto",
        marginRight: "auto",
        borderRadius: 8
    },
    dropdown: {
        borderColor: "#343BA5",
        borderWidth: 1,
        borderRadius: 14,
        height: 55,
        zIndex: 1000
    },
    containerStyles: {
        borderWidth: 1,
        borderRadius: 14,
        borderColor: "#343BA5",
        height: 55,
        paddingLeft: 5
    },
    labelStyles:{
        fontSize: 30,
    }
})