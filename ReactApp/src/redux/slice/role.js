import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
    name: 'role',
    initialState: [],
    reducers : {
        addRole: (state, action) => {
            return [action.payload, ...state]
        }
    }
})

export const { addRole } = roleSlice.actions
export default roleSlice.reducer