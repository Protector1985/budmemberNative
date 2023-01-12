
import React from 'react';
import {useEffect} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import {setMemberData} from '../../store/userSlice.js'
import { Button } from 'react-native';
import DrawerContent from './DrawerContent/DrawerContent';
import TabNavigator from "./TabNavigator/TabNavigator";
import { fetchMyself} from '../../api/nodeApi.js';
import fetchUserData from './lib/fetchUserData'
import fetchImage from './lib/fetchImage.js';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import fetchPlans from './lib/fetchPlans.js';
import Billing from './Billing/Billing.js';
import ContactUs from './ContactUs/ContactUs.js';
import fetchCognitoUser from './lib/fetchCognitoUser.js';
import useInitData from './lib/useInitData.js';
import Profile from './Profile/Screens/Profile.js';
import SideDrawer from './SideDrawer/SideDrawer.js';
import SideMenu from 'react-native-side-menu'
import { createStackNavigator } from '@react-navigation/stack';



const Stack = createStackNavigator();

export default function AppStack() {
    const [navigation, setNavigation] = React.useState(null)
    const {userSlice} = useSelector((state) => state)
    const {initProgress, fetchAllData} = useInitData()
    const {open} = useSelector((state)=> state.drawerSlice)
    const menu = <SideDrawer navigation={navigation} />
    useEffect(() => fetchAllData(), [])
    
    return (
            
            <ActionSheetProvider>
                <TabNavigator initProgress={initProgress} />
            </ActionSheetProvider>
            
            
        
    )
}



// <Drawer.Navigator 
//             drawerContent={(props) => { 
//                 Object.assign(props, userSlice)
//                 return <DrawerContent {...props} />
//             }}
//             screenOptions={{
            
//           }}>
//             <Drawer.Screen 
//                 options={{
//                     headerShown: false,
//                     drawerItemStyle: { height: 0 }
//                 }}
//                  name="Map">
//                 {(props)=> {
//                     Object.assign(props, userSlice)
//                     return <TabNavigator firstEl="Map" initProgress={initProgress} {...props} />
//                 }}
//             </Drawer.Screen>

//             <Drawer.Screen
//                 options={{
//                     headerShown: false,
//                 }}
//                 name="Profile" >
//                 {(props)=> {
//                     Object.assign(props, userSlice)
//                     return <TabNavigator firstEl="Profile" initProgress={initProgress} {...props} />}}
//             </Drawer.Screen>

//             <Drawer.Screen
//                 options={{
//                     headerShown: false,
//                 }}
//                 name="Billing" >
//                 {(props)=> {
//                     Object.assign(props, userSlice)
//                     return <TabNavigator firstEl="Billing" initProgress={initProgress} {...props} />}}
//             </Drawer.Screen>
           
//         </Drawer.Navigator>