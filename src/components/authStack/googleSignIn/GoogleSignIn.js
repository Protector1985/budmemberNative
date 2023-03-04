import React from 'react';
import * as WebBrowser from 'expo-web-browser'
import { makeRedirectUri, useAuthRequest, ResponseType} from 'expo-auth-session';
import { Alert, Platform } from 'react-native';
import jwt_decode from "jwt-decode";
import SocialLoginButton from "../login/SocialLoginButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking'
import { googleSignin } from '../../../api/nodeApi';
import { useDispatch } from 'react-redux';
import { setGlobalSpinnerOn, setUserToken } from '../../../store/authSlice';




export default function GoogleSignIn({setLoading, navigation}) {
   const dispatch = useDispatch();
    
    
    const discoveryDocument = {
        authorizationEndpoint: "https://budmember-prod.auth.us-west-2.amazoncognito.com/oauth2/authorize",
        request_uri_parameter_supported: true
    }

  

    // `https://${process.env.REACT_APP_COGNITO_DOMAIN}/oauth2/authorize?identity_provider=Google&redirect_uri=${process.env.REACT_APP_CLIENT_LOGIN_URL}&response_type=TOKEN&client_id=${process.env.REACT_APP_COGNITO_USER_POOL_WEB_CLIENT_ID}&scope=aws.cognito.signin.user.admin email openid phone profile`

    const useProxy = true
    
    const [request, response, promptAsync] = useAuthRequest({
        clientId: "2o54hoh2kq8t2v4e2dqom8866t",  
        extraParams: {identity_provider: "Google"},
        scopes: ['aws.cognito.signin.user.admin'],
        responseType: "token",
        redirectUri: makeRedirectUri({
            scheme:"com.application.budmember",
            useProxy: true
        })
        },
        discoveryDocument
    )
    
        
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
                        setLoading(true)
                        dispatch(setGlobalSpinnerOn(true))
                        AsyncStorage.setItem("userToken", res.data.token)
                        dispatch(setUserToken(res.data.token))
                        
                        setTimeout(()=> {
                            console.log("processed")
                            navigation.navigate("AppStack", "Map")
                        }, 2000)
                        
                    } else {
                        console.log("Something went wrong")
                    }
                })
         
          }
        }
    
    
    return(
        <SocialLoginButton setLoading={setLoading} click={() => promptAsync({useProxy: true, showInRecents: true})} socialIcon={require("../../../assets/pictures/google.png")} socialDescription={"Continue with Google"} type="GOOGLE" />
    )
}



