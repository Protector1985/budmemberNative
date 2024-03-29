import {View, TouchableOpacity, Text, SafeAreaView, StyleSheet} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import MapScreen from '../MapScreen/MapScreen';
import Profile from '../Profile/Screens/Profile'
import ContactUs from '../ContactUs/ContactUs';
import CustomTabBarButton from './CustomTabBarButton';
import SubscribeStack from '../subscribeNavigator/SubscribeStack';
import { useSelector } from 'react-redux';
import QrCodeStack from '../QrCode/QrCodeStack';
import SideDrawer from '../SideDrawer/SideDrawer';
import SideMenu from 'react-native-side-menu';
import BillingStackNavigator from './BillingStackNavigator/BillingStackNavigator';
import ProfileStack from '../Profile/ProfileStack'
import PhoneVerifyStack from '../subscribeNavigator/PhoneVerifyStack';
const Tab = createBottomTabNavigator();

export default function TabNavigator({initProgress, firstEl, returnNav}) {
    const {Membership_Status__c} = useSelector((state) => state.userSlice);
    const {cognitoData} = useSelector((state) => state.cognitoDataSlice);
    const {open} = useSelector((state)=> state.drawerSlice)
    const badgeVisible = Membership_Status__c !== "Active" && Membership_Status__c !== "Cancelled" 
    
  

    function returnStack(props, menu) {
        try {
            if(Membership_Status__c === "Active" && cognitoData["custom:authorizeSubId"]) {
                return (
                        <SafeAreaView style={{flex: 1}}>
                            <SideMenu edgeHitWidth={50} bounceBackOnOverdraw={false} isOpen={open} menu={menu} > 
                                <QrCodeStack {...props} />
                            </SideMenu>
                        </SafeAreaView>
                )
            } else if(Membership_Status__c === "Inactive" && !cognitoData["custom:authorizeSubId"]) {
                return (
                    <SafeAreaView style={{flex: 1}}>
                        <SideMenu edgeHitWidth={50} bounceBackOnOverdraw={false} isOpen={open} menu={menu} > 
                            <SubscribeStack {...props} />
                        </SideMenu>
                    </SafeAreaView> 
                )
            }else if(Membership_Status__c === "Inactive" && cognitoData["custom:authorizeSubId"]) {
                return (
                    <SafeAreaView style={{flex: 1}}>
                        <SideMenu edgeHitWidth={50} bounceBackOnOverdraw={false} isOpen={open} menu={menu} > 
                            <SubscribeStack />
                        </SideMenu>
                    </SafeAreaView> 
                )
            }
        } catch(err) {
            console.log(err)
        }
    }
    
    return(
  

        cognitoData["custom:salesforceRole"] === "Budtender" ?
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
                            <SideMenu edgeHitWidth={50} bounceBackOnOverdraw={false} isOpen={open} menu={menu} > 
                                <MapScreen initProgress={initProgress} {...props} />
                            </SideMenu>
                        </SafeAreaView>
                        
                    )}}
            </Tab.Screen>
          
          </Tab.Navigator>


        :


        
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
                                <SideMenu edgeHitWidth={50} bounceBackOnOverdraw={false} isOpen={open} menu={menu} > 
                                    <MapScreen initProgress={initProgress} {...props} />
                                </SideMenu>
                            </SafeAreaView>
                            
                        )}}
                </Tab.Screen>
            <Tab.Screen
                name="QR"
                options={{
                    tabBarBadge: badgeVisible ? "!" : null,
                    unmountOnBlur:true,
                    animationEnabled: true,
                    tabBarShowLabel: false, 
                    tabBarIcon: (props) => <AntDesign name="qrcode" size={26} color="black" />,
                   
                }}
            >
                {(props) => {
                    const menu = <SideDrawer navigation={props.navigation} />
                    return (
                        returnStack(props, menu)
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
                        <SideMenu edgeHitWidth={50} bounceBackOnOverdraw={false} isOpen={open} menu={menu} > 
                            <BillingStackNavigator />
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
                        <SideMenu edgeHitWidth={50} bounceBackOnOverdraw={false} isOpen={open} menu={menu} > 
                            <ProfileStack {...props} />
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
                        <SideMenu edgeHitWidth={50} bounceBackOnOverdraw={false} isOpen={open} menu={menu} > 
                            <ContactUs {...props} />
                        </SideMenu>
                    </SafeAreaView>
                    
                )}}
            </Tab.Screen>
            <Tab.Screen 
                options={{
                    headerShown:false,
                    tabBarItemStyle:{ display: "none"},
                }} 
                name="Verify Phone Number">
                {(props) => <PhoneVerifyStack {...props} />}
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

