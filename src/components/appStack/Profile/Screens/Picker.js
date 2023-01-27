import React from 'react';
import { ColorPicker, fromHsv  } from 'react-native-color-picker'
import {View, Text, TextInput, StyleSheet } from 'react-native';
import Matercolor from 'matercolors'
import { useDispatch, useSelector } from 'react-redux';
import { setColorPalette } from '../../../../store/userSlice';
import { colorScheme } from '../../../../api/nodeApi';
import { SafeAreaView} from "react-native-safe-area-context"
import { LinearGradient } from 'expo-linear-gradient';
import UserAvatar from 'react-native-user-avatar';
import moment from 'moment';
import {Dimensions} from 'react-native';
import { useFonts } from 'expo-font';

export default function Picker({navigation, email, setEmail, firstName, setFirstName, lastName, setLastName,phone,setPhone,birthDate,setBirtDate, image, setImage}) {
    const dispatch = useDispatch()
    const currentColor = useSelector((state) => state.userSlice.colorPalette) 
    const [color, setColor] = React.useState(
        currentColor['main'] || 
        "#2E306F"
    )
    const {colorPalette, Email} = useSelector((state) => state.userSlice)
    let palette = new Matercolor(color).palette['analogous']['primary']
    let palette2 = new Matercolor(color).palette['complementary']
    let palette3 = new Matercolor(color).palette['triadic']
    
    
    React.useEffect(() => {
        const colors = {...palette, complementary:{...palette2}, triadic:{...palette3}} 
        Object.assign(colors, {"main": color})
        dispatch(setColorPalette(colors))
    }, [color])

    function submit() {
        colorScheme(colorPalette, Email)
        navigation.goBack()
    }
 

    return (

        <SafeAreaView style={styles.container}>
            <LinearGradient
                    style={{
                        flexDirection: "row",
                        width: undefined,
                        height: 'auto',
                        position: "relative",
                        top: -100,
                        paddingTop:80,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "transparent",
                        marginBottom: 0
                        }}
                        colors={[colorPalette['main'], colorPalette['300']]}
                        start={{x: 0.5, y: 0}}
                        end={{x: 1, y: 0.7}}
                        >
            
                    <UserAvatar style={styles.profilePic} size={145} name={`${firstName} ${lastName}`} src={image}  />
                 
                </LinearGradient>
        
            <View style={styles.inputContainer}>
                  
                <ColorPicker
                    onColorChange={(color) => setColor(fromHsv(color))}
                    onColorSelected={color => submit()}
                    style={{flex: 1}}
                />

               
            </View> 
        </SafeAreaView>
    
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgContainer: {
        flexDirection: "row",
        width: undefined,
        height: 'auto',
        position: "relative",
        top: -100,
        paddingTop:80,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 0,
    },
    profilePic: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 3,
        borderColor: "#FFF",
        marginBottom: 20,
        
        
    },
    nameContainer: {
        flexDirection:"column",
        marginLeft: 15,
    },
    name: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "800",
        marginVertical: 8,
        marginBottom: 0,
    },
    membership: {
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: 13,
        marginRight: 4,
    },
    inputContainer: {
        width: "90%",
        height: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        position: 'relative',
        top: -80,
        
    },
    inputSubContainer: {
        borderBottomColor: "#cecece",
        borderBottomWidth: 1,
        marginBottom: 20,
        height: 58,
    },
    inputSubContainerSmall: {
        borderBottomColor: "#cecece",
        borderBottomWidth: 1,
        marginBottom: 10,
        height: 58,
    },
    label: {
        color: "#333333",
    },
    labelSmall: {
        color: "#333333",
        fontSize:11,
    },
    textDisplay: {
        fontSize: 18,
        marginTop: 10,    
    },
    textDisplaySmall: {
        fontSize: 16,
        marginTop: 10,    
    },
    editPictureBg: {
        top: -60,
        right: 45,
        width: 45,
        height: 45,
        borderColor: "white",
        borderStyle:"solid",
        borderWidth: 2,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "grey",
        borderRadius: 50
    }

    
})





