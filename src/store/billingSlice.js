import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    streetAddress: "",
    city:"",
    zip:"",
    state: "",
  }

const billingSlice = createSlice({
    name: 'Billing Information',
    initialState,
    reducers: {
        
        setBillingInfo(state, action) {
            state.streetAddress = action.payload.streetAddress,
            state.city = action.payload.city
            state.zip = action.payload.zip
            state.state = action.payload.state
        },
       
    }
})

export const { setBillingInfo } = billingSlice.actions;

export default billingSlice.reducer;