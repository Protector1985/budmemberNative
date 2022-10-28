import { signUp, updateUser  } from "../../../../api/nodeApi";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

function setHeader(token) {
    const newHeaders = {}
    newHeaders["Authorization"] = `Bearer ${token}`
    return newHeaders
}

async function submitUserData(firstName, lastName, birthDate, header){
    console.log(header)
    try {
      const updateObject = {
        onboardingStep: "3",
        update: {
          FirstName: firstName,
          MiddleName: "",
          LastName: lastName,
          Birthdate: birthDate,
        },
      };
      const res = await updateUser(updateObject, header);
      return res
    } catch (err) {
        console.log(err)
        throw new Error(err)      
    } 
  };

export default async function handleCreateAccount(email, password, firstName, lastName, birthDate){
    //console.log({email,password,repeatPassword,checkedTerms});
    let token = ""
    let header = ""
    try {
      const res = await signUp({
        email: email,
        password: password,
        onboardingStep: "3",
      });
      
      if (res?.data?.token) {
        token = res.data.token
        header = setHeader(token);
        // updateCognitoUser({
        //   salesForceId: res.data.data["custom:salesforceId"],
        //   authorizeNetId: res.data.data["custom:authorizeSubId"]
        //     ? res.data.data["custom:authorizeSubId"]
        //     : "",
        //   role: res.data.data["custom:salesforceRole"],
        //   sub: res.data.data.sub,
        //   onboardingStep: "3",
        // });
        
       
        
        const userSubmission = await submitUserData( firstName, lastName, birthDate, header)
        if(userSubmission.data.success) {
            return {success: true, token: token}
        } else {
            return {success: false, header: header }
        }   
      } else {
        return {success: false, header: header}
      }
    } catch (error) {
        return {success: false, header: header}
    } 

  };