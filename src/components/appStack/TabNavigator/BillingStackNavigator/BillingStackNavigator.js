import { createStackNavigator  } from '@react-navigation/stack';
import Billing from '../../Billing/Billing';
import PurchaseHistory from '../../PurchaseHistory/PurchaseHistory';
import SubscribeStack from '../../subscribeNavigator/SubscribeStack';
const Stack = createStackNavigator();

export default function BillingStackNavigator() {
    
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            unmountOnBlur: true,
        }}>
            <Stack.Screen name="Billing Screen" component={Billing}/>
            <Stack.Screen name="Upgrade Membership" component={SubscribeStack} />
            <Stack.Screen
            options={{headerShown: true}}
            
            name="Purchase History" component={PurchaseHistory} />
        </Stack.Navigator>
    )
}