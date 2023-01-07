import {View, TouchableOpacity, Text, SafeAreaView, StyleSheet} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import MapScreen from '../MapScreen/MapScreen';
import QrScanner from '../QrScanner/QrScanner'
import Profile from '../Profile/Screens/Profile'
import Billing from '../Billing/Billing';
import ContactUs from '../ContactUs/ContactUs';
import CustomTabBarButton from './CustomTabBarButton';
import { DrawerActions } from '@react-navigation/native';
import { FlipInEasyX } from 'react-native-reanimated';
import ProfileStack from '../Profile/ProfileStack';
import CTA from '../CTA/CTA';
import SubscribeStack from '../subscribeNavigator/SubscribeStack';
import { useSelector } from 'react-redux';






const Tab = createBottomTabNavigator();

export default function TabNavigator(props) {
    const oldProps = props
    const {Membership_Status__c} = useSelector((state) => state.userSlice)
    console.log(Membership_Status__c)
    const {navigation, firstEl, initProgress} = props
    //the first screen will always be returned in the tab stack
    //in order to show the tab bar across all screens we need to 
    //return the first screen conditionally
    function returnFirstScreen(props) {
        switch(firstEl) {
            case "Map":
                return <MapScreen initProgress={initProgress} {...props} />
            case "Profile":
                return <ProfileStack {...props} />
            case "Billing":
                return <Billing {...props} />
            case "ContactUs":
                return <ContactUs {...props} />
        }
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
                options={{
                    activeTintColor: "black",
                    tabBarShowLabel: false, 
                    tabBarButton: (props) => {
                        return <CustomTabBarButton {...props} name="MAP" navigation={navigation} pictureEl={<Entypo name="map" style={styles.icon} size={26} color="black" />} />},
                   
                }}
                >
                    {(props) => {
                        
                        Object.assign(props, oldProps)
                        return returnFirstScreen(props)}}
                </Tab.Screen>
            <Tab.Screen
                name="QR"
                //if already member, display QR. Else, open CTA
                component={Membership_Status__c === "Active" ? QrScanner : SubscribeStack}
                options={{
                    animationEnabled: true,
                    tabBarShowLabel: false, 
                    tabBarIcon: (props) => <AntDesign name="qrcode" size={26} color="black" />,
                   
                }}
            />
            <Tab.Screen
                name="Menu"
                component={QrScanner}
                options={{
                tabBarButton: (props) => {
                    return <CustomTabBarButton {...props} name="MENU" navigation={navigation} pictureEl={<AntDesign style={styles.icon}  name="menuunfold" size={26} color="black" />} />},
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

