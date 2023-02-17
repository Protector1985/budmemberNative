import axios from 'axios';
import React from 'react';
import {Text, View, ScrollView, SafeAreaView, StyleSheet, Image, TouchableOpacity, ActivityIndicator} from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { cancelSubscription, getCreditCardInfo } from '../../../api/nodeApi';
import { setCCInfo } from '../../../store/ccInfoSlice';
import { setCCDetails } from '../../../store/paymentInfoSlice';
import moment from 'moment'
import { FontAwesome } from '@expo/vector-icons'; 
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import { AntDesign } from '@expo/vector-icons';

function ConfirmCancelModal({setLoading, lastChargeDate, open, setOpen, subId, email, navigation}) {
    const [message, setMessage] = React.useState(`If you cancel your membership, you will lose access to member benefits on ${moment(lastChargeDate).add(1, "Months").format("MM-DD-YYYY")}`)
    async function handleCancel() {
        setLoading(true)
        try {
            const res = await cancelSubscription(subId, email, lastChargeDate)

            if(res.data === "SUCCESS") {
                navigation.navigate("appStack", {screen:"Map"})
                setLoading(false)
            } else {
                setMessage("Something went wrong. Your request could not be processed and your subscription was not cancelled - email contact@budmember.com")
                setLoading(false)
            }
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <FancyAlert
            style={{backgroundColor: "#EEEEEE"}}
            icon={
                <View style={[styles.warning, { borderRadius: 32 } ]}>
                    <AntDesign name="exclamation" size={36} color="#FFFFFF" />
                </View>
            }
            visible={open}
        >
            <View style={styles.cancelModalContainer}>
                <Text style={styles.cancelModalText}>{message}</Text>
            
                <View style={styles.cancelButtons}>
                    
                    <View style={[styles.cancelBtnInModal, {backgroundColor:"#2CA491"}]}>
                        <TouchableOpacity onPress={() => setOpen(false)} style={styles.cancelBtnOpacity}>
                            <Text style={styles.cancelButtonsText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                
                    <View style={[styles.cancelBtnInModal, {backgroundColor:"#86BDB2"}]}>
                        <TouchableOpacity onPress={() => handleCancel()} style={styles.cancelBtnOpacity}>
                            <Text style={styles.cancelButtonsText}>Unsubscribe</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        
        </FancyAlert>
    )
}


export default function Billing({navigation}) {
    
    const {Email, currentActivePackage, selectedPackage, packagePrice, lastChargeDate, colorPalette} = useSelector((state) => state.userSlice)
    const {cognitoData} = useSelector((state) => state.cognitoDataSlice)
    const {ccNumber, ccExp} = useSelector((state) => state.ccInfoSlice)
    const dispatch = useDispatch()
    const [cancelOpen, setCancelOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    async function fetchCCInfo(Email, cancelToken) {
            const res = await getCreditCardInfo(Email, cancelToken);
            dispatch(setCCInfo({ccNumber: res.data.data.ccNumber.split("").join(' ').replace("x x x x x x x x x x x", "* * * * * * * * "), ccExp: res.data.data.ccExpiration}))  
    }

    
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


     


    return (
        <SafeAreaView style={styles.container}>
        <ActivityIndicator color={"#2CA491"} animating={loading} style={{zIndex: 10000, position: 'absolute', alignSelf: "center", top: "50%", bottom: "50%"}} size="large" />
        <ConfirmCancelModal setLoading={setLoading} email={Email} subId={cognitoData["custom:authorizeSubId"]} setOpen={setCancelOpen} open={cancelOpen} lastChargeDate={lastChargeDate} />
        <Image style={styles.img} source={require("../../../assets/pictures/logo_white.png")} />
            <ScrollView style={styles.scrollContainer}>
        
                <View style={styles.paymentContainer}>
                    <Text style={styles.headline}>Payment Method</Text>
                    <View style={styles.paymentMethod}>
                        <Text style={styles.boxText}>{ccNumber}</Text>
                    </View>
                </View>
                {currentActivePackage === selectedPackage ? 
                    <View style={styles.subscriptionContainer}>
                        <Text style={styles.subscriptionHeadline}>Subscription Details</Text>
                        <View style={styles.subscriptionDetails}>
                            <Text style={styles.membershipName}>{currentActivePackage}</Text>
                        <Text style={styles.membershipDate}>{moment(lastChargeDate).format('dddd MMMM DD YYYY')}</Text>
                            <Text style={styles.cost}>{`$${packagePrice} / month`}</Text>
                        </View>
                    </View>
                    
                    
                    : 
                    
                    <View style={styles.subscriptionContainerChange}>
                        <Text style={styles.subscriptionHeadline}>Subscription Details</Text>
                        <View style={styles.subscriptionDetails}>
                            <Text style={styles.membershipTransitionName}>Active Package: {currentActivePackage}</Text>
                            <Text style={styles.membershipTransitionNameFuture}>Future Package: {selectedPackage}</Text>
                            <Text style={styles.cost}>{`$${packagePrice} / month`}</Text>
                            <Text style={styles.membershipChangeDate}>{moment(lastChargeDate).add("1", "months").format('dddd MMMM DD YYYY')}</Text>
                    </View>
                </View>}

                    <View style={styles.actionContainer}>
                    <View style={styles.btnContainer}>
                            <View style={styles.btn}>
                                <Text style={styles.btnText}>Next Billing Cycle</Text>
                                <Text>{moment(lastChargeDate).add(1, "Months").format("MMM DD,YYYY")}</Text>
                            </View>
                        </View>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={styles.btn}>
                                <Text onPress={() => navigation.navigate("Purchase History")} style={styles.btnText}>Purchase History</Text>
                                <FontAwesome name="angle-right" size={24} color="grey" />
                            </TouchableOpacity>
                        </View>
                       
                        
                        <View style={styles.changeMembershipContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate("Upgrade Membership")} style={styles.changeBtn}>
                                <Text style={styles.changeText}>Change Membership</Text>
                            </TouchableOpacity>
                            
                        </View>

                        <View style={styles.cancelBtnContainer}>
                            <TouchableOpacity onPress={() => setCancelOpen(true)} style={[styles.cancelBtn, {backGroundColor: colorPalette.accent}]}>
                                <Text style={styles.cancelBtnText}>Cancel Membership</Text>
                            </TouchableOpacity>
                        </View>
                        
                        
                    </View>  
                    
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    cancelModalText: {
        marginLeft: 10,
        marginRight: 10,
        textAlign: "justify",
        fontSize: 18

    },
    cancelButtonsText: {
        color:"white",
        letterSpacing: 2,
    },
    cancelModalContainer: {
        flexGrow: 1, 
        justifyContent: "space-between",
    },
    cancelButtons: {
        flexDirection:"row",
        justifyContent:"space-around"
    },
    cancelBtnInModal: {
        height: 40,
        width: "42%", 
        borderRadius: 8,
        marginTop:"10%",
        marginBottom:"10%",
    },
    cancelBtnOpacity: {
        height: 40,
        width: "100%", 
        justifyContent:"center",
        alignItems: "center",
        backgroundcolor:"blue",
    },
    warning: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E4A11B',
        width: '100%',
    },
    changeMembershipContainer: {
        backgroundColor:"#2CA491",
        height: 60,
        borderRadius: 8,
        width:"90%",
        marginLeft:"auto",
        marginRight:"auto",
    },
    changeText: {
        color:"white",
        fontSize: 17,
    },
    scrollContainer: {
        minHeight: "100%",
    },
    changeBtn: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems:"center",
    },
    changeMembershipCont: {
        width:"90%",
        height: 80,
    },
    cancelBtnContainer: {
        marginTop:"20%",
        marginLeft:"5%"
    },
    cancelBtnText: {
        color:"#303f9f",
        fontSize:16
    },
    img: {
        width: "90%",
        height: 80,
        resizeMode: "contain",
    },
    paymentContainer: {
        marginLeft: "auto",
        marginRight: "auto",
        width:"90%",
        height: 120,
    },
    paymentMethod: {
        width: "100%",
        height: "100%",
        backgroundColor: "#EDF8F3",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        
    },
    headline: {
        fontSize: 20,
        fontWeight: "600"
    },
    boxText: {
        fontSize: 25,
    },
    subscriptionContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#EDF8F3",
        borderRadius: 8,
    },
    subscriptionDetails: {
        width: "100%",
        height: "100%",
        backgroundColor: "#66CFD1",
        borderRadius: 8,
        justifyContent: "center",
        paddingLeft: 30,
        justifyContent:"space-around",
        paddingTop: 13,
        paddingBottom:13
    },
    subscriptionContainer: {
        marginTop: 50,
        width: "90%",
        height: 120,
        marginLeft: "auto",
        marginRight: "auto",
    },
    subscriptionContainerChange: {
        marginTop: 50,
        width: "90%",
        height: 150,
        marginLeft: "auto",
        marginRight: "auto",
    },
    subscriptionHeadline: {
        fontSize: 20,
        fontWeight: "600"
    },
    membershipDate: {
        color:"whitesmoke",
        fontSize: 18,
        fontWeight: "600"
    },
    membershipName: {
        color: "#303f9f",
        fontSize: 21,
        fontWeight: "700",
    },
    membershipTransitionName: {
        color: "#303f9f",
        fontSize: 17,
        fontWeight: "400",
    },
    membershipTransitionNameFuture: {
        color: "#303f9f",
        fontSize: 18,
        fontWeight: "600",
    },
    cost: {
        color: "#303F9F",
        fontSize: 22,
        fontWeight: "500"
    },
    btnContainer: {
        width: "90%",
        height: 50,
        marginLeft: "auto",
        marginRight: "auto",
        
    },
    btn: {
        flexDirection: "row",
        justifyContent: "space-between",

    },
    btnText: {
        fontSize:18,
        fontWeight: "600",
        color: "#303f9f",
       
    },
    actionContainer: {
        marginTop: "15%",
    },
    membershipChangeDate:{
        color: "whitesmoke",
        fontSize: 16,
    }

})