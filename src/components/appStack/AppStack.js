
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent/DrawerContent';
import TabNavigator from "./TabNavigator/TabNavigator";
import Profile from './Profile/Profile'
import Billing from './Billing/Billing';
import ContactUs from './ContactUs/ContactUs';

const Drawer = createDrawerNavigator();


export default function AppStack({navigation}) {
    return (
        <Drawer.Navigator 
            drawerContent={(props) => <DrawerContent {...props} />}
            screenOptions={{
            
          }}>
            <Drawer.Screen 
                options={{
                    headerShown: false
                }}
                 name="Map">
                {(props)=> <TabNavigator firstEl="Map" {...props} />}
            </Drawer.Screen>

            <Drawer.Screen name="Profile" >
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

