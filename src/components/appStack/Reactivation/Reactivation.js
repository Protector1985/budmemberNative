import {View, Text, SafeAreaView, ScrollView, StyleSheet, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

export default function Reactivation({navigation}) {
    const {colorPalette} = useSelector((state) => state.userSlice);
    return (
        <SafeAreaView style={styles.container} >
                <ScrollView style={styles.scrollContainer}>
                <Image style={styles.img} source={require("../../../assets/pictures/logo_white.png")} />
                    <Text style={styles.notificationText}>Your membership is expired. Please reactivate it below</Text>
                
                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate("Select Plan")} style={[styles.btn, {backgroundColor: colorPalette.accent}]}>
                            <Text style={styles.btnText}>Reactivate</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    scrollContainer: {
        minHeight: "100%",
    },
    img: {
        resizeMode: "contain",
        width: "90%",
        height: 100,
        marginTop: "10%",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom:"10%",
    },
    btnContainer: {
        width: "90%",
        height: 50,
        marginLeft:"auto",
        marginRight: "auto",
    },
    btn: {
        width: "100%",
        height: "100%",
        backgroundColor: "#2CA491",
        alignItems: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    btnText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
    },
    notificationText: {
        fontSize: 17,
        marginBottom: "15%",
    }
})