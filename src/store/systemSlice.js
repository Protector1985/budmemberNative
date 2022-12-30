import { createSlice} from "@reduxjs/toolkit";
import {fetchMyself} from '../api/nodeApi';

const initialState = {
    showDatePick : false,
    onboardingSteps:[
        "",
        "email",
        "budmembership",
        "phone-number",
        "verify-phone-number",
        "full-name",
        "payment-method",
        "billing-address",
        "review-payment",
      ],
      currentOnboardingStep: null,
      ctaOpen: false,
    
  }

const systemSlice = createSlice({
    name: 'systemData',
    initialState,
    reducers: {
        
        setShowDatePick(state, action) {
            state.showDatePick = action.payload
        },
        setOnboardingStep(state, action) {
            state.currentOnboardingStep = action.payload
        },
        setCtaOpen(state, action) {
            state.ctaOpen = state.action
        }
    }
})

export const { setShowDatePick, setOnboardingStep, setCtaOpen } = systemSlice.actions;

export default systemSlice.reducer;