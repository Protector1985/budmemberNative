import React from 'react';
import {View, StyleSheet, SafeAreaView, Text, Image, TouchableOpacity, FlatList, ScrollView, Platform, Alert} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import SearchBar from "react-native-dynamic-search-bar";
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import _ from "lodash"
import BottomSlider from '../BottomSlider/BottomSlider'
import { fetchDispensary, getVerificationEmail } from '../../../api/nodeApi';
import SideDrawer from '../SideDrawer/SideDrawer';
import SideMenu from 'react-native-side-menu';
import { closeDrawer } from '../../../store/drawerSlice';

import {setShowEmailModal} from '../../../store/systemSlice';
import { setLocation } from '../../../store/locationSlice';
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { color } from 'react-native-reanimated';
import * as Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import { webFrontend } from '../../../../endpoint';


const Drawer = createDrawerNavigator();


function SearchResultCard({image, name, street, city, zip, state}) {
    return (
        <View style={styles.searchResultCard}>
            <View style={styles.cardLeft}>
                <Image style={{width: 50, height: 50}} source={{uri: image}} />
            </View>
            <View style={styles.cardRight}>
                <Text style={styles.cardName}>{name}</Text>
                <Text style={styles.cardAddress}>{street}</Text>
                <Text style={styles.cardAddress}>{`${city}, ${state}, ${zip}`}</Text>
                
            </View>

        </View>

    )
}

function EmailAlert({submits, setSubmits,handleEmailResend, colorPalette, setAlertOpen, alertOpen}) {
    
    return (
        <FancyAlert
            style={{backgroundColor: "#EEEEEE"}}
            icon={
                <View style={[styles.emailAlert, { borderRadius: 32 } ]}>
                    <MaterialCommunityIcons name="email-alert" size={32} color="white" />
                </View>
            }
            visible={alertOpen}
        >
            <ScrollView 
                style={{height: "39%"}}
                contentContainerStyle={{flexGrow: 1, justifyContent: "space-between"}}
            >
            
            <View style={styles.emailAlertContainer}>
                <Text style={styles.emailAlertHeadline}>Please verify your email!</Text>
                <Text style={styles.emailAlertMessage}>Your email is not verfied. You will not be able to recover this account if you forget your password.</Text>
            
            </View>

            <View style={{marginBottom:0}}>
                    {submits < 3 ? <View style={[styles.customBtnContainer, { marginBottom: 10, backgroundColor: "#2CA491"}]}>
                                <TouchableOpacity onPress={handleEmailResend} style={styles.customBtn}>
                                    <Text style={{color:"white", fontSize: 16, fontWeight: "500"}}>Send Verification Email</Text>
                                </TouchableOpacity>
                            </View> : null}

                            <View style={[styles.customBtnContainer, submits >= 3 ? {marginTop: 35, marginBottom:"15%", backgroundColor: "#2CA491"} : {marginBottom:"15%", backgroundColor: "#2CA491"}]}>
                                    <TouchableOpacity onPress={() => setAlertOpen(false)} style={styles.customBtn}>
                                        <Text style={{color:"white", fontSize: 16, fontWeight: "500"}}>Dismiss</Text>
                                    </TouchableOpacity>
                            </View>
                
                </View>
                </ScrollView>
        </FancyAlert>
    )
}

