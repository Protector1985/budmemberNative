import { useDispatch } from "react-redux";
import { fetchPackages, getCognitoUser } from "../../../api/nodeApi";
import { setCognitoData } from "../../../store/cognitoDataSlice";
import { setMembershipPlans } from "../../../store/membershipPlanSlice";
import { setOnboardingStep } from "../../../store/systemSlice";


export default async function fetchCognitoUser(dispatch, email, membershipStatus) {
   try {
    const res = await getCognitoUser(email);
    if(res.data.success) {
        const data = res.data.data.Users[0].Attributes
        const obj = {}
        for(let key in data) {
            obj[data[key].Name] = data[key].Value
        }
       
        dispatch(setCognitoData(obj))
        
        //decides if this is a reactivation, new subscription or update
        //this is stored in onboarding step
        if(membershipStatus === "Inactive" && !obj["custom:authorizeSubId"]) {
          dispatch(setOnboardingStep(obj["custom:onBoardingStatus"]))
        } else if(membershipStatus === "Inactive" && obj["custom:authorizeSubId"]) {
          dispatch(setOnboardingStep("reactivation"))
        } else {
          dispatch(setOnboardingStep("update"))
        }
        
        return "SUCCESS"
    }
   } catch(err) {
     return "ERROR"
   } 
}