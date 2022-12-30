import React from 'react';
import { View, StyleSheet, Text, Dimensions, Platform } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Carousel from 'react-native-reanimated-carousel';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';
import { withAnchorPoint } from "../lib/withAnchorPoint";
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from "react-redux";
import { Button } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import {ExpandingDot} from "react-native-animated-pagination-dots";


function Card({animationValue, index, colorPalette}) {
    const WIDTH= Dimensions.get('window').width / 1.1;
    const HEIGHT = Dimensions.get('window').height / 1.5;
    const cs = useSelector((state) => state.userSlice?.colorPalette)
    // const cs = useSelector((state) => state.userSlice?.colorPalette["triadic"]['secondary'])
    const colors = [cs["100"], cs["200"], cs["300"]]
    
  
    const cardStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            animationValue.value,
            [-0.1, 0, 1],
            [0.95, 1, 1],
            Extrapolate.CLAMP
        );

        const translateX = interpolate(
            animationValue.value,
            [-1, -0.2, 0, 1],
            [0, WIDTH * 0.3, 0, 0]

        );

        const transform = {
            transform: [
                { scale },
                { translateX },
                { perspective: 200 },
                {
                    rotateY: `${interpolate(
                        animationValue.value,
                        [-1, 0, 0.4, 1],
                        [30, 0, -25, -25],
                        Extrapolate.CLAMP
                    )}deg`,
                },
            ],
        }
        return {
            ...withAnchorPoint(
                transform,
                { x: 0.5, y: 0.5 },
                { width: WIDTH, height: HEIGHT }
            ),
        };
    }, [index]);

    return (
        <Animated.View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                
            }}
        >
        <Animated.View
            style={[
                {
                    backgroundColor: cs["50"],
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                    width: WIDTH,
                    height: "85%",
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: 0.44,
                    shadowRadius: 8.32,
                    elevation: 10,
                },
                cardStyle,
            ]}
        />

    </Animated.View>
    )


}

export default function PlanSelect() {
    const {colorPalette} = useSelector((state) => state.userSlice)
    const width = Dimensions.get('window').width;

    const scrollX = React.useRef(new Animated.Value(0)).current;
    const cs = useSelector((state) => state.userSlice?.colorPalette["complementary"])
    

    const carouselItems = [
        {
            title:"Item 3",
            text: "Text 3",
        },
        {
            title:"Item 4",
            text: "Text 4",
        },
        {
            title:"Item 5",
            text: "Text 5",
        },
    ]
    return (
       
            <LinearGradient 
                colors={[colorPalette['500'], colorPalette['400']]}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                style={styles.masterContainer}
            >
           
                <View style={styles.headerContainer}>
                    <Text style={[styles.headline, {color:cs["50"]}]}>Select your Plan</Text>
                </View>
                <View style={styles.cardContainer}>
                <Carousel
                    loop
                    width={width}
                    autoPlay={false}
                    data={carouselItems}
                    pagingEnabled={true}
                    withAnimation={{
                        type: 'spring',
                        config: {
                            damping: 12,
                        },
                    }}
                    scrollAnimationDuration={1000}
                    onSnapToItem={(index) => console.log('current index:', index)}
                    renderItem={({ index, animationValue }) => {
                        return <Card 
                                key={index}
                                index={index} 
                                animationValue={animationValue} 
                                colorPalette={colorPalette}
                                
                                />
                    }
                        
                    }
                    />            
                </View>

                

                <View style={styles.buttonContainer}>

                    {Platform.OS === "ios"? 
                        <IosButton textColor={cs["50"]} color={colorPalette["A700"]} />
                    :
                        <AndroidButton textColor={cs["50"]} color={colorPalette["A700"]} />
                    }
                
                </View>
                </LinearGradient>
       

    )
}

function IosButton({color, textColor}) {
    console.log(textColor)
    return(
        <TouchableOpacity style={[styles.btn,{backgroundColor: color}]}>
            <Text style={[styles.btnText, {color: textColor}]}>Select</Text>
        </TouchableOpacity>
    )
}

function AndroidButton(color, textColor) {
    return(
        <TouchableOpacity style={[styles.btn,{backgroundColor: color, color: textColor}]}>
            <Text style={styles.btnText}>Select</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    masterContainer: {
      flex:1,
   
    },
    btnText: {
        fontSize: 23,
        
       
    },
    btn: {
        width: "90%",
        height: 55,
        borderRadius: 8,
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: "center",
        alignItems: "center",
        color: "white"
    },
    gradientContainer: {
        height: "100%",
    },
    headerContainer: {
        flex: 1,
        justifyContent: "center"
        // backgroundColor: "black"
    },
    headline: {
        fontSize:29,
        alignSelf: "center",
        marginTop: 15,
    },
    cardContainer: {
        flex: 6,
    },
    buttonContainer: {
        flex: 1,
        // backgroundColor: "purple",
    },
    cardWrapper: {
        flex: 1,
        alignItems: "center",
    },
})

