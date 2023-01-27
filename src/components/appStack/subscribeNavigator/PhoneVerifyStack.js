import { createStackNavigator } from '@react-navigation/stack';
import EnterPhoneNumber from "../PhoneVerification/EnterPhoneNumber";
import VerifyPhoneNumber from "../PhoneVerification/VerifyPhoneNumber";

const Stack = createStackNavigator();

export default function PhoneVerifyStack(props) {
    
    //three lines below are for the phone number change logic
    const state = props.navigation.getState()
    const {routes} = state;
    let numberState = routes[6]?.params?.params
    
    return (
        <Stack.Navigator>
            <Stack.Screen name="Verify Phone Number" >
                {(props) => <EnterPhoneNumber numberState={numberState} {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Enter Code" >
                {(props) => <VerifyPhoneNumber numberState={numberState} {...props} />}
            </Stack.Screen>
        </Stack.Navigator>
    )

}