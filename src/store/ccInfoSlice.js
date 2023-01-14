import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    ccNumber: "",
    ccExp: "",
  }

const ccInfoSlice = createSlice({
    name: 'CC Information',
    initialState,
    reducers: {
        
        setCCInfo(state, action) {
            console.log(action.payload)
            state.ccNumber = action.payload.ccNumber,
            state.ccExp = action.payload.ccExp
        }, 
    }
})

export const { setCCInfo } = ccInfoSlice.actions;

export default ccInfoSlice.reducer;