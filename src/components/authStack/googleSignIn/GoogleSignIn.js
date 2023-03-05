import React from 'react';
import * as WebBrowser from 'expo-web-browser'
import { makeRedirectUri, useAuthRequest, ResponseType} from 'expo-auth-session';
import { Alert, Platform } from 'react-native';
import SocialLoginButton from "../login/SocialLoginButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking'
import { googleSignin } from '../../../api/nodeApi';
import { useDispatch } from 'react-redux';
import { setGlobalSpinnerOn, setUserToken } from '../../../store/authSlice';
import Expo from 'expo'
import { redirectURI } from '../../../../endpoint';
import signInCallBack from './lib/signInCB';
import tokenDecoder from './lib/tokenDecoder';




export default function GoogleSignIn({setLoading, navigation}) {
   const dispatch = useDispatch();
   const redirect = makeRedirectUri({
        scheme:"com.application.budmember",
        useProxy: true
    })
   const ur = `https://budmember-prod.auth.us-west-2.amazoncognito.com/oauth2/authorize?identity_provider=Google&redirect_uri=${redirectURI}&response_type=TOKEN&client_id=2o54hoh2kq8t2v4e2dqom8866t&scope=aws.cognito.signin.user.admin`

    //-----Android only
    const responseURL = Linking.useURL()
    React.useEffect(() => {
        if(Platform.OS !== "ios") {
            const decoded = tokenDecoder(responseURL)
            googleSignin(decoded)
                .then((res) => signInCallBack(res, dispatch, setLoading, setGlobalSpinnerOn, setUserToken, navigation))  
        } 
        
        },[responseURL])
    // end of Android only

    

    

    
    
        async function handleSubmit() {   
            try {
            dispatch(setGlobalSpinnerOn(true))
            const result = await WebBrowser.openAuthSessionAsync(ur, redirect, {preferEphemeralSession: true}) 
            const decoded = tokenDecoder(result?.url)
            
            //ios only
            googleSignin(decoded)
                .then((res) => signInCallBack(res, dispatch, setLoading, setGlobalSpinnerOn, setUserToken, navigation))
            // end of ios only
            }catch(err) {
                console.log(err)
            }
        }
        
    
    return(
        <SocialLoginButton setLoading={setLoading} click={() => handleSubmit() } socialIcon={require("../../../assets/pictures/google.png")} socialDescription={"Continue with Google"} type="GOOGLE" />
    )
}



