import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import membershipPlanSlice from './membershipPlanSlice'
import systemSlice from './systemSlice'
import userSlice from './userSlice'

const store = configureStore({
  reducer: {
    membershipPlanSlice: membershipPlanSlice,
    userSlice : userSlice,
    systemSlice: systemSlice
  },
})

setupListeners(store.dispatch)

export default store