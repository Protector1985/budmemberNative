import axios from 'axios';
import React from 'react';
import {Text, View, ScrollView, SafeAreaView, StyleSheet, Image, TouchableOpacity} from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { getCreditCardInfo } from '../../../api/nodeApi';
import { setCCInfo } from '../../../store/ccInfoSlice';
import { setCCDetails } from '../../../store/paymentInfoSlice';
import moment from 'moment'
import { FontAwesome } from '@expo/vector-icons'; 



export default function Billing({navigation}) {
    
    const {Email, currentActivePackage, selectedPackage, packagePrice, lastChargeDate, colorPalette} = useSelector((state) => state.userSlice)
    const {ccNumber, ccExp} = useSelector((state) => state.ccInfoSlice)
    const dispatch = useDispatch()
    
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
                                <Text>Feb 14, 2023</Text>
                            </View>
                        </View>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={styles.btn}>
                                <Text onPress={() => navigation.navigate("Purchase History")} style={styles.btnText}>Purchase History</Text>
                                <FontAwesome name="angle-right" size={24} color="grey" />
                            </TouchableOpacity>
                        </View>
                       
                        
                        <View style={styles.changeMembershipContainer}>
                            <TouchableOpacity style={styles.changeBtn}>
                                <Text onPress={() => navigation.navigate("Upgrade Membership")} style={styles.changeText}>Change Membership</Text>
                            </TouchableOpacity>
                            
                        </View>

                        <View style={styles.cancelBtnContainer}>
                            <TouchableOpacity style={[styles.cancelBtn, {backGroundColor: colorPalette.accent}]}>
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