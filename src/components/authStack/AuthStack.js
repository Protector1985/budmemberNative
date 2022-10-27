import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from 'react-navigation';
import Login from "./login/Login";
import SignIn from "./signin/SignIn";
import Signup from "./signup/Signup";
import ForgotPassword from "./forgotPassword/ForgotPassword";
import Welcome from "../Welcome";

const screens = {
    Welcome: {
        screen: Welcome
    },
    Login: {
        screen: Login
    },
    Signin: {
        screen:SignIn
    },
    Signup: {
        screen: Signup,
    },
    ForgotPassword: {
        screen: ForgotPassword
    },
}


const AuthStack = createStackNavigator(screens);
export default createAppContainer(AuthStack);

