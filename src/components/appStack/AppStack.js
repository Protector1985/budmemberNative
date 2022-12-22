
import {useEffect} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import {setMemberData} from '../../store/userSlice.js'
import { Button } from 'react-native';
import DrawerContent from './DrawerContent/DrawerContent';
import TabNavigator from "./TabNavigator/TabNavigator";
import { fetchMyself } from '../../api/nodeApi.js';



const Drawer = createDrawerNavigator();


export default function AppStack({navigation}) {
    const {userSlice} = useSelector((state) => state)
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            const res = await fetchMyself();
            if(res.data.success) {
                dispatch(setMemberData(res.data.data))
            }
        }
        fetchData();   
    },[])

    return (
        <Drawer.Navigator 
            drawerContent={(props) => <DrawerContent {...props} />}
            screenOptions={{
            
          }}>
            <Drawer.Screen 
                options={{
                    headerShown: false,
                }}
                 name="Map">
                {(props)=> <TabNavigator firstEl="Map" {...props} />}
            </Drawer.Screen>

            <Drawer.Screen
                options={{
                    headerShown: false,
                }}
                name="Profile" >
                {(props)=> <TabNavigator firstEl="Profile" {...props} />}
            </Drawer.Screen>
            <Drawer.Screen name="Billing">
                {(props)=> <TabNavigator firstEl="Billing" {...props} />}
            </Drawer.Screen>
            <Drawer.Screen name="ContactUs">
                {(props)=> <TabNavigator firstEl="ContactUs" {...props} />}
            </Drawer.Screen>
        </Drawer.Navigator>
    )
}



