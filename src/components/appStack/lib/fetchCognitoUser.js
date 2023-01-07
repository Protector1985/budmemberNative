import { useDispatch } from "react-redux";
import { fetchPackages, getCognitoUser } from "../../../api/nodeApi";
import { setCognitoData } from "../../../store/cognitoDataSlice";
import { setMembershipPlans } from "../../../store/membershipPlanSlice";
import { setOnboardingStep } from "../../../store/systemSlice";


export default async function fetchCognitoUser(dispatch, email) {
   try {
    const res = await getCognitoUser(email);
    if(res.data.success) {
        const data = res.data.data.Users[0].Attributes
        const obj = {}
        for(let key in data) {
            obj[data[key].Name] = data[key].Value
        }
       
        dispatch(setCognitoData(obj))
        dispatch(setOnboardingStep(obj["custom:onBoardingStatus"]))
        return "SUCCESS"
    }
   } catch(err) {
     return "ERROR"
   } 
}