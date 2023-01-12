import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 


export default function Shortcut({iconName, name, callback}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={callback} style={styles.btn}>
                <MaterialIcons name={iconName} size={40} color="#399cbd" />
                <Text style={styles.text}>{name}</Text>
            </TouchableOpacity>  
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 80,
        backgroundColor: "#add8e6",
        borderRadius: 8,
        
    },
    btn: {
        height: "100%",
        width:"100%",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#30839f",
        fontSize: 16,
        fontWeight: "600"
    }
})