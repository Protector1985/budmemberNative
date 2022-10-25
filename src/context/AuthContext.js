import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [isLoading, setIsLoading] = React.useState(false);
    const [userToken, setUserToken] = React.useState(null);

    //sets token for context and stores it in local storage
    function login() {
        setIsLoading(true)
        setUserToken("kjsdigjnai")
        AsyncStorage.setItem("userToken", "kjsdigjnai")
        setTimeout(() => {
            setIsLoading(false)
        }, 5000)
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
        <AuthContext.Provider value={{login, logout, isLoading, userToken, setIsLoading}}>
            {children}
        </AuthContext.Provider>
    )
}