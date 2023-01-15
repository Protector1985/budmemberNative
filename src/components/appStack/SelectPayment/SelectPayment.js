import axios from 'axios';
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useSelector } from 'react-redux';


function Card({index, selectionIndex, setSelectionIndex, method, ccNumber}) {
    const {colorPalette} = useSelector((state) => state.userSlice)
    function returnCard() {
        switch(method) {
            case "ADD":
                return "Add New Card";
            case "EXISTING":
                return ccNumber
        }
    }


    return (
        <View onPress={() => setSelectionIndex(index)} style={styles.cardContainer}>
            <TouchableOpacity style={[styles.btn,{backgroundColor: selectionIndex === index ? colorPalette.accent : colorPalette.cards}]} onPress={() => setSelectionIndex(index)}>
                <Text style={styles.cardText}>{returnCard()}</Text>
            </TouchableOpacity>
            
        </View>
    )
}


export default function SelectPayment() {
    const [paymentMethods, setPaymentMethods] = React.useState([])
    const [selectionIndex, setSelectionIndex] = React.useState(0)
    const {Email, colorPalette} = useSelector((state) => state.userSlice)
    const {ccNumber} = useSelector((state) => state.ccInfoSlice)
    
    async function fetchCCInfo(Email, cancelToken) {
        const res = await getCreditCardInfo(Email, cancelToken);
        dispatch(setCCInfo({ccNumber: res.data.data.ccNumber.split("").join(' ').replace("x x x x x x x x x x x", "* * * * * * * * "), ccExp: res.data.data.ccExpiration}))  
    }


    React.useEffect(() => {
        if(ccNumber) {
            setPaymentMethods(() => [{type: "EXISTING"}, {type:"ADD"}])
        } else {
            setPaymentMethods(() => [{type:"ADD"}])
        }
    }, [])


React.useEffect(() => {
    //canceltoken for cleanup
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source()
    const cancelToken = source.token
    //fetch
    if(Email) {
        fetchCCInfo(Email, cancelToken)
    }
    //cleanup
    return () => {
        source.cancel()
    }
  }, [Email])

    return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headline}>Select a payment method</Text>
            </View>
            <FlatList
                data={paymentMethods}
                renderItem={({item, index}) => <Card selectionIndex={selectionIndex} ccNumber={ccNumber} index={index} setSelectionIndex={setSelectionIndex} method={item.type}/>}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    btn: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    headline: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
    },
    cardText: {
        color: "white",
        fontSize: 23,
    },
    cardContainer: {
        width: "90%",
        height: 180,
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
    },
    headerContainer: {
        width:"90%",
        marginLeft: "auto",
        marginRight: "auto",
    }

})