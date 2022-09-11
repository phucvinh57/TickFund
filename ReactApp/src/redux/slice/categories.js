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
        },
        deleteCategory: (state, action) => {
            const idx = state.findIndex(category => category.name === action.payload)
            state.splice(idx, 1)
            return state
        }
    }
})

export const { initCategories, addCategory, deleteCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;