import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Touchable, ScrollView} from 'react-native'
import { useDispatch, useSelector } from "react-redux"
import { closeDrawer } from '../../../store/drawerSlice';
import { AntDesign } from '@expo/vector-icons'; 
import moment from 'moment/moment';


export default function UpgradeInfo({navigation}) {
   
    const {selectedPlan, previousPlan, membershipPlans} = useSelector((state) => state.membershipPlanSlice)
    const {colorPalette, Email, lastChargeDate, Previous_Package_ID__c} = useSelector((state) => state.userSlice)
    const selectedPlanData = membershipPlans.filter((plan) => plan.Id === selectedPlan)
    const previousPlanData = membershipPlans.filter((plan) => plan.Id === Previous_Package_ID__c)
    
    const dispatch = useDispatch();
    
    //closes drawer on page change
    React.useEffect(() => {
      dispatch(closeDrawer())
    },[])

    const dueNow = Number(previousPlanData[0].Package_Amount__c) >= Number(selectedPlanData[0].Package_Amount__c) ? 0 : Number(selectedPlanData[0].Package_Amount__c) - Number(previousPlanData[0].Package_Amount__c)

    function returnText() {
        if(dueNow === 0) {
            return <Text style={styles.txt}>By downgrading, you will lose the best rates available in the selected stores. If you decide to downgrade, you will not get charged now and your new membership will start on <Text style={styles.bold}>{`${moment(lastChargeDate).add("1", "months").format("MM-DD-2023")}`}</Text> </Text>
        } else if(dueNow > 0) {
            return <Text style={styles.txt}>You will be charged <Text style={styles.bold}>{`$${dueNow}`}</Text> during checkout. Your new benefits become available instantly.</Text>
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.contentContainer}>
                <AntDesign style={styles.exclaim} name="exclamationcircleo" size={80} color="black" /> 
                {returnText()}
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("Payment Method")} style={[styles.btn, {backgroundColor: colorPalette.accent}]}>
                    <Text style={styles.text}>Continue</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgrounColor: "white",
    },
    bold: {
        fontWeight: "800",
    },
    txt: {
        fontSize: 24,
        marginBottom: "15%",
        textAlign: "center",
    },
    exclaim: {
        marginLeft:"auto",
        marginRight: "auto",
        marginTop: "15%",
        marginBottom: "15%",
    },
    contentContainer: {
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
    },
    btnContainer: {
        width: "90%",
        height: 70,
        marginLeft: "auto",
        marginRight: "auto",
    },
    btn: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    text: {
        color: "white",
        fontSize: "18",

    }
})