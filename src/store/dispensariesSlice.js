import { createSlice} from "@reduxjs/toolkit";


const initialState = {
    dispensaries: {},
  }

const dispensariesSlice = createSlice({
    name: 'Dispensaries',
    initialState,
    reducers: {
        
        setDispensaries(state, action) {
            state.dispensaries = action.payload
        },
       
       
    }
})

export const { setDispensaries } = dispensariesSlice.actions;

export default dispensariesSlice.reducer;