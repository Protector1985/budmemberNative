import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    open: false
  }

const drawerSlice = createSlice({
    name: 'Drawer',
    initialState,
    reducers: {
        
        toggleDrawer(state) {
            state.open = !state.open
        },
        closeDrawer(state) {
            state.open = false
        },
       
    }
})

export const { toggleDrawer, closeDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;