import { createSlice } from "@reduxjs/toolkit"
import { genCategory } from "../../components/transactions/sampleData"
import { removeAccents } from "../../utils"


const data = genCategory()

const categorySlice = createSlice({
    name: 'category',
    initialState: data,
    reducers: {
        addCategory: (state,action) => {
            const isDuplicated = (lhs, rhs) => {
                return removeAccents(lhs.name) === removeAccents(rhs.name)
            }
            return !state.some(el => isDuplicated(el, action.payload)) ? [...state, action.payload] : state
        },
        editCategory: (state,action) => {
            const editData = action.payload
            let idx = state.findIndex(category => editData.name === category.name)
            if (state !== -1) state[idx] = editData
            return state
        },
        removeCategory: (state,action) => {
            return state.filter((category)=> category.name !== action.payload.name)
        }
    }
})

export const { addCategory, editCategory, removeCategory } = categorySlice.actions

export default categorySlice.reducer
