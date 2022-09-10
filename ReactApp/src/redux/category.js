import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoriesService from "../services/categories.service";

const initialState = [];

export const postCategory = createAsyncThunk(
  'category/create',
  async ({ name, type, icon }) => {
    const res = await categoriesService.addNew({ name, type, icon })
    return res.data
  }
)

export const getCategory = createAsyncThunk(
  'category/get',
  async () => {
    const res = await categoriesService.getAll()
    return res.data
  }
)

export const putCategory = createAsyncThunk(
  'category/put',
  async (name, data) => {
    const res = await categoriesService.update(name, data)
    return res.data
  }
)
export const deleteCategory = createAsyncThunk(
  'category/delete',
  async ({ name }) => {
    await categoriesService.remove(name)
    return { name }
  }
)

const categoriesSlice = createSlice({
  name: 'category',
  initialState,
  extraReducers: {
    [postCategory.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [getCategory.fulfilled]: (state, action) => {
      return [...action.payload]
    },
    [putCategory.fulfilled]: (state, action) => {
      const index = state.findIndex(category => category.name === action.payload.name);
      state[index] = {
        ...state[index],
        ...action.payload,
      }
    },
    [deleteCategory.fulfilled]: (state, action) => {
      let index = state.findIndex(({ name }) => name === action.payload.name);
      state.splice(index, 1);
    }
  }
})

export const selectAllCategories = (state) => state.category

const { reducer } = categoriesSlice;
export default reducer;