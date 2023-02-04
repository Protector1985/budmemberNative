import { Platform } from "react-native";

let ENDPOINT;
let webFrontend

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    ENDPOINT = Platform.OS === 'ios' ? "http://localhost:5000" : "http://10.0.2.2:5000" // ios || android avd localhost
    webFrontend = 'https://924197ceda6f.ngrok.io'
    

} else {
    //Stag enpoint
    ENDPOINT = "https://api-stag.budmember.com"
}

export {ENDPOINT, webFrontend} 