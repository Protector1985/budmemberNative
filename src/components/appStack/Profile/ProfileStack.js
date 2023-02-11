import React from 'react'
import { createStackNavigator,  } from '@react-navigation/stack';
import { Button, StyleSheet, TouchableOpacity, Platform, Text, ActivityIndicator } from 'react-native';
import EditProfile from './Screens/EditProfile';
import Profile from './Screens/Profile';
import Picker from './Screens/Picker'
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyself, updateUser } from '../../../api/nodeApi';
import { AntDesign } from '@expo/vector-icons'; 
import fetchImage from '../lib/fetchImage';
import { setShowDatePick } from '../../../store/systemSlice';
import PhoneVerifyStack from '../subscribeNavigator/PhoneVerifyStack.js'
import * as Location from 'expo-location'



const Stack = createStackNavigator()

export default function ProfileStack({navigation}) {
  const [status, requestPermission] = Location.useForegroundPermissions()
  const {
    MobilePhone,
    Email, 
    FirstName, 
    LastName, 
    currentActivePackage,
    avatarUri,
    Birthdate
   } = useSelector((state) => state.userSlice)
   const {cognitoData} = useSelector((state) => state.cognitoDataSlice)
   const {userSlice} = useSelector((state) => state)
  const [loading, setLoading] = React.useState(false)
  const {showDatePick} = useSelector((state) => state.systemSlice)
  const [localFirst, setLocalFirst] = React.useState(FirstName);
  const [localLast, setLocalLast] = React.useState(LastName);
  const [localEmail, setLocalEmail] = React.useState(Email);
  const [localPhone, setLocalPhone] = React.useState(MobilePhone);
  const [image, setImage] = React.useState(null);
  const [initState, setInitState] = React.useState();
  const dispatch = useDispatch()
  
  
  //fetches the image URI from the backend and saves it to async storage
 
  function mutatePhone(localPhone) {
    let mutatedPhone;
    if(localPhone[0] === "+") {
      return mutatedPhone = localPhone.slice(2);
    } else if(localPhone[0] === "1") {
      return mutatedPhone = localPhone.slice(1);
    } else {
      return mutatedPhone = localPhone
    }
  }

  async function handleSave() {  
    if(localFirst !== FirstName || localLast !== LastName || localEmail !== Email || localPhone !== MobilePhone) {
    setLoading(true)
    const updateObject = {
      update: {
        FirstName: localFirst,
        LastName: localLast,
        Email : localEmail,
        MobilePhone: localPhone,
        BirthDate: Birthdate,
      },
    };
    //compares if localPhone without +! is different than cognito stored phone
    //if so it navigates to the phone changer. Otherwise not needed
    if(cognitoData?.phone_number?.slice(2) !== mutatePhone(localPhone)) {
      const res = await updateUser(updateObject);
      if(res.data.success) {
        // _init(status.granted, userSlice, cognitoData, avatarUri, dispatch, setInitState)
        navigation.navigate("Verify Phone Number", {
          params: localPhone
        })
      }
      
    }
  } else {
    return
  }
   
  }

  function handleDateChange() {
    dispatch(setShowDatePick(false))
  }

  if(loading) {
    return <ActivityIndicator style={{flex: 1, backgroundColor: "white"}} />
  }
  
  return (
        <Stack.Navigator  
        screenOptions={{
          headerShown: true
        }}>
            <Stack.Screen 
              options={{
                headerRight: () => {
                  return Platform.OS === "ios" ?
                  //ios button
                  <Button
                    style={styles.btn}
                    onPress={() => navigation.navigate("Edit Profile")}
                    title="Edit"
                  />
                  //Android button
                  : <TouchableOpacity onPress={() => navigation.navigate("Edit Profile")}>
                      <Text style={styles.androidButton}>Edit</Text>
                    </TouchableOpacity>
                },
              }}
                name="Profile" 
            >
            {() => <Profile 
                      navigation={navigation}
                      email={Email} 
                      firstName={FirstName} 
                      lastName={LastName} 
                      phone={MobilePhone}
                      birthDate={Birthdate}
                      membership={currentActivePackage}
                      image={avatarUri}
                  />}
            </Stack.Screen>
            <Stack.Screen name="Edit Profile" 
                options={{
                  headerRight: () => (
                    Platform.OS === "ios" ?
                    //ios button
                    <Button
                      style={styles.btn}
                      onPress={showDatePick ? handleDateChange : handleSave}
                      title={showDatePick ? "Select Date" : "Save"}
                    />
                    //Android button
                    : <TouchableOpacity onPress={handleSave}>
                        <Text style={styles.androidButton}>Save</Text>
                      </TouchableOpacity>
                  ),
                }}
            >
             { (props) =>  <EditProfile 
                    navigation={props.navigation}
                    email={localEmail} 
                    setEmail={setLocalEmail}
                    firstName={localFirst} 
                    setFirstName={setLocalFirst}
                    lastName={localLast} 
                    setLastName={setLocalLast}
                    phone={localPhone} 
                    setPhone={setLocalPhone}
                    birthDate={Birthdate}
                    image={avatarUri}
                    
                
                     /> }
            </Stack.Screen>
            
            <Stack.Screen name="Color Palette" 
            
        >
         { (props) =>  <Picker 
                navigation={props.navigation}
                email={localEmail} 
                setEmail={setLocalEmail}
                firstName={localFirst} 
                setFirstName={setLocalFirst}
                lastName={localLast} 
                setLastName={setLocalLast}
                phone={localPhone} 
                setPhone={setLocalPhone}
                
                image={avatarUri}
               
                 /> }
        </Stack.Screen>

        </Stack.Navigator>

    )
}


const styles = StyleSheet.create({
  androidButton: {
    color: "#007AFF",
    fontSize: 16,
    marginRight: 10
  },
  
})