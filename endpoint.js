let ENDPOINT;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    ENDPOINT = Platform.OS === 'ios' ? "http://localhost:5000" : "http://10.0.2.2:5000" // ios || android avd localhost
} else {
    //Stag enpoint
    ENDPOINT = "https://api-stag.budmember.com"
}

export default ENDPOINT