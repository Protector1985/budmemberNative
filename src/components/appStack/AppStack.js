import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from 'react-navigation';
import Home from './home/Home.js'

const screens = {
    Home: {
        screen: Home
    },
   
}


const AppStack = createStackNavigator(screens);
export default createAppContainer(AppStack);