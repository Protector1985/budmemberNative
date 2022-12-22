import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import userSlice from './userSlice'

const store = configureStore({
  reducer: {
    userSlice : userSlice,
  },
})

setupListeners(store.dispatch)

export default store