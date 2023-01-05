import {View, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProgressBar from '../ProgressBar/ProgressBar';
const Drawer = createDrawerNavigator();

export default function MapScreen({initProgress}) {
   console.log(initProgress)
    return (
        <View style={styles.masterContainer}>
        <ProgressBar initProgress={initProgress} />
            <MapView
                style={styles.map}
                initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    masterContainer: {
        flex:1,
    },
    map: {
        flex:1,
    }
})