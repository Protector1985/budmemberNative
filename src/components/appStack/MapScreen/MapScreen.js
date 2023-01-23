import React from 'react';
import {View, StyleSheet, SafeAreaView, Text, Image, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
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
import Alert from '../../utils/Alert';
import {setShowEmailModal} from '../../../store/systemSlice';
import { setLocation } from '../../../store/locationSlice';

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

export default function MapScreen({navigation, initProgress}) {
   const [searchText, setText] = React.useState("")
   const [alertOpen, setAlertOpen] = React.useState(false)
   const [alertMessage, setAlertMessage] = React.useState("")
   const [alertType, setAlertType] = React.useState("")
   const [sliderData, setSliderData] = React.useState({})
   const {latitude, longitude} = useSelector((state) => state.locationSlice)
  
   const {showEmailModal} = useSelector((state) => state.systemSlice)
   const {dispensaries} = useSelector((state) => state.dispensariesSlice)
   const {open} = useSelector((state)=> state.drawerSlice)
   const {Email_Verified__c, colorPalette, Email} = useSelector((state)=> state.userSlice)
   const [hours, setHours] = React.useState()
   const [alertWidth, setAlertWidth] = React.useState(null)
   const dispatch = useDispatch()
   const menu = <SideDrawer navigation={navigation} />
   const [alertHtml, setAlertHtml] = React.useState(null)
   const [submits, setSubmits] = React.useState(0)
   const [loading,setLoading] = React.useState(false)
   const [filteredDispensaries, setFilteredDispensaries] = React.useState([])
   const alertRef = React.useRef();

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
                    setAlertMessage("Your email is not verfied. You will not be able to recover this account.")
                    setAlertType("WARNING")
                    setAlertHtml(() => (
                        <View style={[styles.customContainer, {width: alertWidth}]}>
                        {submits < 3 ? <View style={[styles.customBtnContainer, {marginTop: 35, marginBottom: 10}]}>
                            <TouchableOpacity onPress={handleEmailResend} style={styles.customBtn}>
                                <Text style={[styles.customTxt, {color: colorPalette.accent}]}>Send Verification Email</Text>
                            </TouchableOpacity>
                        </View> : null}
                            

                            <View style={[styles.customBtnContainer, submits >= 3 ? {marginTop: 35, marginBottom: 30} : {marginBottom: 30}]}>
                                <TouchableOpacity style={styles.customBtn}>
                                    <Text style={[styles.customTxt, {color: colorPalette.accent}]}>Account is Verified</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                }
            }
        }

        
   },[Email_Verified__c, alertWidth])

   async function handlePress(item) {
    try {
        setSliderData(dispensaries[item.Name])
        const supp = await fetchDispensary(item.Id)
        setHours(supp?.data?.data[0].Dispensary_Open_Hours__r.records)
    }catch(err) {
        console.log(err)
    }
   }
   

    return (
        
            <SafeAreaView style={styles.masterContainer}>
            <Alert callBack={() => {
                //ensures the email modal is not shown a second time for this session
                return dispatch(setShowEmailModal(false))
            }} customSetHook={setAlertWidth} customButtonMessage={"Remind me later"} location="Enter Code" navigation={navigation} visible={alertOpen} setVisible={setAlertOpen} message={alertMessage} type={alertType} html={alertHtml}/>
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
                    {Object.keys(sliderData).length === 0 ? null :<BottomSlider hours={hours} sliderData={sliderData} homeLatitude={latitude} homeLongitude={longitude}/>}

                </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    masterContainer: {
        flex:1,
    },
    map: {
        flex:1,
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
        alignItems:"flexStart",
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
        width: "90%",
        height: 30,
        borderRadius: 8,


    },
    customBtn: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
        justifycontent:"center",
        alignItems:"center",
        
    },
    customTxt: {
        fontSize: 18,
        fontWeight: "700"
    },
})