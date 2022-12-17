import {View, TouchableOpacity, Text, SafeAreaView, StyleSheet} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import MapScreen from '../MapScreen/MapScreen';
import QrScanner from '../QrScanner/QrScanner'
import CustomTabBarButton from './CustomTabBarButton';
import { DrawerActions } from '@react-navigation/native';
import { FlipInEasyX } from 'react-native-reanimated';
const Tab = createBottomTabNavigator();

export default function TabNavigator({navigation}) {
    
    function handleOpen() {
        navigation.dispatch(DrawerActions.openDrawer())
    }
    return(
        <Tab.Navigator style={styles.bottomContainer} screenOptions={{
            headerShown: false,
            tabBarStyle: {
                
                display:"flex",
                flexDirection:"row",
                justifyContent: "space-around",
                alignItems:"center",
            }
          }}>
        
            <Tab.Screen
                name="Map"
                component={MapScreen}
                options={{
                tabBarButton: (props) => <CustomTabBarButton navigation={navigation} pictureEl={<Entypo style={styles.icon} name="map" size={26} color="black" />} />,
                
                }}
            />
            <Tab.Screen
                name="QR"
                component={QrScanner}
                options={{
                tabBarButton: (props) => <CustomTabBarButton navigation={navigation} pictureEl={<AntDesign style={styles.icon}  name="qrcode" size={26} color="black" />} />,
                   
                }}
            />
            <Tab.Screen
                name="Menu"
                component={QrScanner}
                options={{
                tabBarButton: (props) => <CustomTabBarButton navigation={navigation} pictureEl={<AntDesign style={styles.icon}  name="menuunfold" size={26} color="black" />} />,
                
                }}
            />
        </Tab.Navigator>
        
    )

}

const styles = StyleSheet.create({
    bottomContainer: {
        display:"flex",
        flexDirection:"row",
        justifyContent: "space-around",
        alignItems:"center",
    },
    icon: {
        textAlign:"center"
    }
})

