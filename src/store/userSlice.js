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
        "100": "#b8e1ed",
        "200": "#8dcde2",
        "300": "#6cbad5",
        "400": "#5bacce",
        "50": "#e2f3f8",
        "500": "#4f9fc6",
        "600": "#4891b9",
        "700": "#3f7fa6",
        "800": "#3a6f92",
        "900": "#2e506f",
        "A100": "#3ca9e5",
        "A200": "#007ac8",
        "A400": "#00619e",
        "A700": "#2e506f",
        "main": "#2E306F"
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
            state.colorPalette = JSON.parse(action.payload.Color_Scheme__c) ? JSON.parse(action.payload.Color_Scheme__c) : state.colorPalette
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
        },
        setBirthDate(state, action) {
            state.Birthdate = action.payload
        }
    }
})

export const { setBirthDate, setMemberData, updateProfileData, setPictureUri, setColorPalette } = userSlice.actions;

export default userSlice.reducer;