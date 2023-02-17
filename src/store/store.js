import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import authSlice from './authSlice'
import billingSlice from './billingSlice'
import ccInfoSlice from './ccInfoSlice'
import cognitoDataSlice from './cognitoDataSlice'
import dispensariesSlice from './dispensariesSlice'
import drawerSlice from './drawerSlice'
import locationSlice from './locationSlice'
import membershipPlanSlice from './membershipPlanSlice'
import paymentInfoSlice from './paymentInfoSlice'
import permissionSlice from './permissionSlice'
import systemSlice from './systemSlice'
import userPurchasesSlice from './userPurchasesSlice'
import userSlice from './userSlice'

const store = configureStore({
  reducer: {
    authSlice: authSlice,
    permissionSlice: permissionSlice,
    userPurchasesSlice: userPurchasesSlice,
    ccInfoSlice: ccInfoSlice,
    drawerSlice: drawerSlice,
    dispensariesSlice: dispensariesSlice,
    locationSlice: locationSlice,
    cognitoDataSlice: cognitoDataSlice,
    billingSlice: billingSlice,
    paymentInfoSlice:paymentInfoSlice,
    membershipPlanSlice: membershipPlanSlice,
    userSlice : userSlice,
    systemSlice: systemSlice
  },
})

setupListeners(store.dispatch)

export default store