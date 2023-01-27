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
import SelectPayment from '../SelectPayment/SelectPayment';
import PhoneVerifyStack from './PhoneVerifyStack';

const Stack = createStackNavigator();

export default function SubscribeStack() {
  const {currentOnboardingStep} = useSelector((state) => state.systemSlice)
  const {Membership_Status__c} = useSelector((state) => state.userSlice);
  const {cognitoData} = useSelector((state) => state.cognitoDataSlice);

  function returnComponent(props) {
    if(Membership_Status__c === "Inactive" && !cognitoData["custom:authorizeSubId"]) {
      return <CTA {...props} />
    } else if(Membership_Status__c === "Inactive" && cognitoData["custom:authorizeSubId"]) {
      return <Reactivation {...props} />
    }else if(Membership_Status__c === "Active" && cognitoData["custom:authorizeSubId"]) {
      return <PlanSelect {...props} />
    }
  }
 

  return (
    <Stack.Navigator>
      <Stack.Screen name="Become a Budmember" >
        {(props)=> returnComponent(props)}
      </Stack.Screen>
      <Stack.Screen name="Select Plan" component={PlanSelect} />
        <Stack.Screen options={{
          headerShown:false,
          }} 
          name="Verify Phone Number">
          {(props) => <PhoneVerifyStack {...props} />}
        </Stack.Screen>
        {currentOnboardingStep === "update" ? <Stack.Screen name="Info" component={UpgradeInfo} /> : null} 
        {currentOnboardingStep === "update" || currentOnboardingStep === "reactivate" ? <Stack.Screen name="Payment Method" component={SelectPayment} /> : null}
        <Stack.Screen
        options={{
          headerLeft: ()=> null,
        }}
        
        name="Payment Information" component={CreditCardPayment} />

      <Stack.Screen name="Billing Information" component={BillingForm} />
    </Stack.Navigator>
  );
}