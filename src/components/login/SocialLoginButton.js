
import { TouchableOpacity, StyleSheet, Text, Image } from "react-native"

export default function SocialLoginButton({socialIcon, socialDescription}) {

    return (
        <TouchableOpacity style={styles.button}>
            <Image style={styles.socialIcon} source={socialIcon}/>
            <Text style={styles.txt}>{socialDescription}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    
    button: {
        marginTop: 30,
        flexDirection: "row",
        alignItems: "space-around",
        justifyContent: "space-around",
        backgroundColor: "#fff",
        paddingRight: 65,
        paddingLeft: 30,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius:20,
    },
    socialIcon : {
        resizeMode: "contain",
        height: 19,
        
    },
    txt: {
        fontSize: 17,
    }
})