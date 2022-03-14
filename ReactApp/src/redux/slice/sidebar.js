import { createSlice } from '@reduxjs/toolkit'

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        collapse: true
    },
    reducers: {
        setCollapse: (state, action) => {
            state.collapse = action.payload
            return state
        }
    }
})

export const { setCollapse } = sidebarSlice.actions
export default sidebarSlice.reducer