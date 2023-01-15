
import React from 'react';
import TabNavigator from "./TabNavigator/TabNavigator";
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import SideDrawer from './SideDrawer/SideDrawer.js';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';



const Stack = createStackNavigator();

export default function AppStack() {
  
    const [navigation, setNavigation] = React.useState(null)
    const {userSlice} = useSelector((state) => state)
    // const {initProgress, fetchAllData} = useInitData()
    const {open} = useSelector((state)=> state.drawerSlice)
    const menu = <SideDrawer navigation={navigation} />
    // useEffect(() => fetchAllData(), [])
    
    return (
            
            <ActionSheetProvider>
                <TabNavigator initProgress={{
                    progress: 0.99,
                    stepsLeft: 0,
                    message: "Almost Done!"
                }} />
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