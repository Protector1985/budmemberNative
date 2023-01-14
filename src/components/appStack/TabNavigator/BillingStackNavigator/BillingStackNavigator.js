import { createStackNavigator  } from '@react-navigation/stack';
import Billing from '../../Billing/Billing';
import SubscribeStack from '../../subscribeNavigator/SubscribeStack';
const Stack = createStackNavigator();

export default function BillingStackNavigator() {
   SubscribeStack
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            unmountOnBlur: true,
        }}>
            <Stack.Screen name="Billing Screen" component={Billing}/>
            <Stack.Screen name="Upgrade Membership" component={SubscribeStack} />
        </Stack.Navigator>
    )
}