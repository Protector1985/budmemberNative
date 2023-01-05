import { useDispatch } from "react-redux";
import { fetchPackages } from "../../../api/nodeApi";
import { setMembershipPlans } from "../../../store/membershipPlanSlice";




export default async function fetchPlans(dispatch, OwnerId) {
   try {
    const res = await fetchPackages(OwnerId);
    if(res.data.success) {
        dispatch(setMembershipPlans(res.data.data))
        return "SUCCESS"
    }
   } catch(err) {
     return "ERROR"
   } 
}