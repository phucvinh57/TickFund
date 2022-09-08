import { createSlice } from "@reduxjs/toolkit";

const permissionSlice = createSlice({
    name: 'permissions',
    initialState: [],
    reducers: {
        initPermissions: (state, action) => {
            return action.payload
        },
        addPermission: (state, action) => {
            return [action.payload, ...state]
        }
    }
})

export const { initPermissions, addPermission } = permissionSlice.actions
export default permissionSlice.reducer