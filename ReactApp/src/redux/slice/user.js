import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        initUser: (state, action) => {
            console.log(action.payload)
            return action.payload
        },
        setAvatarUrl: (state, action) => {
            return { ...state, avatarUrl: action.payload }
        }
    }
})

export const { initUser, setAvatarUrl } = userSlice.actions
export default userSlice.reducer