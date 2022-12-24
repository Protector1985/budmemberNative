import React from 'react'
import { createStackNavigator,  } from '@react-navigation/stack';
import { Button, StyleSheet, TouchableOpacity, Platform, Text, ActivityIndicator } from 'react-native';
import EditProfile from './Screens/EditProfile';
import Profile from './Screens/Profile';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyself, updateUser } from '../../../api/nodeApi';
import { AntDesign } from '@expo/vector-icons'; 
import fetchImage from '../lib/fetchImage';




const Stack = createStackNavigator()
export default function ProfileStack({navigation, userSlice, Email, FirstName, LastName, MobilePhone, Birthdate, currentActivePackage, avatarUri}) {
  const [loading, setLoading] = React.useState(false)

  const [localFirst, setLocalFirst] = React.useState(FirstName);
  const [localLast, setLocalLast] = React.useState(LastName);
  const [localEmail, setLocalEmail] = React.useState(Email);
  const [localPhone, setLocalPhone] = React.useState(MobilePhone);
  const [localDob, setLocalDob] = React.useState(Birthdate);
  const [image, setImage] = React.useState(null);
  
  //fetches the image URI from the backend and saves it to async storage
 
  

  async function handleSave() {  
    setLoading(true)
    const updateObject = {
      update: {
        FirstName: localFirst,
        LastName: localLast,
        Email : localEmail,
        MobilePhone: localPhone,
        BirthDate: localDob
      },
    };
    try {
      const res = await updateUser(updateObject);
      setLoading(false)
     
    }catch (err) {
      console.log(err)
    }
  }

  if(loading) {
    return <ActivityIndicator />
  }
  
  
  return (
        <Stack.Navigator >
            <Stack.Screen 
            options={{
                headerRight: () => (
                  Platform.OS === "ios" ?
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
                ),
              }}
                name="Profile" 
            >
            {() => <Profile 
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
                      onPress={handleSave}
                      title="Save"
                    />
                    //Android button
                    : <TouchableOpacity onPress={handleSave}>
                        <Text style={styles.androidButton}>Save</Text>
                      </TouchableOpacity>
                  ),
                }}
            >
             { () =>  <EditProfile 
                    email={localEmail} 
                    setEmail={setLocalEmail}
                    firstName={localFirst} 
                    setFirstName={setLocalFirst}
                    lastName={localLast} 
                    setLastName={setLocalLast}
                    phone={localPhone} 
                    setPhone={setLocalPhone}
                    birthDate={localDob}
                    setBirtDate={setLocalDob}
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