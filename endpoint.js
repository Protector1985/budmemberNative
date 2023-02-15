import { Platform } from "react-native";

let ENDPOINT;
let webFrontend

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    ENDPOINT = Platform.OS === 'ios' ? "http://localhost:5000" : "http://10.0.2.2:5000" // ios || android avd localhost
    webFrontend = 'https://bca53cc6ae81.ngrok.io'
    

} else {
    //Stag enpoint
    ENDPOINT = "https://api-stag.budmember.com"
    webFrontend ="https://stag.budmember.com"
}

export {ENDPOINT, webFrontend} 