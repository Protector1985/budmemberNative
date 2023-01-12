import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import {useSelector, useDispatch} from 'react-redux'
import { toggleDrawer } from '../../../store/drawerSlice';

export default function CustomTabBarButton(props) {
    const {drawerProps, navigation, pictureEl, name} = props
    const dispatch = useDispatch();
   
   
      function handlePress(){
            dispatch(toggleDrawer(true))
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