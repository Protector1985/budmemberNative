import { createStackNavigator } from '@react-navigation/stack';
import CTA from '../CTA/CTA';
import CreditCardPayment from '../CreditCardPayment/CreditCardPayment';
import EnterPhoneNumber from '../PhoneVerification/EnterPhoneNumber';
import VerifyPhoneNumber from '../PhoneVerification/VerifyPhoneNumber';
import PlanSelect from '../PlanSelect/PlanSelect';
import BillingForm from '../BillingForm/BillingForm';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

export default function SubscribeStack() {
  const {currentOnboardingStep} = useSelector((state) => state.systemSlice)
  
 
  return (
    <Stack.Navigator>
      <Stack.Screen name="Become a Budmember" component={CTA} />
      <Stack.Screen name="Select Plan" component={PlanSelect} />
      <Stack.Screen name="Verify Phone Number" component={EnterPhoneNumber} />
      <Stack.Screen
        options={{
          headerLeft: ()=> null,
        }}
        name="Enter Code" component={VerifyPhoneNumber} />
      <Stack.Screen
        options={{
          headerLeft: ()=> null,
        }} 
        name="Payment Information" component={CreditCardPayment} />
      <Stack.Screen name="Billing Information" component={BillingForm} />
    </Stack.Navigator>
  );
}