import { createSlice} from "@reduxjs/toolkit";
import {fetchMyself} from '../api/nodeApi';

const initialState = {
    Membership_Status__c : null,
    lastChargeDate : null, 
    discountPercentage : null, 
    selectedPackage : null, 
    packagePrice : null,  
    Email : null, 
    FirstName : null, 
    LastName : null, 
    MobilePhone : null, 
    Birthdate : null, 
    Id : null, 
    MailingState : null, 
    MailingCity : null, 
    MailingStreet : null, 
    Email_Verified__c : null, 
    PhoneNumberVerified__c : null, 
    display_phoneVerification__c : null, 
    Selected_Package_ID__c : null, 
    Previous_Package_ID__c : null, 
    currentActivePackage : null, 
    Apple_Pay_Subscription__c : null,
    avatarUri: null,
    colorPalette: {
        "100": "#d5c2ff",
        "200": "#b799ff",
        "300": "#966dff",
        "400": "#7749ff",
        "50": "#f0e6ff",
        "500": "#4f1cff",
        "600": "#3b18ff",
        "700": "#000cff",
        "800": "#0002fb",
        "900": "#0000f9",
        "A100": "#a58aff",
        "A200": "#5951ff",
        "A400": "#0d29ff",
        "A700": "#000cff",
        "main": "#7400ff"
        },
    
  }

const userSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setMemberData(state, action) {
            state.Membership_Status__c = action.payload.Membership_Status__c
            state.lastChargeDate = action.payload.lastChargeDate, 
            state.discountPercentage = action.payload.discountPercentage, 
            state.selectedPackage = action.payload.selectedPackage, 
            state.packagePrice = action.payload.packagePrice,  
            state.Email = action.payload.Email, 
            state.FirstName = action.payload.FirstName, 
            state.LastName = action.payload.LastName, 
            state.MobilePhone = action.payload.MobilePhone, 
            state.Birthdate = action.payload.Birthdate, 
            state.Id = action.payload.Id, 
            state.MailingState = action.payload.MailingState, 
            state.MailingCity = action.payload.MailingCity, 
            state.MailingStreet = action.payload.MailingStreet, 
            state.Email_Verified__c = action.payload.Email_Verified__c, 
            state.PhoneNumberVerified__c = action.payload.PhoneNumberVerified__c, 
            state.display_phoneVerification__c = action.payload.display_phoneVerification__c, 
            state.Selected_Package_ID__c = action.payload.Selected_Package_ID__c, 
            state.Previous_Package_ID__c = action.payload.Previous_Package_ID__c, 
            state.currentActivePackage = action.payload.currentActivePackage, 
            state.Apple_Pay_Subscription__c = action.payload.Apple_Pay_Subscription__c    
        },
        setPictureUri(state, action) {
            state.avatarUri = action.payload
        },

        updateProfileData(state, action) {
            state.FirstName = action.payload.FirstName
            state.LastName = action.payload.LastName
            state.Email = action.payload.Email
            state.MobilePhone = action.payload.MobilePhone
            state.Birthdate = action.payload.Birthdate
        },
        setColorPalette(state, action) {
            state.colorPalette = action.payload
        }
    }
})

export const { setMemberData, updateProfileData, setPictureUri, setColorPalette } = userSlice.actions;

export default userSlice.reducer;