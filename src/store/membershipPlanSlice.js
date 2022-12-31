import { createSlice} from "@reduxjs/toolkit";


const initialState = {
    membershipPlans: [],
    selectedPlan: null,
    previousPlan: null,

  }

const membershipPlanSlice = createSlice({
    name: 'Membership Plans',
    initialState,
    reducers: {
        
        setMembershipPlans(state, action) {
            state.membershipPlans = action.payload
        },
        setSelectedPlan(state,action) {
            state.selectedPlan = action.payload
        },
        setPreviousPlan(state, action) {
            state.previousPlan = action.payload
        }
       
    }
})

export const { setMembershipPlans, setSelectedPlan, setPreviousPlan } = membershipPlanSlice.actions;

export default membershipPlanSlice.reducer;