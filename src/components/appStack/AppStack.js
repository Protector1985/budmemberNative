
import React from 'react';
import TabNavigator from "./TabNavigator/TabNavigator";
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import SideDrawer from './SideDrawer/SideDrawer.js';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import _init from './lib/_init';


const Stack = createStackNavigator();

export default function AppStack() {
    
    const dispatch = useDispatch();
    const [navigation, setNavigation] = React.useState(null)
    const {userSlice} = useSelector((state) => state)
    const {cognitoData} = useSelector((state) => state.cognitoDataSlice);
    const {avatarUri} = userSlice
    const {open} = useSelector((state)=> state.drawerSlice)
    const menu = <SideDrawer navigation={navigation} />
    const [initState, setInitState] = React.useState({
        progress: 0.01,
        stepsLeft: 5,
        message: "Initializing"
    })
    React.useEffect(() => {
        _init(userSlice, cognitoData, avatarUri, dispatch, setInitState)
    }, [])
  
    return (
            
            <ActionSheetProvider>
                <TabNavigator initProgress={initState} />
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