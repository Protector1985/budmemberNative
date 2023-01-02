import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function CustomTabBarButton({navigation, pictureEl, name}) {

      function handlePress(){
        if(name === "MAP") {
            navigation.navigate("Map",{screen: "Map"})
        } else {
            navigation.dispatch(DrawerActions.openDrawer())
        }
      }

    return(
        <TouchableOpacity style={styles.btn} onPress={handlePress} >
            {pictureEl}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        flex: 1,
    }
})