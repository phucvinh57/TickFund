// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
// import categoriesService from "../../services/categories.service"
// import { removeAccents } from "../../utils/utils"

// const initialState = {
//     categories: [],
//     status: 'idle', // "idle" | 'loading' | 'succeeded | 'failed'
//     error: null
// }

// const categorySlice = createSlice({
//     name: 'categories',
//     initialState,
//     reducers: {
//         addCategory: (state, action) => {
//             const isDuplicated = (lhs, rhs) => {
//                 return removeAccents(lhs.name) === removeAccents(rhs.name)
//             }
//             return !state.categories.some(el => isDuplicated(el, action.payload)) ? [...state, action.payload] : state
//         },
//         editCategory: (state,action) => {
//             const editData = action.payload
//             let idx = state.categories.findIndex(category => editData.name === category.name)
//             if (state !== -1) state[idx] = editData
//             return state
//         },
//         removeCategory: (state,action) => {
//             return state.categories.filter((category)=> category.name !== action.payload.name)
//         }
//     }
// })

// export const selectAllCategories = (state) => state.categories.categories

// export const { addCategory, editCategory, removeCategory } = categorySlice.actions
// export default categorySlice.reducer
