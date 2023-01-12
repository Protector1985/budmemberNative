import {View, TouchableOpacity, Text, SafeAreaView, StyleSheet} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import MapScreen from '../MapScreen/MapScreen';
import QrCode from "../QrCode/QrCode"
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

import QrCodeStack from '../QrCode/QrCodeStack';
import SideDrawer from '../SideDrawer/SideDrawer';
import SideMenu from 'react-native-side-menu';






const Tab = createBottomTabNavigator();

export default function TabNavigator({initProgress, firstEl, returnNav}) {
  

    const {Membership_Status__c} = useSelector((state) => state.userSlice)
    const {open} = useSelector((state)=> state.drawerSlice)
  
    
    
    return(
  
        
        <Tab.Navigator style={styles.bottomContainer} screenOptions={{
            headerShown: false,
            unmountOnBlur: true,
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
                    tabBarIcon: (props) => <Entypo name="map" style={styles.icon} size={26} color="black" />,
                }}
                >
                    {(props) => {
                        const menu = <SideDrawer navigation={props.navigation} />
                        return(
                            <SafeAreaView style={{flex: 1}}>
                                <SideMenu bounceBackOnOverdraw={false} isOpen={open} menu={menu} > 
                                    <MapScreen initProgress={initProgress} {...props} />
                                </SideMenu>
                            </SafeAreaView>
                            
                        )}}
                </Tab.Screen>
            <Tab.Screen
                name="QR"
                options={{
                    unmountOnBlur:true,
                    animationEnabled: true,
                    tabBarShowLabel: false, 
                    tabBarIcon: (props) => <AntDesign name="qrcode" size={26} color="black" />,
                   
                }}
            >
                {(props) => {
                    const menu = <SideDrawer navigation={props.navigation} />
                    return (
                        Membership_Status__c === "Active" ?
                        <SafeAreaView style={{flex: 1}}>
                            <SideMenu bounceBackOnOverdraw={false} isOpen={open} menu={menu} > 
                                <QrCodeStack {...props} />
                            </SideMenu>
                        </SafeAreaView>
                            :
                        <SafeAreaView style={{flex: 1}}>
                            <SideMenu bounceBackOnOverdraw={false} isOpen={open} menu={menu} > 
                                <SubscribeStack {...props} />
                            </SideMenu>
                        </SafeAreaView> 
                    )  
                }}

                </Tab.Screen>
            <Tab.Screen
                name="Menu"
                component={MapScreen}
                options={{
                    unmountOnBlur:true,
                    animationEnabled: true,
                    tabBarShowLabel: false, 
                    tabBarButton: (props) => {
                        return <CustomTabBarButton name="MENU" pictureEl={<AntDesign style={styles.icon}  name="menuunfold" size={26} color="black" />} />},
                
                }}
             />
            
            
            <Tab.Screen
                name="Billing"
               
                options={{
                    unmountOnBlur:true,
                    animationEnabled: true,
                    tabBarShowLabel: false, 
                    tabBarItemStyle:{ display: "none"},
                                        
                }}
            >
            {(props) => {
                const menu = <SideDrawer navigation={props.navigation} />
                return(
                    <SafeAreaView style={{flex: 1}}>
                        <SideMenu bounceBackOnOverdraw={false} isOpen={open} menu={menu} > 
                            <Billing {...props} />
                        </SideMenu>
                    </SafeAreaView>
                    
                )}}
            </Tab.Screen>
            <Tab.Screen
                name="Profile"
                options={{
                    unmountOnBlur:true,
                    animationEnabled: true,
                    tabBarShowLabel: false, 
                    tabBarItemStyle:{ display: "none"},
                                        
                }}
            >
            {(props) => {
                const menu = <SideDrawer navigation={props.navigation} />
                return(
                    <SafeAreaView style={{flex: 1}}>
                        <SideMenu bounceBackOnOverdraw={false} isOpen={open} menu={menu} > 
                            <Profile {...props} />
                        </SideMenu>
                    </SafeAreaView>
                    
                )}}
            </Tab.Screen>
            <Tab.Screen
                name="Contact Us"
                options={{
                    unmountOnBlur:true,
                    animationEnabled: true,
                    tabBarShowLabel: false, 
                    tabBarItemStyle:{ display: "none"},
                                        
                }}
            >
            {(props) => {
                const menu = <SideDrawer navigation={props.navigation} />
                return(
                    <SafeAreaView style={{flex: 1}}>
                        <SideMenu bounceBackOnOverdraw={false} isOpen={open} menu={menu} > 
                            <ContactUs {...props} />
                        </SideMenu>
                    </SafeAreaView>
                    
                )}}
            </Tab.Screen>
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

