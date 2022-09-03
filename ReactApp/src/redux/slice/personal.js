import { createSlice } from "@reduxjs/toolkit";

const personalSlice = createSlice({
    name: 'personal',
    initialState: null,
    reducers: {
        initPersonal: (state, action) => {
            return action.payload
        },
        setAvatarUrl: (state, action) => {
            return { ...state, avatarUrl: action.payload }
        },
        setPersonalInfo: (state, action) => {
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

export const { initPersonal, setPersonalInfo, setAvatarUrl } = personalSlice.actions
export default personalSlice.reducer