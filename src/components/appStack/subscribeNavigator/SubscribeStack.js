import { createStackNavigator } from '@react-navigation/stack';
import CTA from '../CTA/CTA';
import PlanSelect from '../PlanSelect/PlanSelect';

const Stack = createStackNavigator();

export default function SubscribeStack() {
  PlanSelect
  return (
    <Stack.Navigator>
      <Stack.Screen name="CTA" component={CTA} />
      <Stack.Screen name="Select Plan" component={PlanSelect} />
     
    </Stack.Navigator>
  );
}