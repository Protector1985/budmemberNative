import { createStackNavigator } from '@react-navigation/stack';
import CTA from '../CTA/CTA';
import PaymentInformation from '../PaymentInformation/PaymentInformation';
import EnterPhoneNumber from '../PhoneVerification/EnterPhoneNumber';
import VerifyPhoneNumber from '../PhoneVerification/VerifyPhoneNumber';
import PlanSelect from '../PlanSelect/PlanSelect';

const Stack = createStackNavigator();

export default function SubscribeStack() {
  
  return (
    <Stack.Navigator>
      <Stack.Screen name="CTA" component={CTA} />
      <Stack.Screen name="Select Plan" component={PlanSelect} />
      <Stack.Screen name="Verify Phone Number" component={EnterPhoneNumber} />
      <Stack.Screen name="Enter Code" component={VerifyPhoneNumber} />
      <Stack.Screen name="Payment Information" component={PaymentInformation} />
    </Stack.Navigator>
  );
}