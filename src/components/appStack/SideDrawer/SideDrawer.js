import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import {useContext} from 'react';
import MenuDrawer from 'react-native-side-drawer'
import UserAvatar from 'react-native-user-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { closeDrawer, toggleDrawer } from '../../../store/drawerSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { setGlobalSpinnerOn, setUserToken } from '../../../store/authSlice';
import * as WebBrowser from 'expo-web-browser'
import { makeRedirectUri} from 'expo-auth-session';
import { cognitoSignOut } from '../../../api/nodeApi';


const height = Dimensions.get("window").height

function DrawerItem({navigation, screenName, screenLink}) {
    
    const dispatch = useDispatch()
    
    function handleNavigation() {
        dispatch(closeDrawer())
        navigation.navigate(screenName,{screen: screenLink})
    }
return (
    <View style={styles.itemBtnContainer}>
        <TouchableOpacity onPress={handleNavigation}>
            <Text style={styles.txt}>{screenName}</Text>
        </TouchableOpacity>
    
    </View>
)
}


function Logout({navigation, screenName, screenLink}) {
    const dispatch = useDispatch();
    
    async function handleNavigation() { 
        const res = await cognitoSignOut()
        if(res?.data?.success) {
            WebBrowser.coolDownAsync()
            AsyncStorage.clear()
            dispatch(setUserToken(null))
            dispatch(setGlobalSpinnerOn(false))
        }
        

        
        
        
        
        
    }

return (
    <View style={[styles.logoutContainer]}>
        <TouchableOpacity onPress={handleNavigation}>
            <Text style={styles.txt}>Logout</Text>
        </TouchableOpacity>
    
    </View>
)
}

export default function SideDrawer(props) {
    const colors = useSelector((state) => state.userSlice.colorPalette)
    const {FirstName, LastName, Membership_Status__c, avatarUri} = useSelector((state) => state.userSlice)
    const {totalSavings} = useSelector((state) => state.userPurchasesSlice)
    const {cognitoData} = useSelector((state) => state.cognitoDataSlice)
     
return(
        <ScrollView style={[styles.container, {height: height}]}>
        <LinearGradient
            style={{
                    width: undefined, 
                    padding: 16, 
                    paddingTop: 80, 
                    position: "relative", 
                    marginTop: -60,
                    marginBottom:15,
                }}
                    colors={[colors.main, colors.mainLight]}
                    start={{x: 0.5, y: 0}}
                    end={{x: 1, y: 0.7}}
                >
            <UserAvatar style={styles.profile} size={76} name={`${FirstName} ${LastName}`} src={avatarUri}  />
                <Text style={styles.name}>{`${FirstName} ${LastName}`}</Text>
                <View style={{flexDirection:'row', alignItems:"center"}}>
                    <Text style={styles.savings}>{`Total Savings: $${totalSavings}`}</Text>
                </View>
            </LinearGradient>
            <View style={[styles.subContainer, {height: height * 0.65}]}>
                <View style={styles.listItems}>
                    <DrawerItem {...props} screenName="Profile" />
                    {Membership_Status__c === "Active" && cognitoData["custom:authorizeSubId"] ? <DrawerItem {...props} screenName="Billing" /> : null}
                    <DrawerItem {...props} screenName="Contact Us" /> 
                </View>
                <Logout {...props} />
            </View>
        </ScrollView>
    )
  }

 

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:"100%",
    },
    subContainer: {
        justifyContent:"space-between",
        width:"100%",
    },
    logoutContainer: {
        position:"relative",
        width: "100%",
        height: 80,    
        justifyContent: "center",
        alignItems:"center",
       
    },
    listItems: {
        alignItems: "center",
    },
    txt: {
        fontSize: 18,
        color: "#222222",
    },
    itemBtnContainer: {
        marginTop:15,
    },
    backgroundContainer: {
        width: undefined, 
        padding: 16, 
        paddingTop: 80, 
        position: "relative", 
        marginTop: -60
    },
    profile: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "#FFF"
    },
    name: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "800",
        marginVertical: 8,
    },
    savings: {
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: 13,
        marginRight: 4,
    }

  })