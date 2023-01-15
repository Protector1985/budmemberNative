import { createSlice} from "@reduxjs/toolkit";


const initialState = {
    purchaseData: [],
    totalSavings: 0,
  }

const userPurchasesSlice = createSlice({
    name: 'Purchase History',
    initialState,
    reducers: {
        
        setPurchases(state, action) {
            state.purchaseData = action.payload
            state.totalSavings = action.payload.map(({savedAmount}) => savedAmount).reduce((a, b) => a + b, 0)
            
        },
       
       
    }
})

export const { setPurchases } = userPurchasesSlice.actions;

export default userPurchasesSlice.reducer;