import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import systemSlice from './systemSlice'
import userSlice from './userSlice'

const store = configureStore({
  reducer: {
    userSlice : userSlice,
    systemSlice: systemSlice
  },
})

setupListeners(store.dispatch)

export default store