import React from 'react';
import { Dimensions, Image, View, ScrollView, StyleSheet, Text, Share, Platform } from 'react-native';
import * as geolib from 'geolib';
import BottomSheet from 'react-native-simple-bottom-sheet';
import Shortcut from './Shortcut';
import { MaterialIcons } from '@expo/vector-icons'; 
import { getForegroundPermissionsAsync } from 'expo-location';
import moment from 'moment/moment';
import initCall from '../../utils/initCall';
import openMap, {createMapLink} from 'react-native-open-maps';

const height = Dimensions.get("window").height


export default function BottomSlider({sliderData, homeLatitude, homeLongitude, hours}) {
    const {Name, Image_URL__c, BillingStreet, BillingState, BillingPostalCode, Geo_Point__Latitude__s, Geo_Point__Longitude__s, openHours} = sliderData;
    const [distance, setDistance] = React.useState(0)
    const [storeOpen, setStoreOpen] = React.useState(true)
    const [structuredHours, setStructuredHours] = React.useState({
        Monday: {open: null, close: null},
        Tuesday: {open: null, close: null},
        Wednesday: {open: null, close: null},
        Thursday: {open: null, close: null},
        Friday: {open: null, close: null},
        Saturday: {open: null, close: null},
        Sunday: {open: null, close: null}, 
    })
   
    React.useEffect(() => {
        if(Geo_Point__Latitude__s && Geo_Point__Longitude__s) {
            const distance = geolib.getPreciseDistance(
                { latitude: homeLatitude, longitude: homeLongitude },
                { latitude: Geo_Point__Latitude__s, longitude: Geo_Point__Longitude__s }
            );
            setDistance(distance * 0.000621)
        }
    },[Geo_Point__Latitude__s, Geo_Point__Longitude__s])
    

   React.useEffect(() => {
        const obj = {}
        if(hours) {
            hours.map((day) => {
                obj[day.Day_of_week__c] = {open: moment(day.Open_Time__c, "HH:mm").format("hh:mma"), close: moment(day.Close_Time__c, "HH:mm").format("hh:mma")}
               
            })

            setStructuredHours(obj)
            obj[moment().format("dddd")].open
            var format = 'hh:mma'

            beforeTime = moment(obj[moment().format("dddd")].open, format),
            afterTime = moment(obj[moment().format("dddd")].close, format);
            const isOpen = moment().isBetween(beforeTime, afterTime);
            setStoreOpen(isOpen)    
        } 
   },[hours])
    
   function onShare() {
    try {
        const shareResult = Share.share({
            url: "https://app.budmember.com",
            message: `Check out ${Name} on Budmember`
        })
        // if(shareResult.action === Share.sharedAction) {
        //     console.log("Successfully shared")
        // }else if(shareResult.action === Share.dismissedAction) {

        // }
    } catch(err) {
        console.log(err)
    }
   }

    return (
        <BottomSheet sliderMaxHeight={height} isOpen={true}>
          <ScrollView>
            <View style={styles.pictureContainer}>
                <Image style={{width: 75, height: 75}}  source={{uri: Image_URL__c}} />
            </View>
            <View style={styles.directionsContainer}>
                <View style={styles.containerLeft}>
                    <Text style={styles.text}>{Name}</Text>
                    <Text style={styles.text}>{BillingStreet}</Text>
                    <Text style={styles.text}>{`${BillingState}, ${BillingPostalCode}`}</Text>
                </View>
                <View style={styles.containerRight}>
                    <Text style={styles.miles}>{`${distance.toFixed(2)} mi`}</Text>
                </View>
            </View>
            <View style={styles.shortcutContainer}>
                <Shortcut callback={() => {
                    if(Platform.OS === "ios") {
                        openMap({provider: "apple", end: `${BillingStreet} ${BillingState} ${BillingPostalCode}`})
                    } else if(Platform.OS === "android") {
                        openMap({provider: "google", end: `${BillingStreet} ${BillingState} ${BillingPostalCode}`})
                    } else {
                        openMap({end: `${BillingStreet} ${BillingState} ${BillingPostalCode}`})
                    }
                }} name="Directions" iconName="directions" />
                <Shortcut callback={() => initCall("7609023304")} name="Phone" iconName="phone-in-talk"/>
                <Shortcut callback={onShare} name="Share" iconName="share"/>
            </View>
            <View style={styles.hoursContainer}>
                <Text style={storeOpen ? styles.openNow : styles.closedNow}>{storeOpen ? "Open Now" : "Store Closed"}</Text>
                <View style={styles.hourSub}>
                    <Text style={styles.hour}>{`Monday: ${structuredHours.Monday.open} - ${structuredHours.Monday.close}`}</Text>
                    <Text style={styles.hour}>{`Tuesday: ${structuredHours.Tuesday.open} - ${structuredHours.Tuesday.close}`}</Text>
                    <Text style={styles.hour}>{`Wednesday: ${structuredHours.Wednesday.open} - ${structuredHours.Wednesday.close}`}</Text>
                    <Text style={styles.hour}>{`Thursday: ${structuredHours.Thursday.open} - ${structuredHours.Thursday.close}`}</Text>
                    <Text style={styles.hour}>{`Friday: ${structuredHours.Friday.open} - ${structuredHours.Friday.close}`}</Text>
                    <Text style={styles.hour}>{`Saturday: ${structuredHours.Saturday.open} - ${structuredHours.Saturday.close}`}</Text>
                    <Text style={styles.hour}>{`Sunday: ${structuredHours.Sunday.open} - ${structuredHours.Sunday.close}`}</Text>
                </View> 
            </View>
          </ScrollView>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    pictureContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems:"center",
    },
    directionsContainer: {
        width: "100%",
        flexDirection:"row",
        justifyContent: "space-between",
        marginTop: 30,
    },
    miles: {
        fontWeight: "800"
    },
    text: {
        fontSize:16,
    },
    shortcutContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 30,
    },
    hoursContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30
    },
    hourSub: {
        alignItems:"flex-end",
        marginBottom: 25,
    },
    hour: {
        fontSize: 16,
        marginTop: 7,
    },
    openNow: {
        fontSize: 23,
        marginBottom: 15,
        color: "#5cb85c"
    },
    closedNow: {
        fontSize: 23,
        marginBottom: 15,
        color:"#d9534f",
    }
})