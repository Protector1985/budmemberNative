import { View, StyleSheet, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function PlanSelect() {
    return (
        <SafeAreaView style={styles.masterContainer}>

           
                <View style={styles.headerContainer}>
                    <Text>Select your Plan</Text>
                    <Text>Lorem Ipsum text here to learn more about the products</Text>
                </View>
                <View style={styles.cardContainer}>
                
                </View>

                <View style={styles.buttonContainer}>

                
                </View>
            
      
            
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    masterContainer: {
        flex: 1,
    },
   
    headerContainer: {
        flex: 1,
        backgroundColor: "black"
    },
    cardContainer: {
        flex: 3,
        backgroundColor: "blue",
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: "purple",
    }

})