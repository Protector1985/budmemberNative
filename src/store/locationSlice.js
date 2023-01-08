import { createSlice} from "@reduxjs/toolkit";


const initialState = {
    longitude: 0,
    latitude: 0


  }

const locationSlice = createSlice({
    name: 'Location',
    initialState,
    reducers: {
        
        setLocation(state, action) {
            state.longitude = action.payload.longitude,
            state.latitude = action.payload.latitude
        },
       
       
    }
})

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;