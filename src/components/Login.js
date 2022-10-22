import { StatusBar } from "expo-status-bar";
import {StyleSheet, Text, View} from 'react-native';

export default function Login() {

    return (
        <View style={styles.masterContainer}>
            <Text style={styles.text}>Login</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    masterContainer: {
        backgroundColor:"#2a1b6e",
        justifyContent: "center",
        height: "100%",
        width: "100%", 
    },
    text: {
        color: "#fff",
    }
})