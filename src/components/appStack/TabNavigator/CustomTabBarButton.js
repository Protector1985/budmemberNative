import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function CustomTabBarButton({navigation, pictureEl, name}) {

      
    return(
        <TouchableOpacity style={styles.btn} onPress={() =>  navigation.dispatch(DrawerActions.openDrawer())} >
            {pictureEl}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        flex: 1,
    }
})