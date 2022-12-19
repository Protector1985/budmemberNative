import {View, Text, ImageBackground, StyleSheet, Image} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
  } from '@react-navigation/drawer';
  import { FontAwesome } from '@expo/vector-icons'; 

  export default function DrawerContent(props) {
    
    return(
        <DrawerContentScrollView style={styles.container}>
            <ImageBackground 
                source={require("../../../assets/pictures/splash6.jpg")} 
                style={styles.backgroundContainer}
            >
                <Image style={styles.profile} source={require("../../../assets/pictures/profilePic.jpg")} />
                <Text style={styles.name}>Michael Braun</Text>
                <View style={{flexDirection:'row', alignItems:"center"}}>
                    <Text style={styles.savings}>$1045 Saved</Text>
                </View>
            </ImageBackground>
            <View style={styles.container}>
                <DrawerItemList {...props} />
            </View>
        </DrawerContentScrollView>
    )
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
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