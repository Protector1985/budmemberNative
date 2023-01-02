import {Platform, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { VideoExportPreset } from 'expo-image-picker';
// const ENDPOINT = Platform.OS === 'ios' ? "http://localhost:5000" : "http://10.0.2.2:5000" // ios || android avd localhost

const ENDPOINT = "https://api-stag.budmember.com"

const setToken = async (headers = {}) => {
    const newHeaders = { ...headers }
    const token = await AsyncStorage.getItem("userToken")
    newHeaders["Authorization"] = `Bearer ${token}`
    return newHeaders
}

//allows to find a user by email. : String:email
export const findUser = async (email) => {  
    try {
        const route = ENDPOINT + "/testRoute"
        const user = await axios.get(ENDPOINT + `/find-user/${email}`)
        
        return user
    } catch (err) {
        console.log(err)
    }
}

//user signin via email and password : Obj{email, password}
export const signIn = async (signInObject) => {
    try {
        const serverResponse = await axios.post(ENDPOINT + "/user/login", signInObject)
        return serverResponse
    } catch (err) {
        console.error(err)
    }
}

export const signUp = async (signUpObject) => {
    try {
        const serverResponse = await axios.post(ENDPOINT + "/user/register", signUpObject)
        return serverResponse
    } catch (err) {
        console.error(err)
    }
}

export const updateUser = async (updateDetails, header) => {
    const headers = header ? header : await setToken()
    console.log(updateDetails)
    try {
        const updateUserRes = await axios.patch(ENDPOINT + "/user", updateDetails,  {headers} )
        return updateUserRes
    } catch (err) {
        console.log(err)
        return err.response;
    }
}




export const fetchMyself = async () => {
    try {
        const headers = await setToken()
        const user = await axios.get(ENDPOINT + "/user", { headers })    
        return user
    } catch (err) {
        console.log(err)
    }
}

export const sendAvatarPicture = async (file) => {
    const headers = await setToken()
    try {
        const res = await axios.post(`${ENDPOINT}/sendAvatarPicture`, file, { headers });
        return res
    } catch (err) {
        console.log(err);
    }

}

export const colorScheme = async (colors, email) => {
    const headers = await setToken()
    try {
        const res = await axios.post(`${ENDPOINT}/colorScheme`, {colors: JSON.stringify(colors), email: email}, { headers });
        return res
    } catch (err) {
        console.log(err);
    }
}

export const fetchPackages = async () => {
    const headers = await setToken();
   
    try {
        const res = await axios.post(`${ENDPOINT}/packagesByStore`, {}, { headers })
        return res
    } catch(err) {
        console.log(err)
    }
}

export const findMemberByPhone = async (memberObj) => {
    const headers = await setToken();
    try {
        const res = axios.post(`${ENDPOINT}/user/findMemberByPhone`, memberObj ,{ headers })
        return res
    } catch (err) {
        console.log(err)
    }
}

export const phoneNumberVerification = async (verifyObject) => {
    try {
        const headers = await setToken()
        const verifyResponse = await axios.post(ENDPOINT + '/twilio/validate-code', verifyObject, { headers })
        return verifyResponse
    } catch (err) {
        console.error(err)
    }
}