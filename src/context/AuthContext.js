import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext} from 'react';
import { Alert } from 'react-native';
import { signIn, deleteNullSFEntry } from '../api/nodeApi';
import handleCreateAccount from '../components/authStack/signup/lib/signupHelpers';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [isLoading, setIsLoading] = React.useState(false);
    const [userToken, setUserToken] = React.useState(null);

    
    //sets token for context and stores it in local storage
    async function login(email, password) {
        // setIsLoading(true)

        try {
            var res = await signIn({
                email: email,
                password: password,
              });
              if(!res.data.success) {
                // setIsLoading(false)
                Alert.alert("Wrong Password", "The password you entered didn't match our records") 
                
                } else if(res.data.success) {
                setUserToken(res.data.token)
                AsyncStorage.setItem("userToken", res.data.token)
                // setIsLoading(false)
                
            }
        } catch (err) {
            console.log(err)
        }
    }
    //removes and clears all tokens
    function logout() {
        setIsLoading(true)
        setUserToken(null)
        AsyncStorage.removeItem("userToken")
        setTimeout(() => {
            setIsLoading(false)
        }, 5000)
    }

     async function signUp(email, password, firstName, lastName, birthDayString) {
        setIsLoading(true)
        try {
        
        const res = await handleCreateAccount(email, password, firstName, lastName, birthDayString)
        if(!res?.success) {
            Alert.alert("Something went wrong", "Please close the app and try again")
            const deleteRes = await deleteNullSFEntry(email, res.header);
            if(deleteRes.data.success) {
                setIsLoading(false) 
            } else {
                setIsLoading(false) 
            }
            
        } else if (res?.success) {
            setUserToken(res.token)
            AsyncStorage.setItem("userToken", res?.token);
            setIsLoading(false)
        }
        
    } catch(err) {
        console.log(err)
    }
                
    }

    //runs on initialization of the app with <AuthProvider />
    //checks if user already has a token in storage 
    //sets token for context
    async function isLoggedIn() {
        try {
            setIsLoading(true)
            let userToken = await AsyncStorage.getItem("userToken")
            setUserToken(userToken)
            setIsLoading(false)
        } catch(err) {
            console.log("Is logged in error " + err)
            setIsLoading(false)
        } 
    }

    //calls token check function on first render
    React.useEffect(() => {
        isLoggedIn()
    }, [])

    return (
        <AuthContext.Provider value={{signUp, login, logout, isLoading, userToken, setIsLoading}}>
            {children}
        </AuthContext.Provider>
    )
}