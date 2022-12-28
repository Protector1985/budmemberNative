import { createSlice} from "@reduxjs/toolkit";
import {fetchMyself} from '../api/nodeApi';

const initialState = {
    showDatePick : false,
    
    
  }

const systemSlice = createSlice({
    name: 'systemData',
    initialState,
    reducers: {
        
        setShowDatePick(state, action) {
            state.showDatePick = action.payload
        },

        
    }
})

export const { setShowDatePick } = systemSlice.actions;

export default systemSlice.reducer;