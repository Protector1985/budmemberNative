import { createStackNavigator } from '@react-navigation/stack';
import QrCode from "./QrCode";
import SubscriptionData from './SubscriptionData';


const Stack = createStackNavigator();

export default function QrCodeStack() {
 
    return (
        <Stack.Navigator>
            <Stack.Screen name="QR Code" component={QrCode} />
            <Stack.Screen name="Subscription Data" component={SubscriptionData} />
        </Stack.Navigator>
    )
}