import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
const ENDPOINT = "https://api-stag.budmember.com"

const setToken = (headers = {}) => {
    const newHeaders = { ...headers }
    const token = AsyncStorage.getItem("userToken")
    newHeaders["Authorization"] = `Bearer ${token}`
    return newHeaders
}

//allows to find a user by email. : String:email
export const findUser = async (email) => {  
    try {
        const user = await axios.get(ENDPOINT + `/find-user/${email}`)
        return user
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

export const updateUser = async (updateDetails, headers) => {  
    try {
        const updateUserRes = await axios.patch(ENDPOINT + "/user", updateDetails,  {headers} )
        return updateUserRes
    } catch (err) {
        console.log(err)
        return err.response;
    }
}

export const deleteNullSFEntry = async (email, headers) => {  
    try {
        const deletionResponse = await axios.post(ENDPOINT + "/deleteNullSf", {email: email},  {headers} )
        return deletionResponse
    } catch (err) {
        console.log(err)
        return err.response;
    }
}