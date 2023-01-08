import { fetchAllDispensaries, fetchDispensary } from "../../../api/nodeApi"

import { setDispensaries } from "../../../store/dispensariesSlice"

export default async function fetchDispensaries(dispatch) {
    try {
        const dispensariesObject = {}
        const hoursObject = {}

        const res = await fetchAllDispensaries()
   
        //mutates data to object for quick lookup in slider
        res.data.data.map(async(disp) => {
            dispensariesObject[disp.Name] = disp
        })

        // Object.values(dispensariesObject).map(async (disp) => {
        //     const supp = await fetchDispensary(disp.Id)
        //     dispensariesObject[disp.Name].openHours = supp?.data?.data[0].Dispensary_Open_Hours__r
        // }).catch((err)=> console.log(err))
        
        dispatch(setDispensaries(dispensariesObject))
    }catch (err) {
        console.log(err)
    }
}