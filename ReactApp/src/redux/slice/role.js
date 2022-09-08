import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
    name: 'roles',
    initialState: [],
    reducers: {
        initRoles: (state, action) => {
            return action.payload
        },
        addRole: (state, action) => {
            return [action.payload, ...state]
        }
    }
})

export const { initRoles, addRole } = roleSlice.actions
export default roleSlice.reducer