

import React from 'react';
import { SafeAreaView} from "react-native-safe-area-context"
import {View, Text, TextInput, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons'; 
import UserAvatar from 'react-native-user-avatar';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { useActionSheet } from '@expo/react-native-action-sheet';
import takeCameraPicture from '../lib/takeCameraPicture';
import chooseFromLibrary from '../lib/chooseFromLibrary';
import Picker from '../../ColorPicker/ColorPicker';

const ENDPOINT = Platform.OS === 'ios' ? "http://localhost:5000" : "http://10.0.2.2:5000" // ios || android avd localhost


function EditPicture({pickImage}) {
  

    return (
      <View  style={styles.editPictureBg}>
        <AntDesign onPress={pickImage} style={styles.editPicture} name="picture" size={26} color="#E5E4E2" />
      </View>
        
    )
  }

export default function EditProfile ({email, setEmail, firstName, setFirstName, lastName,setLastName,phone,setPhone,birthDate,setBirtDate, image, setImage}) {
    const [cameraPermission, requestCameraPermission] = ImagePicker.useCameraPermissions();
    const [libraryPermission, requestLibraryPermission] = ImagePicker.useMediaLibraryPermissions();
    const [backgroundColor, setBackgroundColor] = React.useState("")
    const dispatch = useDispatch()
    const { showActionSheetWithOptions } = useActionSheet();
    const colors = useSelector((state) => state.userSlice.colorPalette)
    
    //image/camera logic
    async function pickImage() {
        const options = ['Camera', 'Library', 'Cancel'];
        const destructiveButtonIndex = 0;
        const cancelButtonIndex = 2;

    showActionSheetWithOptions({
      options,
      cancelButtonIndex,
    }, (selectedIndex) => {
      switch (selectedIndex) {
        case 0:
            //if camera permission was not yet granted
            if(!cameraPermission.granted) {
                //request camera permission
                requestCameraPermission()
                .then((res) => {  
                    //if camera persmission was granted
                    if(res.granted) {
                        //open camera to take picture
                        takeCameraPicture(dispatch, email);
                    } else {
                        return
                    }
                })
                //if camera permission was already granted
            } else {
                takeCameraPicture(dispatch);
            }
          break;

        case 1:
            //if library permission was not yet granted
            if(!libraryPermission.granted) {
                //request library permission
                requestLibraryPermission()
                .then((res) => {
                    //if permission was granted
                    if(res.granted) {
                        //open libarary
                        chooseFromLibrary(dispatch, email)
                    } else {
                        return
                    }
                })
                //if library permission was already granted
            } else {
                chooseFromLibrary(dispatch)
            }
          break;
            //if cancel was pressed just close - do nothing
        case cancelButtonIndex:
          return
      }});
      };

   
      
      
   console.log(colors)

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
                colors={[colors['main'], colors['300']]}
                start={{x: 0.5, y: 0}}
                end={{x: 1, y: 0.7}}
                >
      
                <UserAvatar style={styles.profilePic} size={145} name={`${firstName} ${lastName}`} src={image}  />
                <EditPicture pickImage={pickImage} />
            </LinearGradient>
        
            <View style={styles.inputContainer}>
               <Picker setBackgroundColor={setBackgroundColor} />
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
        marginLeft: 40,
        
    },
    nameContainer: {
        flexDirection:"column",
        marginLeft: 15,
    },
    name: {
        fontFamily: "Roboto-Regular",
        color: "#FFF",
        fontSize: 20,
        fontWeight: "800",
        marginVertical: 8,
        marginBottom: 0,
    },
    membership: {
        fontFamily: "Roboto-Regular",
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


// <View style={Dimensions.get("window").height > 690 ? styles.inputSubContainer :styles.inputSubContainerSmall} >
// <Text style={Dimensions.get("window").height > 690 ? styles.label : styles.labelSmall}>First Name</Text>
// <TextInput value={firstName} style={Dimensions.get("window").height > 690 ? styles.textDisplay : styles.textDisplaySmall} onChangeText={(text) => setFirstName(() => text)}/>
// </View>
// <View style={Dimensions.get("window").height > 690 ? styles.inputSubContainer :styles.inputSubContainerSmall} >
// <Text style={Dimensions.get("window").height > 690 ? styles.label : styles.labelSmall}>Last Name</Text>
// <TextInput value={lastName} style={Dimensions.get("window").height > 690 ? styles.textDisplay : styles.textDisplaySmall} onChangeText={(text) => setLastName(() => text)} />
// </View>
// <View style={Dimensions.get("window").height > 690 ? styles.inputSubContainer :styles.inputSubContainerSmall} >
// <Text style={Dimensions.get("window").height > 690 ? styles.label : styles.labelSmall}>Your Email</Text>
// <TextInput value={email} style={Dimensions.get("window").height > 690 ? styles.textDisplay : styles.textDisplaySmall} onChangeText={(text) => setEmail(() => text)} />
// </View>
// <View style={Dimensions.get("window").height > 690 ? styles.inputSubContainer :styles.inputSubContainerSmall} >
// <Text style={Dimensions.get("window").height > 690 ? styles.label : styles.labelSmall}>Phone</Text>
// <TextInput value={phone} style={Dimensions.get("window").height > 690 ? styles.textDisplay : styles.textDisplaySmall} onChangeText={(text) => setPhone(() => text)} />
// </View>
// <View style={Dimensions.get("window").height > 690 ? styles.inputSubContainer :styles.inputSubContainerSmall} >
// <Text style={Dimensions.get("window").height > 690 ? styles.label : styles.labelSmall}>Date of birth</Text>
// <TextInput value={moment(birthDate).format("MM/DD/YYYY")} style={Dimensions.get("window").height > 690 ? styles.textDisplay : styles.textDisplaySmall} onChangeText={(text) => setBirtDate(() => text)} />
// </View>