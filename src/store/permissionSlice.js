import { createSlice} from "@reduxjs/toolkit";


const initialState = {
    locationPermission: false,
    galleryPermission: false,

  }

const permissionSlice = createSlice({
    name: 'Permissions',
    initialState,
    reducers: {
        
        setLocationPermission(state, action) {
            state.locationPermission = action.payload
        },

        setGalleryPermission(state, action) {
            state.galleryPermission = action.payload
        },
        
       
    }
})

export const { setLocationPermission, setGalleryPermission } = permissionSlice.actions;

export default permissionSlice.reducer;