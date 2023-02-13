import {View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity, SafeAreaView} from 'react-native';

import { FontAwesome } from '@expo/vector-icons'; 
import UserAvatar from 'react-native-user-avatar';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import Profile from '../Profile/Screens/Profile';
import Billing from '../Billing/Billing';
import AsyncStorage from '@react-native-async-storage/async-storage';



function DrawerItem({navigation, screenName, screenLink}) {
        function handleNavigation() {
 
            navigation.jumpTo(screenName,{screen: screenLink})
        }
    return (
        <View>
            <TouchableOpacity onPress={handleNavigation}>
                <Text style={styles.txt}>{screenName}</Text>
            </TouchableOpacity>
        
        </View>
    )
}



  export default function DrawerContent(props) {
    const colors = useSelector((state) => state.userSlice.colorPalette)
    const {open} = useSelector((state)=> state.drawerSlice)
    return(
        <SafeAreaView style={styles.container}>
        <LinearGradient
        style={{
            width: undefined, 
            padding: 16, 
            paddingTop: 80, 
            position: "relative", 
            marginTop: -60
            }}
            colors={[colors.main, colors.mainLight]}
            start={{x: 0.5, y: 0}}
            end={{x: 1, y: 0.7}}
            >
            <UserAvatar style={styles.profile} size={76} name={`${props.FirstName} ${props.LastName}`} src={props.avatarUri}  />
                <Text style={styles.name}>{`${props.FirstName} ${props.LastName}`}</Text>
                <View style={{flexDirection:'row', alignItems:"center"}}>
                    <Text style={styles.savings}>$1045 Saved</Text>
                </View>
            </LinearGradient>
            <View style={styles.listContainer}>
                <DrawerItem {...props} screenName="Profile" />
                <DrawerItem {...props} screenName="Billing" />
               
            </View>
            
        </SafeAreaView>
    )
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 1000000,
    },
    drawerBottom: {
        height: 200,
        width: "100%",
        backgroundColor:"black",
        marginTop: "auto",
    },
    listContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"blue"
    },
    txt: {
        fontSize: 20,
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