import { TouchableOpacity, Text, StyleSheet} from "react-native";
import {useFonts} from 'expo-font'

export default function ContinueButton({pressed, disabled}) {
    

    return(
        <TouchableOpacity disabled={disabled} onPress={() => pressed()} style={styles.btnContainer}>
            <Text style={styles.btn}>Continue</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        width: "40%",
        borderRadius:20,
        backgroundColor: "#2da491",
        padding: 10,
        
        
    },
    btn : {
        fontWeight: "bold",
        fontSize: 16,
        color: "#fff",
        fontFamily: "Roboto-Regular",
        textAlign: "center",
        
    }
})