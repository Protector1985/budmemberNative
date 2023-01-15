import {StyleSheet, Text, View, TouchableOpacity, Touchable} from 'react-native'
import { useSelector } from "react-redux"


export default function UpgradeInfo({navigation}) {
   
    const {colorPalette} = useSelector((state) => state.userSlice)
    return (
        <View style={styles.btnContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Payment Method")} style={[styles.btn, {backgroundColor: colorPalette.accent}]}>
                <Text style={styles.text}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        width: "90%",
        height: 70,
        marginLeft: "auto",
        marginRight: "auto",
    },
    btn: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    text: {
        color: "white",
        fontSize: "18",

    }
})