export default function MapScreen({navigation, initProgress}) {
   const [searchText, setText] = React.useState("")
   const [alertOpen, setAlertOpen] = React.useState(false)
   const [alertMessage, setAlertMessage] = React.useState("")
   const [alertType, setAlertType] = React.useState("")
   const [sliderData, setSliderData] = React.useState({})
   const {latitude, longitude} = useSelector((state) => state.locationSlice)
   const {cognitoData} = useSelector((state) => state.cognitoDataSlice)
   const {showEmailModal} = useSelector((state) => state.systemSlice)
   const {dispensaries} = useSelector((state) => state.dispensariesSlice)
   const {open} = useSelector((state)=> state.drawerSlice)
   const {Email_Verified__c, colorPalette, Email, Membership_Status__c} = useSelector((state)=> state.userSlice)
   const [hours, setHours] = React.useState()
    const [sliderOpen, setSliderOpen] = React.useState(true)
   const dispatch = useDispatch()
   const menu = <SideDrawer navigation={navigation} />
   const [alertHtml, setAlertHtml] = React.useState(null)
   const [submits, setSubmits] = React.useState(0)
   const [loading,setLoading] = React.useState(false)
   const [filteredDispensaries, setFilteredDispensaries] = React.useState([])
   const [provider, setProvider] = React.useState(null)
   const alertRef = React.useRef();
    const panelRef = React.useRef();
   //closes drawer in case it is open
   React.useEffect(() => {
        dispatch(closeDrawer())
   },[])


   //filters dispenaries for display
   function handleInput(text) {
    setText(text)
    const mutableState = _.cloneDeep(Object.values(dispensaries)) //Object.values(dispensaries)
    const filtered = mutableState.filter((item) => item.Name.toLowerCase().includes(text.toLowerCase()));
    setFilteredDispensaries(filtered)
  };

  //Removes filtered dispensaires from screen if user deletes all input
  React.useEffect(() => {
    if(searchText.length === 0) {
        setFilteredDispensaries([])
    }
  },[searchText])

   async function handleEmailResend() {
    try {
        setSubmits((prevVal) => prevVal + 1)
        setLoading(true)
        const res = await getVerificationEmail(Email)
        if(res.data === "SUCCESS") {
            dispatch(setShowEmailModal(false))
            setAlertOpen(false)
            setLoading(false)
        } else if(res.data === "ERROR") {
            dispatch(setShowEmailModal(false))
            setAlertOpen(false)
            setLoading(false)
    } 
    }catch(err) {
        console.log(err)
    }     
}

   React.useEffect(() => {
            if(showEmailModal) {
            if(Email_Verified__c != undefined) { 
                if(Email_Verified__c === false) {
                    setAlertOpen(true);
                   
                }
            }
        } 
   },[Email_Verified__c])

   async function handlePress(item) {
    try {
        setSliderData(dispensaries[item.Name])
        const supp = await fetchDispensary(item.Id)
        setHours(supp?.data?.data[0].Dispensary_Open_Hours__r.records)
    }catch(err) {
        console.log(err)
    }
   }

   async function browserRedirect() {
   
        try {
            const backToAppRedirect = Linking.createURL("status")
            const token = await AsyncStorage.getItem("userToken")  
            let result = await WebBrowser.openBrowserAsync(`${webFrontend}/nativeRequest/?token=${token}&redirect=${backToAppRedirect}`);
            
        } catch (err) {
            console.log(err)
        }

   }

   React.useEffect(() => {
        if(cognitoData?.sub) {
           
            // console.log(providerProcessor())
            if(cognitoData["custom:salesforceRole"] === "Budtender") {
                Alert.alert("Hello Budtender, you will be redirected to the web version of this app shortly. Please wait...")
                setTimeout(() => {
                    browserRedirect();
                }, 4000)
                
               
                
            }
        } 
   },[cognitoData])
   
  

   function showEmailAlert() {
    
        if(cognitoData?.identities) {
            return null
        } else {
            if(!cognitoData?.sub) {
                return null
            } else if(cognitoData.sub) {
                return <EmailAlert submits={submits} setSubmits={setSubmits} alertOpen={alertOpen} setAlertOpen={setAlertOpen} handleEmailResend={handleEmailResend} colorPalette={colorPalette} />
            }
            return null
            
        }
   }

    return (
        
            <SafeAreaView style={styles.masterContainer}>
            {showEmailAlert()}
            <ProgressBar initProgress={initProgress} />
            <SearchBar
                style={styles.searchBar}
                placeholder="Search for nearby dispensaries"
                onChangeText={(text) => handleInput(text)}
                > 
                </SearchBar>

                {filteredDispensaries.length > 0 ? <FlatList
                    style={styles.cards}
                    data={filteredDispensaries}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                handlePress(item)
                                setFilteredDispensaries([])
                                dispatch(setLocation({longitude: item.Geo_Point__Longitude__s, latitude: item.Geo_Point__Latitude__s}))
                            }}>
                                <SearchResultCard long={item.Geo_Point__Longitude__s} lat={item.Geo_Point__Latitude__s} state={item.BillingState} image={item.Image_URL__c} name={item.Name} street={item.BillingStreet} city={item.BillingCity} zip={item.BillingPostalCode}/>
                            </TouchableOpacity>
                        )
                        }
                    }
                    keyExtractor={item => item.Name}
                /> : null}

    

                <MapView
                    style={styles.map}
                    onPress={() => {
                        if(Object.keys(sliderData).length !== 0) {
                            if(panelRef.current.state.isPanelOpened) {
                                panelRef.current.togglePanel();
                            }                            
                        }
                    }}
                    provider={Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
                    region={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 3,
                        longitudeDelta: 0.0121,
                    }} 
                >  
                    <Marker
                        key={"HomeMarker"}
                        coordinate={{ latitude : latitude , longitude : longitude }}
                        title={"Your Location"}
                        description={"You are here"}
                    />
                    
                    {Object.values(dispensaries).map((item, index) => {
                        return (
                                <Marker
                                    onPress={() => handlePress(item)}
                                    key={"HomeMarker"}
                                    coordinate={{ latitude : item.Geo_Point__Latitude__s , longitude : item.Geo_Point__Longitude__s}}
                                    title={item.Name}
                                    image={require("../../../assets/pictures/dispensaries.png")}
                                />
                            )
                    })}
                               
                </MapView>
                    {Object.keys(sliderData).length === 0 ? null : <BottomSlider sliderOpen={sliderOpen} panelRef={panelRef} hours={hours} sliderData={sliderData} homeLatitude={latitude} homeLongitude={longitude}/>}

                </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    masterContainer: {
        flex:1,
    },
    emailAlert: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0275d8',
        width: '100%',
    },
    emailAlertContainer: {
        width: "100%",
        height: "39%",
        borderRadius: 8,
    },
    map: {
        flex:1,
    },
    emailAlertHeadline : {
        fontSize: 22,
        textAlign: "center",
        fontWeight: "600",
        color: "#444444"
    },
    emailAlertMessage: {
        color: "#444444",
        textAlign: "justify",
        fontSize: 15,
        fontWeight: "500",
        padding: "7%",
     
    },
    cards: {
        position:"absolute",
        top: "18%",
        width: "100%",
        height: "75%",
    
        zIndex: 1000000,
        left:"auto",
        right: "auto",
    },
    searchResultCard: {
        flexDirection: "row",
        width: "90%",
        height: 130,
        backgroundColor: "white",
        marginBottom:5,
        borderRadius: 8,
        marginLeft:"auto",
        marginRight:"auto",
    },
    cardLeft: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    cardRight: {
        flex: 3,
        justifyContent: "center",
        alignItems:"flex-start",
    },
    cardName: {
        fontSize: 22,
        marginBottom:"5%",
        color: "#444444"
    },
    cardAddress: {
        fontSize: 16,
        color: "#444444",
    },
    searchBar: {
        position:"absolute",
        top:"8%",
        zIndex: 100000,
    },
    customContainer: {
        justifyContent: "center",
        alignItems:"center",
    },
    customBtnContainer: {
        width: "100%",
        height: 40,
        borderRadius: 8,
    },
    customBtn: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems:"center",
        borderRadius: 8,  
    },
    customTxt: {
        fontSize: 18,
        fontWeight: "700",
        paddingRight: "20%",
        paddingLeft: "20%"
    },
})