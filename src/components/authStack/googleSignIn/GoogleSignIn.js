import React from 'react';
import * as WebBrowser from 'expo-web-browser'
import { makeRedirectUri, useAuthRequest, ResponseType} from 'expo-auth-session';
import { Alert, Platform } from 'react-native';
import jwt_decode from "jwt-decode";
import SocialLoginButton from "../login/SocialLoginButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../../context/AuthContext';
import { googleSignin } from '../../../api/nodeApi';


WebBrowser.maybeCompleteAuthSession()

export default function GoogleSignIn({navigation}) {

    const {setUserToken} = React.useContext(AuthContext);
    const discoveryDocument = {
        authorizationEndpoint: "https://budmember-prod.auth.us-west-2.amazoncognito.com/login"
    }

    const useProxy = true

    
    const respType = ResponseType.Token
    


    const [request, response, promptAsync] = useAuthRequest({
        clientId: "2o54hoh2kq8t2v4e2dqom8866t",
        scopes: ['email', 'openid', 'aws.cognito.signin.user.admin', 'profile'],
        responseType: "token",
        redirectUri: makeRedirectUri({
            scheme: "com.native.budmember",
            useProxy
        })},
        discoveryDocument
    )
   
   

  

    React.useEffect(() => {
        if (response) {
          if (response.error) {
            Alert.alert(
              'Authentication error',
              response.params.error_description || 'something went wrong'
            )
            return
          }
          if (response.type === 'success') {

            
            const decoded = jwt_decode(response.params.access_token)
            
            
            googleSignin(decoded)
                .then((res) => {
                    if(res.data.success) {
                        AsyncStorage.setItem("userToken", res.data.token)
                        setUserToken(res.data.token)
                    } else {
                        console.log("Something went wrong")
                    }
                })
         
          }
        }
      }, [response])

    // `https://${process.env.REACT_APP_COGNITO_DOMAIN}/oauth2/authorize?identity_provider=Google&redirect_uri=${process.env.REACT_APP_CLIENT_LOGIN_URL}&response_type=TOKEN&client_id=${process.env.REACT_APP_COGNITO_USER_POOL_WEB_CLIENT_ID}&scope=aws.cognito.signin.user.admin email openid phone profile`
    
    return(
        <SocialLoginButton click={() => promptAsync({useProxy: true, showInRecents: true})} socialIcon={require("../../../assets/pictures/google.png")} socialDescription={"Continue with Google"} type="GOOGLE" />
    )
}