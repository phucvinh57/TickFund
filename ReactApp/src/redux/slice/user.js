import { createSlice } from "@reduxjs/toolkit";
import { genUser } from "../../components/transactions/sampleData"; 

const users = genUser();

const userSlice = createSlice({
    name: 'user',
    initialState: users,
    reducers : {
        addUser: (state, action) => {
            return [action.payload, ...state]
        },
        dropUser: (state, action) => {
            const username = action.payload
            let idx = state.findIndex(val => val.user === username)
            if (idx !== -1) state.splice(idx, 1)
            return state
        }
    }
})

export const { addUser, dropUser } = userSlice.actions
export default userSlice.reducer