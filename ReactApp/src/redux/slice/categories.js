import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: [],
    reducers: {
        initCategories: (state, action) => {
            return action.payload
        },
        addCategory: (state, action) => {
            state.push(action.payload)
            return state
        }
    }
})

export const { initCategories, addCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;