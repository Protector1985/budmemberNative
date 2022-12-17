
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from "./TabNavigator/TabNavigator";
const Drawer = createDrawerNavigator();


export default function AppStack({navigation}) {
 
    return (
        <Drawer.Navigator screenOptions={{
            headerShown: false
          }}>
            <Drawer.Screen name="Map">
            {(props)=> <TabNavigator {...props} />}
            </Drawer.Screen>
        </Drawer.Navigator>
    )
}

