import React from 'react';
import {View, StyleSheet, SafeAreaView, FlatList, Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import SearchBar from "react-native-dynamic-search-bar";
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useSelector } from 'react-redux';
import BottomSheet from 'react-native-simple-bottom-sheet';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BottomSlider from '../BottomSlider/BottomSlider'
import { fetchDispensary } from '../../../api/nodeApi';
import SideDrawer from '../SideDrawer/SideDrawer';
import SideMenu from 'react-native-side-menu';

const Drawer = createDrawerNavigator();

export default function MapScreen({navigation, initProgress}) {
   const [text, setText] = React.useState()
   const [sliderData, setSliderData] = React.useState({})
   const {latitude, longitude} = useSelector((state) => state.locationSlice)
   const {dispensaries} = useSelector((state) => state.dispensariesSlice)
   const {open} = useSelector((state)=> state.drawerSlice)
   const [hours, setHours] = React.useState()
   const menu = <SideDrawer navigation={navigation} />
   

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
            
            <ProgressBar initProgress={initProgress} />
            <SearchBar
                style={styles.searchBar}
                placeholder="Search for nearby dispensaries"
                onPress={() => alert("onPress")}
                onChangeText={(text) => setText(text)}
                />

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
    searchBar: {
        position:"absolute",
        top:"8%",
        zIndex: 100000,
    }
})