import { createSlice} from "@reduxjs/toolkit";


const initialState = {
    holderName: "",
    cardNumber: "",
    expiration: "",
    cvv: "",


  }

const paymentInfoSlice = createSlice({
    name: 'Payment Information',
    initialState,
    reducers: {
        
        setCCDetails(state, action) {
            state.holderName= action.payload.holderName
            state.cardNumber = action.payload.cardNumber
            state.expiration = action.payload.expiration
            state.cvv = action.payload.cvv
        },
       
       
    }
})

export const { setCCDetails } = paymentInfoSlice.actions;

export default paymentInfoSlice.reducer;