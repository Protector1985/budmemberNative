import {View, Text, SafeAreaView, Image, StyleSheet, FlatList} from 'react-native'
import { useSelector } from 'react-redux'
import moment from 'moment'

function PurchaseItem({dispensary, purchasePrice, saved, uri, date}) {
    const {colorPalette} = useSelector((state) => state.userSlice);
    return (
        <View style={styles.purchaseItemContainer}>
            <View style={styles.subContainer}>
                <View style={styles.imgContainer}>
                    <Image style={{width: 85, height: 85}} source={{uri: uri}} />
                </View>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.txtNormal}>{dispensary}</Text>
                    <Text style={styles.txtNormal}>{moment(date).format('ddd MMMM DD YYYY')}</Text>
                    <Text style={styles.txtNormal}>{`$${purchasePrice}`}</Text>
                    <Text style={[styles.txtNormal, {color: colorPalette.accent}]}>{`Saved: $${saved}`}</Text>
                </View>
            </View>
        </View>
    )
}




export default function PurchaseHistory() {
    const {purchaseData, totalSavings} = useSelector((state) => state.userPurchasesSlice);

    const savedArr = purchaseData.map(({savedAmount}) => savedAmount)
    const savings = savedArr.reduce((a, b) => a + b, 0)
    
    return (
        <SafeAreaView style={styles.container}>
                <View style={styles.headContainer}>
                    <Text style={styles.headline}>Purchase History</Text>
                    <Text>{`Total Savings: $${totalSavings}`}</Text>
                </View>
               
                <FlatList 
                    data={purchaseData}
                    renderItem={({item}) => {
                        return <PurchaseItem date={item.date} uri={item.storeImg} dispensary={item.dispensaryName} purchasePrice={item.totalAmount} saved={item.savedAmount}/>
                    }}
                />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    headContainer: {
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 30,
    },
    headline: {
        fontSize: 28,
    },
    totalSavings: {
        fontSize: 16,
        color: "#222222",
    },
    subContainer: {
        marginBottom: 15,
        marginTop: 25,
        flexDirection:"row",
        justifyContent: "space-around",
        width: "100%"
    },
    txtNormal: {
        fontSize: 17,
        fontWeight: "400",
        marginBottom: 4,
        color: "#222222",
    },
    purchaseItemContainer: {
        marginLeft: "auto",
        marginRight: "auto",
        flexDirection: "row",
        width: "80%",
        borderBottomColor: "#222222",
        borderBottomWidth: 1,
    },
   
    descriptionContainer: {

    }
})