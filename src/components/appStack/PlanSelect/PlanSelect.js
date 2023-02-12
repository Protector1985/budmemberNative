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
import { closeDrawer } from '../../../store/drawerSlice';


function Card({animationValue, index, colorPalette, item}) {
    const WIDTH= Dimensions.get('window').width / 1.1;
    const HEIGHT = Dimensions.get('window').height / 1.5;
    const cs = useSelector((state) => state.userSlice?.colorPalette)
    // const cs = useSelector((state) => state.userSlice?.colorPalette["triadic"]['secondary'])
    const {Name, Package_Amount__c, Features__c, Value_Statement__c, Percent_Discount__c, Purchase_Limit__c} = item
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
                    height: "60%",
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
            <Text style={styles.cardHeadline}>{Name.toUpperCase()}</Text>
            <Text style={styles.cardPercentage}>{`${Percent_Discount__c}%OFF`}</Text>
            {!Purchase_Limit__c ? <Text style={styles.purchaseLimit}>EVERY PURCHASE UNLIMITED</Text> : <Text style={styles.purchaseLimit}>{`UP TO $${Purchase_Limit__c}`}</Text> }
            <Text style={styles.cardPrice}>{`Only $${Package_Amount__c} /mo`}</Text>
            <Text style={styles.valueStatement}>{`(${Value_Statement__c.toUpperCase()})`}</Text>
        </View>
       
        <View style={styles.cardBottom}>
            
        </View>
        </Animated.View>

    </Animated.View>
    )


}



export default function PlanSelect({navigation}) {
    const {colorPalette, Selected_Package_ID__c} = useSelector((state) => state.userSlice)
    const {membershipPlans} = useSelector((state) => state.membershipPlanSlice)
    const [cardIndex, setCardIndex] = React.useState(0)
    const [featuresArr, setFeaturesArr] = React.useState([])
    const selection = useSelector((state) => state.membershipPlanSlice.selectedPlan)
    const dispatch = useDispatch();
    const width = Dimensions.get('window').width;
    
    
    

    React.useEffect(() => {
        setFeaturesArr(carouselItems[0].Features__c.split(";"))
        dispatch(closeDrawer())
    },[])
     
    const filtered = membershipPlans.filter((item) => item.Id !== Selected_Package_ID__c)
    const carouselItems = filtered

 
    
    
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
           
                
                <View style={styles.cardContainer}>
                <Carousel
                    loop={carouselItems.length > 1 ? true : false}
                    width={width}
                    autoPlay={false}
                    data={carouselItems}
                    pagingEnabled={true}
                    withAnimation={{
                        type: 'timing',
                        config: {
                            damping: 10,
                        },
                    }}
                    scrollAnimationDuration={1000}
                    
                   
                    onSnapToItem={(index) => { 
                        setFeaturesArr(carouselItems[index].Features__c.split(";"))
                        dispatch(setSelectedPlan(carouselItems[index].Id))
                    }}
                    
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

                    <FlatList
                    bounces={false}
                    data={featuresArr}
                    contentContainerStyle={{ alignItems:"center"}}
                    renderItem={({ item }) => {
                    return (
                        <View style={{ width: "92%",  flexDirection: "row", marginTop:"5%"}}>
                            <Text style={{textAlign:"center", fontWeight: "500", color: "white", fontSize: 16 }}>{item}</Text>
                        </View>
                    );
                    }}
                    />
                
                </View>
                   
                </LinearGradient>
    
    )
}

function IosButton({color, textColor, navigation}) {

    const {currentOnboardingStep} = useSelector((state) => state.systemSlice)
    
    function returnPath() {
        switch(currentOnboardingStep){
            case "update":
                return navigation.navigate("Info")
            case "reactivation":
                return navigation.navigate("Payment Method")
            case "3": 
                return navigation.navigate("Verify Phone Number")
            case "4": 
                return navigation.navigate("Enter Code")
            case "5":
                return navigation.navigate("Payment Method")
            default:
                return navigation.navigate("Select Plan")
        }
      }

    function handleNavigation() {
        return returnPath()
    }

    return(
        <TouchableOpacity onPress={handleNavigation} style={[styles.btn,{backgroundColor: color}]}>
            <Text style={[styles.btnText, {color: textColor}]}>SUBSCRIBE</Text>
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
    cardPercentage: {
        fontSize: 35,
        fontWeight: "900",
        color:"#2A1B6E",
        letterSpacing: 3,
    },
    valueStatement: {
        fontSize: 18,
        fontWeight: "500",
        color:"#2A1B6E",
        fontFamily: 'AmericanTypewriter-Bold' 
    },
    btnText: {
        fontSize: 26,
        letterSpacing: 3,
        fontWeight: "600"
       
    },
    purchaseLimit: {
        fontSize: 25,
        color: "#2A1B6E",
        fontWeight: "500",
        textAlign:"center",
        letterSpacing: 3,
        
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
        flex: 1,
        marginBottom:"-15%",
        marginTop: "-14%",
        
    },
    buttonContainer: {
        flex: 1,
        marginBottom:'-25%',

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
   
    
    cardHeadline: {
        fontSize: 35,
        color: "#2A1B6E",
        fontWeight: "600",
        letterSpacing: 4,
       
    },
    cardPrice: {
        fontSize: 18,
        fontWeight: "500",
        color: "#424049",
        
    }
})

