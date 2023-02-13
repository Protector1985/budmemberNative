import axios from 'axios';
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Touchable, Alert} from "react-native";
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
// import Alert from '../../utils/Alert';
import _init from '../lib/_init';
import changeWithCardOnFile from './lib/changeWithCardOnFile';
import submitExisting from './lib/changeWithCardOnFile';
import * as Location from "expo-location"

function Card({index, selectionIndex, setSelectionIndex, method, ccNumber}) {
    
    const {colorPalette} = useSelector((state) => state.userSlice)
    function returnCard() {
        switch(method) {
            case "ADD":
                return "Add New Card";
            case "EXISTING":
                return ccNumber
            
        }
    }


    return (
        <View onPress={() => setSelectionIndex(index)} style={styles.cardContainer}>
            <TouchableOpacity style={[styles.btn,{backgroundColor: selectionIndex === index ? colorPalette.accent : colorPalette.cards}]} onPress={() => setSelectionIndex(index)}>
                <Text style={styles.cardText}>{returnCard()}</Text>
            </TouchableOpacity>
            
        </View>
    )
}


export default function SelectPayment({navigation}) {
    const [paymentMethods, setPaymentMethods] = React.useState([])
    const {selectedPlan,  membershipPlans} = useSelector((state) => state.membershipPlanSlice)
    useSelector((state) => console.log(state.membershipPlanSlice))
    const paymentInfo = useSelector((state) => state.paymentInfoSlice)
    const {locationPermission} = useSelector((state) => state.permissionSlice)
    const {cognitoData} = useSelector((state) => state.cognitoDataSlice)
    const [status, requestPermission] = Location.useForegroundPermissions()
    const {userSlice} = useSelector((state) => state)
    const {avatarUri} = userSlice
    const dispatch = useDispatch()
    const [selectionIndex, setSelectionIndex] = React.useState(0)
    const [alertOpen, setAlertOpen] = React.useState(false)
    const [alertMessage, setAlertMessage] = React.useState("")
    const [alertType, setAlertType] = React.useState("")
   
    const [loading, setLoading] = React.useState(false);
    const {
        Email, 
        packageId,
        lastChargeDate,
        colorPalette, 
        Selected_Package_ID__c, 
        Previous_Package_ID__c} = useSelector((state) => state.userSlice)
    const {ccNumber} = useSelector((state) => state.ccInfoSlice)
    const [initState, setInitState] = React.useState({
        progress: 0.01,
        stepsLeft: 5,
        message: "Initializing"
    })
    
    async function fetchCCInfo(Email, cancelToken) {
        const res = await getCreditCardInfo(Email, cancelToken);
        dispatch(setCCInfo({ccNumber: res.data.data.ccNumber.split("").join(' ').replace("x x x x x x x x x x x", "* * * * * * * * "), ccExp: res.data.data.ccExpiration}))  
    }
    

    React.useEffect(() => {
        if(ccNumber) {
            setPaymentMethods(() => [{type: "EXISTING"}, {type:"ADD"}])
        } else {
            setPaymentMethods(() => [{type:"ADD"}])
        }
    }, [])


React.useEffect(() => {
    //canceltoken for cleanup
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source()
    const cancelToken = source.token
    //fetch
    if(Email) {
        fetchCCInfo(Email, cancelToken)
    }
    //cleanup
    return () => {
        source.cancel()
    }
  }, [Email])

  async function handlePress() {
    setLoading(true)
    switch(paymentMethods[selectionIndex].type) {
      
        case "ADD":
            return navigation.navigate("Payment Information")
        case "EXISTING":
           
            const res = await changeWithCardOnFile(Email, selectedPlan, Previous_Package_ID__c, membershipPlans)
            if(res.data.success) {
                setAlertOpen(true);
                setAlertMessage("Your plan was successfully changed")
                setAlertType("SUCCESS")
                setLoading(false)
                _init(status?.granted, userSlice, cognitoData, avatarUri, dispatch, setInitState)  
            } else {
                setAlertOpen(true);
                setAlertMessage(res.data.msg)
                setAlertType("ERROR")
                setLoading(false)
            }
                if(res) {
                    setLoading(false)
                }
            break;
    }
  }


  


 


 

  
   
    
    
    

  

  

    return(
        <View style={styles.container}>
        <ActivityIndicator color={colorPalette.accentSecondary} animating={loading} style={{zIndex: 10000, position: 'absolute', alignSelf: "center", top: "50%", bottom: "50%"}} size="large" />
            <View style={styles.headerContainer}>
            {/*<Alert callBack={() => _init(locationPermission, userSlice, cognitoData, avatarUri, dispatch, setInitState)} navigation={navigation} location="Map" visible={alertOpen} setVisible={setAlertOpen} message={alertMessage} type={alertType}/>*/}
                <Text style={styles.headline}>Select a payment method</Text>
            </View>
            <FlatList
                data={paymentMethods}
                renderItem={({item, index}) => <Card  selectionIndex={selectionIndex} ccNumber={ccNumber} index={index} setSelectionIndex={setSelectionIndex} method={item.type}/>}
            />
            <View style={styles.btnContainer}>
                <TouchableOpacity disabled={loading} onPress={handlePress} style={[styles.continueBtn, {backgroundColor: colorPalette.accent}]}>
                    <Text style={styles.continueText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    btn: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    headline: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
    },
    cardText: {
        color: "white",
        fontSize: 23,
    },
    cardContainer: {
        width: "90%",
        height: 90,
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
    },
    headerContainer: {
        width:"90%",
        marginLeft: "auto",
        marginRight: "auto",
    },
    btnContainer: {
        width: "90%",
        height: 65,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 25,
    },
    continueBtn: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },
    continueText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600"

    }

})