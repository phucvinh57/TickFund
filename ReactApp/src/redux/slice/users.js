import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: 'users',
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

export const { initUser, addUser } = usersSlice.actions
export default usersSlice.reducer