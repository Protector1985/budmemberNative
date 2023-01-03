import { SafeAreaView, Text, TextInput, View, KeyboardAvoidingView, StyleSheet} from "react-native"
import React from 'react';

export default function BillingForm() {
    const [streetAddress, setStreetAddress] = React.useState("");
    const [city, setCity] = React.useState("");
    const [zip, setZip] = React.useState("");

    return (
        <SafeAreaView style={styles.container} >
            <KeyboardAvoidingView style={styles.inputContainer}>
            <TextInput autoComplete={'street-address'} value={streetAddress} onChangeText={(text) => setStreetAddress(() => text)} style={styles.inputField}  />
            <TextInput autoComplete={'postal-address-locality'} value={city} onChangeText={(text) => setCity(() => text)} style={styles.inputField}  />
            <TextInput autoComplete={'postal-code'} value={zip} onChangeText={(text) => setZip(() => text)} style={styles.inputField}  />     
                
            </KeyboardAvoidingView>
        
        </SafeAreaView>

    )
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    inputContainer: {
        flex: 1,
    },
    inputField: {
        width: "90%",
        height: 45,
        borderColor: "grey",
        borderWidth: 1,
        marginLeft:"auto",
        marginRight: "auto",
        borderRadius: 8

    }
})