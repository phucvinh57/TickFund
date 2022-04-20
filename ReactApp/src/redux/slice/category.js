import { createSlice } from "@reduxjs/toolkit"
import { categories } from "../../components/planning/sampleData"



const categorySlice = createSlice({
    name: 'category',
    initialState: categories,
    reducers: {
        addCategory: (state,action) => {
            return [...state, action.payload]
        },
        editCategory: (state,action) => {
            const editData = action.payload
            let idx = state.findIndex(category => editData.name == category.name)
            if (state != -1) state[idx] = editData
            return state
        },
        removeCategory: (state,action) => {
            return state.filter((category)=> category.name !== action.payload.name)
        }
    }
})

export const {categoryAdded} = categorySlice.actions

export default categorySlice.reducer
