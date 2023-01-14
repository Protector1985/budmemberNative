import { createStackNavigator } from '@react-navigation/stack';
import CTA from '../CTA/CTA';
import CreditCardPayment from '../CreditCardPayment/CreditCardPayment';
import EnterPhoneNumber from '../PhoneVerification/EnterPhoneNumber';
import VerifyPhoneNumber from '../PhoneVerification/VerifyPhoneNumber';
import PlanSelect from '../PlanSelect/PlanSelect';
import BillingForm from '../BillingForm/BillingForm';
import { useSelector } from 'react-redux';
import Reactivation from '../Reactivation/Reactivation';

const Stack = createStackNavigator();

export default function SubscribeStack() {
  const {currentOnboardingStep} = useSelector((state) => state.systemSlice)
  const {Membership_Status__c} = useSelector((state) => state.userSlice);
  const {cognitoData} = useSelector((state) => state.cognitoDataSlice);

  function returnComponent() {
    if(Membership_Status__c === "Inactive" && !cognitoData["custom:authorizeSubId"]) {
      return CTA
    } else if(Membership_Status__c === "Inactive" && cognitoData["custom:authorizeSubId"]) {
      return Reactivation
    }
  }
 
  return (
    <Stack.Navigator>
      <Stack.Screen name="Become a Budmember" component={returnComponent()} />
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