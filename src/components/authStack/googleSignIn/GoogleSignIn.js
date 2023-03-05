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
import Expo from 'expo'
import { redirectURI } from '../../../../endpoint';




export default function GoogleSignIn({setLoading, navigation}) {
   const dispatch = useDispatch();


    const discoveryDocument = {
        authorizationEndpoint: "https://budmember-prod.auth.us-west-2.amazoncognito.com/oauth2/authorize",
        request_uri_parameter_supported: true
    }

    const redirect = makeRedirectUri({
        scheme:"com.application.budmember",
        useProxy: true
    })

    const ur = `https://budmember-prod.auth.us-west-2.amazoncognito.com/oauth2/authorize?identity_provider=Google&redirect_uri=${redirectURI}&response_type=TOKEN&client_id=2o54hoh2kq8t2v4e2dqom8866t&scope=aws.cognito.signin.user.admin`

    
        async function handleSubmit() {
            // promptAsync({useProxy: true, showInRecents: true})
            const result = await WebBrowser.openAuthSessionAsync(ur, redirect, {preferEphemeralSession: true})
            
            const access_token = result?.url?.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
        
            const decoded = jwt_decode(access_token)
        
            googleSignin(decoded)
                .then((res) => {
                    if(res.data.success) {
                        setLoading(true)
                        dispatch(setGlobalSpinnerOn(true))
                        AsyncStorage.setItem("userToken", res.data.token)
                        dispatch(setUserToken(res.data.token))
                        
                        setTimeout(()=> {
                            navigation.navigate("AppStack", "Map")
                        }, 2000)
                        
                    } else {
                        console.log("Something went wrong")
                    }
                })
            
            dispatch(setGlobalSpinnerOn(true))
        }
        
    
    return(
        <SocialLoginButton setLoading={setLoading} click={() => handleSubmit() } socialIcon={require("../../../assets/pictures/google.png")} socialDescription={"Continue with Google"} type="GOOGLE" />
    )
}



