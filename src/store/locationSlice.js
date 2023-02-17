import { createSlice} from "@reduxjs/toolkit";


const initialState = {
    longitude: 0,
    latitude: 0,
    homeLat: 0,
    homeLong:0,


  }

const locationSlice = createSlice({
    name: 'Location',
    initialState,
    reducers: {
        
        setLocation(state, action) {
            state.longitude = action.payload.longitude,
            state.latitude = action.payload.latitude
        },
        setHome(state, action) {
            state.homeLat = action.payload.lat
            state.homeLong = action.payload.lo
        }
       
       
    }
})

export const { setLocation, setHome } = locationSlice.actions;

export default locationSlice.reducer;