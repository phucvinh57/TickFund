import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        initUser: (state, action) => {
            return action.payload
        },
        setAvatarUrl: (state, action) => {
            return { ...state, avatarUrl: action.payload }
        },
        setUserInfo: (state, action) => {
            return {
                ...state,
                email: action.payload.email,
                name: action.payload.name,
                phone: action.payload.phone,
                birthday: action.payload.birthday,
                expertise: action.payload.expertise,
                department: action.payload.department
            }
        }
    }
})

export const { initUser, setAvatarUrl, setUserInfo } = userSlice.actions
export default userSlice.reducer