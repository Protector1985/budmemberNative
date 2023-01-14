import {Text, View, ScrollView, SafeAreaView, StyleSheet, Image} from 'react-native'



export default function Billing(props) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
            <Image style={styles.img} source={require("../../../assets/pictures/logo_white.png")} />
                <View style={styles.paymentContainer}>
                    <Text style={styles.headline}>Payment Method</Text>
                    <View style={styles.paymentMethod}>
                        <Text style={styles.boxText}>**** **** **** 2800</Text>
                    </View>
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
        width: "90%",
        height: 80,
        resizeMode: "contain",
    },
    paymentContainer: {
        marginLeft: "auto",
        marginRight: "auto",
        width:"90%",
        height: 120,
    },
    paymentMethod: {
        width: "100%",
        height: "100%",
        backgroundColor: "#EDF8F3",
        borderRadius: 8,
    },
    headline: {
        fontSize: 20,
        fontWeight: "600"
    },
    boxText: {
        fontSize: 25,
    }
})