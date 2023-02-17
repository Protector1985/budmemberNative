import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    userToken: null,
    globalSpinnerOn: false,
  }

const authSlice = createSlice({
    name: 'Authorization',
    initialState,
    reducers: {
        
        setIsLoading(state, action) {
            state.isLoading = action.payload
        },
        setUserToken(state, action) {
            state.userToken = action.payload
        },
        setGlobalSpinnerOn(state, action) {
            state.globalSpinnerOn = action.payload
        }
    }
})

export const { setIsLoading, setUserToken, setGlobalSpinnerOn } = authSlice.actions;

export default authSlice.reducer;