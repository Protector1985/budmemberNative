import { useDispatch } from "react-redux";
import { fetchMyself } from "../../../api/nodeApi";
import { setMemberData } from "../../../store/userSlice";



export default async function fetchData(dispatch) {
    
   try {
    const res = await fetchMyself();
    if(res.data.success) {
        dispatch(setMemberData(res.data.data))
        return res.data.data
    }
   } catch(err) {
    console.log(err)
   }
    
}