
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


const Drawer = createDrawerNavigator();

export default function AppStack({navigation}) {
    const {userSlice} = useSelector((state) => state)
    const {avatarUri} = userSlice
    const dispatch = useDispatch();

    //------INIT - ALL STARTING STATE------
    useEffect(() => {
        //fetches initial user state
        fetchUserData(dispatch)
        .then((res) => {
            //fetches avatar picture
            fetchImage(res.Email, dispatch, avatarUri)
            //fetches plans (packages) by store
            fetchPlans(dispatch, res.OwnerId)
            //fetches cognito information
            fetchCognitoUser(dispatch, res.Email)
        })    
    },[])
    //------INIT - ALL STARTING STATE------

    return (
        <ActionSheetProvider>
        <Drawer.Navigator 
            drawerContent={(props) => { 
                Object.assign(props, userSlice)
                return <DrawerContent {...props} />
            }}
            screenOptions={{
            
          }}>
            <Drawer.Screen 
                options={{
                    headerShown: false,
                }}
                 name="Map">
                {(props)=> {
                    Object.assign(props, userSlice)
                    return <TabNavigator firstEl="Map" {...props} />
                }}
            </Drawer.Screen>

            <Drawer.Screen
                options={{
                    headerShown: false,
                }}
                name="Profile" >
                {(props)=> {
                    Object.assign(props, userSlice)
                    return <TabNavigator firstEl="Profile" {...props} />}}
            </Drawer.Screen>
           
        </Drawer.Navigator>
        </ActionSheetProvider>
    )
}



// <Drawer.Screen 
// options={{
//     headerShown: true,
// }} name="Billing">
//     {(props)=> {
//         Object.assign(props, userSlice)
//         return <Billing />}}
// </Drawer.Screen>
// <Drawer.Screen name="ContactUs">
//     {(props)=> {
//         Object.assign(props, userSlice)
//         return <ContactUs/>}}
// </Drawer.Screen>


