import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import billingSlice from './billingSlice'
import cognitoDataSlice from './cognitoDataSlice'
import dispensariesSlice from './dispensariesSlice'
import drawerSlice from './drawerSlice'
import locationSlice from './locationSlice'
import membershipPlanSlice from './membershipPlanSlice'
import paymentInfoSlice from './paymentInfoSlice'
import systemSlice from './systemSlice'
import userSlice from './userSlice'

const store = configureStore({
  reducer: {
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