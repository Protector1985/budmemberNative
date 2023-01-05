import * as Progress from 'react-native-progress';
import {View, Text, StyleSheet} from 'react-native';
import React from 'react';


export default function ProgressBar({initProgress}) {
    const text = initProgress.message;
    const progress = initProgress.progress
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        if(initProgress && initProgress.stepsLeft > 0) {
            setOpen(true)
        } else if(initProgress && initProgress.stepsLeft === 0) {
            setTimeout(() => {
                setOpen(false);
            },600)
        } else {
            setOpen(false)
        }
    },[initProgress])
    return (
        open ?
        <View style={styles.container}>
            <View style={styles.centerContainer}>
                <Progress.Bar style={{zIndex:10001}} color="#2E306F" progress={progress} width={200} />  
                <Text style={styles.text}>{text}</Text>
            </View>  
        </View> : null
        
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        zIndex: 10000
    },
    centerContainer: {
        alignItems: "center"
    },
    text: {
        fontSize: 15,
        fontWeight: "600",
        color: "#2E306F",
        marginTop: 10
    }
   

})