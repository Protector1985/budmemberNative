import { getPurchaseHistory } from "../../../api/nodeApi";
import { setPurchases } from "../../../store/userPurchasesSlice";


export default async function fetchUserPurchases(dispatch) {
    try {
        const res = await getPurchaseHistory()
        dispatch(setPurchases(res.data.data))
        return res.data.data
    } catch (err) {
        console.log(err)
    }
}