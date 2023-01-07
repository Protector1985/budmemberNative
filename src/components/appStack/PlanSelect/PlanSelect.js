import React from 'react';
import { View, StyleSheet, Text, Dimensions, Platform, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Carousel from 'react-native-reanimated-carousel';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';
import { withAnchorPoint } from "../lib/withAnchorPoint";
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from "react-redux";

import { TouchableOpacity } from "react-native-gesture-handler";
import { LiquidLike } from 'react-native-animated-pagination-dots';
import { setSelectedPlan } from '../../../store/membershipPlanSlice';


function Card({animationValue, index, colorPalette, item}) {
    const WIDTH= Dimensions.get('window').width / 1.1;
    const HEIGHT = Dimensions.get('window').height / 1.5;
    const cs = useSelector((state) => state.userSlice?.colorPalette)
    // const cs = useSelector((state) => state.userSlice?.colorPalette["triadic"]['secondary'])
    const {Name, Package_Amount__c, Features__c} = item
    const featuresArr = Features__c.split(";")
    
    
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
                    backgroundColor: cs.cards,
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
        >   
        <View style={styles.cardTop}>
            <Text style={styles.cardHeadline}>{Name}</Text>
            <Text style={styles.cardPrice}>{`$${Package_Amount__c}/Month`}</Text>
        </View>
       
        <View style={styles.cardBottom}>
        <FlatList
         bounces={false}
          data={featuresArr}
          renderItem={({ item }) => {
            return (
              <View style={{ width: "92%",flexDirection: "row", marginTop: "10%"}}>
                <Text style={{color: "#2A1B6E",fontSize: 19, marginTop:-3}}>{`\u29BF`} </Text><Text style={{fontWeight: "500",color: "#2A1B6E", fontSize: 16 }}>{item}</Text>
              </View>
            );
          }}
        />
        </View>
        </Animated.View>

    </Animated.View>
    )


}

export default function PlanSelect({navigation}) {
    const {colorPalette} = useSelector((state) => state.userSlice)
    const {membershipPlans} = useSelector((state) => state.membershipPlanSlice)
    const selection = useSelector((state) => state.membershipPlanSlice.selectedPlan)
    const dispatch = useDispatch();
    const width = Dimensions.get('window').width;
    
    

    const carouselItems = membershipPlans
    
    React.useEffect(() => {
        dispatch(setSelectedPlan(carouselItems[0]?.Id))
    },[])
   
    return (
        
            <LinearGradient 
                colors={[colorPalette.main, colorPalette.mainLight]}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                style={styles.masterContainer}
            >
           
                <View style={styles.headerContainer}>
                    <Text style={[styles.headline, {color:"white"}]}>Select your Plan</Text>
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
                            damping: 13,
                        },
                    }}
                    scrollAnimationDuration={1000}
                    onSnapToItem={(index) => dispatch(setSelectedPlan(carouselItems[index].Id))}
                    renderItem={({ index, animationValue, item }) => {
                        return <Card 
                                key={index}
                                index={index} 
                                animationValue={animationValue} 
                                colorPalette={colorPalette}
                                item={item}
                                
                                />
                    }
                        
                    }
                    />            
                </View>
                
                    
                   
               
                

                <View style={styles.buttonContainer}>

                    {Platform.OS === "ios"? 
                        <IosButton navigation={navigation} textColor="white" color={colorPalette.accent} />
                    :
                        <AndroidButton navigation={navigation} textColor="white" color={colorPalette.accent} />
                    }
                
                </View>
                </LinearGradient>
       

    )
}

function IosButton({color, textColor, navigation}) {

    const {currentOnboardingStep} = useSelector((state) => state.systemSlice)
    function returnPath() {
        switch(currentOnboardingStep){
          case "3": 
            return navigation.navigate("Verify Phone Number")
          case "4": 
            return navigation.navigate("Enter Code")
          case "5":
            return navigation.navigate("Payment Information")
            default:
                return navigation.navigate("Select Plan")
        }
      }

    function handleNavigation() {
        return returnPath()
    }

    return(
        <TouchableOpacity onPress={handleNavigation} style={[styles.btn,{backgroundColor: color}]}>
            <Text style={[styles.btnText, {color: textColor}]}>Select</Text>
        </TouchableOpacity>
    )
}

function AndroidButton({color, textColor, navigation}) {
    function handleNavigation() {
        navigation.navigate("Verify Phone Number")
    }
    return(
        <TouchableOpacity onPress={handleNavigation} style={[styles.btn,{backgroundColor: color, color: textColor}]}>
            <Text style={[styles.btnText, {color: textColor}]}>Select</Text>
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
    cardTop: {
        flex:1,
        width: "100%",
        justifyContent: "space-around",
        alignItems: "center",
        paddingTop: "5%"
    },
   
    cardBottom: {
        flex: 4,
        width: "100%",
        alignItems: "space-around"
        
    },
    cardHeadline: {
        fontSize: 25,
        color: "#2A1B6E",
        fontWeight: "500"
    },
    cardPrice: {
        fontSize: 20,
        fontWeight: "500",
        color: "#424049"
    }
})

