import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const planningSlice = createSlice({
  name: 'planning',
  initialState,
  reducers: {
    addPlanning: (state, action) => {
      return [action.payload, ...state]
    },
    editPlanning: (state, action) => {
      const editData = action.payload
      let idx = state.findIndex(planning => editData.id === planning.id)
      if (idx !== -1) state[idx] = editData
      return state
    },
    dropPlanning: (state, action) => {
      const planningId = action.payload
      let idx = state.findIndex(val => val.id === planningId)
      if (idx !== -1) state.splice(idx, 1)
      return state
    }
  }
})

export const { addPlanning, editPlanning, dropPlanning } = planningSlice.actions
export default planningSlice.reducer