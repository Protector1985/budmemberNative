import { SafeAreaView, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity,StyleSheet, ActivityIndicator} from "react-native"
import React from 'react';

import { FloatingLabelInput } from 'react-native-floating-label-input';
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector,useDispatch } from "react-redux";
import { setBillingInfo } from "../../../store/billingSlice";
import { createNewSubscription, upgradeMembership } from "../../../api/nodeApi";
import Alert from "../../utils/Alert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useInitData from "../lib/useInitData";
import { states } from "./states";


export default function BillingForm({navigation}) {
    const paymentInfo = useSelector((state) => state.paymentInfoSlice)
    const { currentOnboardingStep } = useSelector((state) => state.systemSlice)
    const billingInformation = useSelector((state) => state.billingSlice)
    useSelector((state) => console.log(state.userSlice))
    const {cognitoData} = useSelector((state) => state.cognitoDataSlice)
    const {colorPalette, Email, lastChargeDate, Previous_Package_ID__c, Selected_Package_ID__c } = useSelector((state) => state.userSlice)
    const {selectedPlan, previousPlan, membershipPlans} = useSelector((state) => state.membershipPlanSlice)
    const [streetAddress, setStreetAddress] = React.useState("");
    const [city, setCity] = React.useState("");
    const [zip, setZip] = React.useState("");
    const [open, setOpen] = React.useState(false);
    
    const [state, setState] = React.useState(states[0])
    const [loading, setLoading] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false)
    const [alertMessage, setAlertMessage] = React.useState("")
    const [alertType, setAlertType] = React.useState("")
    const {fetchAllDataUpdate} = useInitData();

    const selectedPlanData = membershipPlans.filter((plan) => plan.Id === Selected_Package_ID__c)
    const previousPlanData = membershipPlans.filter((plan) => plan.Id === Previous_Package_ID__c)
    console.log(Number(previousPlanData[0].Package_Amount__c) - Number(selectedPlanData[0].Package_Amount__c))
    console.log(Number(selectedPlanData[0].Package_Amount__c))

    console.log(previousPlanData)



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
            console.log(res.data)
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

    async function updateMembership() {
        try{
      
            setLoading(true)
            const fullname = paymentInfo.holderName.trim().split(" ");
            const firstName = fullname.shift();
            const lastName = fullname.join(" ");
            const paymentPackage = {
                billingFirstName: firstName,
                billingLastName: lastName,
                cardExpirationDate: `${paymentInfo.expiration.slice(0,2)}${paymentInfo.expiration.slice(3,5)}`,
                cardNumber: paymentInfo.cardNumber.trim(),
                cvv: paymentInfo.cvv,
                MailingStreet: streetAddress,
                MailingCity: city,
                MailingState: state,
                MailingPostalCode: zip,
                email: Email,
                startDate: lastChargeDate,
                newMembershipAmount: selectedPlanData[0].Package_Amount__c, 
                dueNow: Number(previousPlanData[0].Package_Amount__c) >= Number(selectedPlanData[0].Package_Amount__c) ? 0 : Math.abs(Number(selectedPlanData[0].Package_Amount__c) - Number(previousPlanData[0].Package_Amount__c)) , //if downgrade 0 if upgrade diff between lower and higher
                packageId: selectedPlanData[0].Id,
                oldPackageId: previousPlanData[0].Id
            }

            
            //below function is used for upgrade AND downgrade 
            const res = await upgradeMembership(paymentPackage)
              if(res?.data?.success) {
                setLoading(false);
                setAlertOpen(true);
                setAlertMessage(res.data.msg)
                setAlertType("SUCCESS")  
            } else if(!res?.data?.success) {
                setLoading(false);
                setAlertOpen(true);
                setAlertMessage(res.data.msg)
                setAlertType("SUCCESS")
            }
          }catch(err) {
            console.log(err)
          }
    }

    async function handleSubmit(){
        try {
            setLoading(true);
            //conditional logic for update etc here
            if(currentOnboardingStep === "update") {
                updateMembership();
            } else if(currentOnboardingStep === "6" || "7" || "8") {
                dataSubmission()
            }
            
            
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
                <DropDownPicker
                    style={styles.dropdown}
                    dropDownDirection={"TOP"}
                    open={open}
                    value={state}
                    items={states}
                    setOpen={setOpen}
                    setValue={setState}
                    // setItems={setItems}
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