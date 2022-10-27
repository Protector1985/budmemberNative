import {View, Text, StyleSheet} from 'react-native'
import MapView from 'react-native-maps';

export default function Home() {
    return (
        <View style={styles.masterContainer}>
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
        flex: 1
    },
    map: {
        flex: 1,
    }
})