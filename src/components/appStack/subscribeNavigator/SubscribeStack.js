import { createStackNavigator } from '@react-navigation/stack';
import CTA from '../CTA/CTA';
import CreditCardPayment from '../CreditCardPayment/CreditCardPayment';
import EnterPhoneNumber from '../PhoneVerification/EnterPhoneNumber';
import VerifyPhoneNumber from '../PhoneVerification/VerifyPhoneNumber';
import PlanSelect from '../PlanSelect/PlanSelect';
import BillingForm from '../BillingForm/BillingForm';
import { useSelector } from 'react-redux';
import Reactivation from '../Reactivation/Reactivation';
import UpgradeInfo from '../UpgradeInfo/UpgradeInfo';

const Stack = createStackNavigator();

export default function SubscribeStack() {
  const {currentOnboardingStep} = useSelector((state) => state.systemSlice)
  const {Membership_Status__c} = useSelector((state) => state.userSlice);
  const {cognitoData} = useSelector((state) => state.cognitoDataSlice);

  function returnComponent(props) {
    if(Membership_Status__c === "Inactive" && !cognitoData["custom:authorizeSubId"]) {
      console.log("Returning CTA!!!!!!")
      return <CTA {...props} />
    } else if(Membership_Status__c === "Inactive" && cognitoData["custom:authorizeSubId"]) {
      return <Reactivation {...props} />
    }else if(Membership_Status__c === "Active" && cognitoData["custom:authorizeSubId"]) {
      return <PlanSelect {...props} />
    }
  }
 
  console.log(currentOnboardingStep)
  return (
    <Stack.Navigator>
      <Stack.Screen name="Become a Budmember" >

        {(props)=> returnComponent(props)}
      </Stack.Screen>
      <Stack.Screen name="Select Plan" component={PlanSelect} />
      <Stack.Screen name="Verify Phone Number" component={EnterPhoneNumber} />
      <Stack.Screen
        options={{
          headerLeft: ()=> null,
        }}
        name="Enter Code" component={VerifyPhoneNumber} />
        {currentOnboardingStep === "update" ? <Stack.Screen name="Upgrade Info" component={UpgradeInfo} /> : null}
      <Stack.Screen
        options={{
          headerLeft: ()=> null,
        }}
        
        name="Payment Information" component={CreditCardPayment} />

      <Stack.Screen name="Billing Information" component={BillingForm} />
    </Stack.Navigator>
  );
}