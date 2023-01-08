import React from 'react';
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import SearchBar from "react-native-dynamic-search-bar";
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useSelector } from 'react-redux';


const Drawer = createDrawerNavigator();

export default function MapScreen({initProgress}) {
   const [text, setText] = React.useState()
   const {latitude, longitude} = useSelector((state) => state.locationSlice)
   const {dispensaries} = useSelector((state) => state.dispensariesSlice)
   

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
                {dispensaries.map((item) => {
                    console.log(item.Geo_Point__Longitude__s)
                    return (<Marker
                        key={"HomeMarker"}
                        coordinate={{ latitude : item.Geo_Point__Latitude__s , longitude : item.Geo_Point__Longitude__s}}
                        title={"Your Location"}
                        image={require("../../../assets/pictures/dispensaries.png")}
                        description={"You are here"}
                    />)
                })}
                        
                   
                
            </MapView>
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