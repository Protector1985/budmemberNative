import {Platform, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { VideoExportPreset } from 'expo-image-picker';
import ENDPOINT from '../../endpoint';


const setToken = async (headers = {}) => {
    const newHeaders = { ...headers }
    const token = await AsyncStorage.getItem("userToken")
    newHeaders["Authorization"] = `Bearer ${token}`
    return newHeaders
}

export const getCreditCardInfo = async (email, cancelToken) => {
    try {
        const headers = await setToken();
        const creditCardInfo = await axios.post(ENDPOINT + "/ccInfo", {email}, {headers, cancelToken})
        return creditCardInfo
    } catch (err) {
        console.log(err)
    }
}

export const upgradeMembership = async (dataPackage) => {
    try {
        const headers = await setToken()
        const res = await axios.post(ENDPOINT + "/upgradeSubscription", dataPackage, { headers })
        return res
    } catch (err) {
        return err;
    }
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

//sends contact email
export const userContact = async (data) => {
    try{
        const headers = await setToken()
        const contact = await axios.post(ENDPOINT + "/user/contact",data,{headers});
        return contact
    } catch (err) {
        console.error(err)
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

export const createNewSubscription = async (newSubscriptionObject) => {
    try {
        const headers = await setToken()
        const newSubCreationRes = await axios.post(ENDPOINT + "/subscription", newSubscriptionObject, { headers })
        return newSubCreationRes
    } catch (err) {
        return err.response;
    }
}

export const getCognitoUser = async (email) => {
    try {
        const headers = await setToken()
        const cognito = await axios.post(ENDPOINT + "/getCognitoUser", {email: email}, { headers })
        return cognito
    } catch (err) {
        return err.response;
    }
}

export const fetchDispensaries = async (lat, lng, radius, searchQuery) => {
    try {
        const dispensaries = await axios.get(
            `${ENDPOINT}/dispensaries/?lat=${lat}&lng=${lng}&radius=${radius}&searchQuery=${searchQuery}`
        );
        return dispensaries;
    } catch (err) {
        console.error(err);
    }
};

export const fetchAllDispensaries = async () => {
    try {
        const allDispensaries = await axios.get(ENDPOINT + "/alldispensaries")
        return allDispensaries
    } catch (err) {
        console.error(err)
    }
}

export const fetchDispensary = async (dispensaryId) => {
    try {
        const dispensary = await axios.get(ENDPOINT + `/dispensary/${dispensaryId}`)
        return dispensary
    } catch (err) {
        console.error(err)
    }
}


export const fetchDispensaryDetails = async (data) => {
    try{
        const headers = await setToken()
        const details = await axios.get(ENDPOINT + `/user/dispensary/${data.Id}`,{headers})
        return details
    }catch(err){
        console.log(err.response)
        return err.response
    }
}
