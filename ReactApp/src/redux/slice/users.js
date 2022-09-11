import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        initUsers: (state, action) => {
            return action.payload
        },
        addUser: (state, action) => {
            return [action.payload, ...state]
        }
    }
})

export const { initUsers, addUser } = usersSlice.actions
export default usersSlice.reducer