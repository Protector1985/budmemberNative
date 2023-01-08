import { fetchAllDispensaries } from "../../../api/nodeApi"

import { setDispensaries } from "../../../store/dispensariesSlice"

export default async function fetchDispensaries(dispatch) {
    try {
        const res = await fetchAllDispensaries()
        dispatch(setDispensaries(res.data.data))
    }catch (err) {
        console.log(err)
    }
}