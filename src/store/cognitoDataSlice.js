import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    cognitoData: {}
  }

const cognitoDataSlice = createSlice({
    name: 'Billing Information',
    initialState,
    reducers: {
        
        setCognitoData(state, action) {
            state.cognitoData = action.payload
        },
       
    }
})

export const { setCognitoData } = cognitoDataSlice.actions;

export default cognitoDataSlice.reducer;