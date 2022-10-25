import { ActivityIndicator, View, StyleSheet } from "react-native";

export default function Spinner() {

    return(
        <View style={styles.masterContainer}>
        <ActivityIndicator size={'large'} />
        </View>
    )
}

const styles = StyleSheet.create({
    masterContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
        backgroundColor: "#2a1b6e",
      }
})