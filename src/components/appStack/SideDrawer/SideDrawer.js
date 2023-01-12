import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import MenuDrawer from 'react-native-side-drawer'
import UserAvatar from 'react-native-user-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { closeDrawer, toggleDrawer } from '../../../store/drawerSlice';
const height = Dimensions

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

export default function SideDrawer(props) {
    const colors = useSelector((state) => state.userSlice.colorPalette)

return(
        <ScrollView style={styles.container}>
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
            <UserAvatar style={styles.profile} size={76} name={`${props.FirstName} ${props.LastName}`} src={props.avatarUri}  />
                <Text style={styles.name}>{`${props.FirstName} ${props.LastName}`}</Text>
                <View style={{flexDirection:'row', alignItems:"center"}}>
                    <Text style={styles.savings}>$1045 Saved</Text>
                </View>
            </LinearGradient>
            <View style={styles.listItems}>
                <DrawerItem {...props} screenName="Profile" />
                <DrawerItem {...props} screenName="Billing" />
                <DrawerItem {...props} screenName="Contact Us" />
            </View>
        </ScrollView>
    )
  }

 

  const styles = StyleSheet.create({
    container: {
        flex: 1,
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