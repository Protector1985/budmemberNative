import { Platform } from "react-native";
import { makeRedirectUri} from 'expo-auth-session';

let ENDPOINT;
let webFrontend;
let redirectURI

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    ENDPOINT = Platform.OS === 'ios' ? "http://localhost:5000" : "http://10.0.2.2:5000" // ios || android avd localhost
    webFrontend = 'https://bca53cc6ae81.ngrok.io'
    redirectURI = Platform.OS === 'ios' ? "exp://192.168.194.44:19000/--/status" : "exp://192.168.194.132:19000/--/status"

} else {
    //Stag enpoint
    ENDPOINT = "https://api-stag.budmember.com"
    webFrontend ="https://stag.budmember.com"
    redirectURI = "com.application.budmember://status"
    
}

export {ENDPOINT, webFrontend, redirectURI} 