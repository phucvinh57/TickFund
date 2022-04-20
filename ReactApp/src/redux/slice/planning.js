import { createSlice } from "@reduxjs/toolkit";
import randLogData from '../../components/planning/sampleData'

const data = randLogData()

const planningSlice = createSlice({
  name: 'planning',
  initialState: data, // Data of a page
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