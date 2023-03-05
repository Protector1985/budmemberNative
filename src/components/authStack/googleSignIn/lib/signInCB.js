import AsyncStorage from "@react-native-async-storage/async-storage";


export default function signInCallBack(res, dispatch, setLoading, setGlobalSpinnerOn, setUserToken, navigation) {
    try {

        if(res) {
            if(res?.data?.success) {
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
        } else if(url) {
            
        }
    } catch (err) {
        console.log(err)
    }
}