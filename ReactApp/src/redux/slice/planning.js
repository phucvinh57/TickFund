import { createSlice } from "@reduxjs/toolkit";
import {generateHexId} from '../../utils'

const planningSlice = createSlice({
    name: 'planning',
    initialState: [{
        id: generateHexId(),
        category: {
          name: "Tiền thiết bị",
          type: 'Thu',
        },
        amount: 50000,
        trader: '',
        startDate: '2020-03-11',
        isRepeat: 'false',
        repeat: {
          mode: 'cycle',
          times: '',
          cycle: 'day',
          hasEndDay: 'true',
          endDate: ''
        }
      }],
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
            if(idx !== -1) state.splice(idx, 1)
            return state
        }
    }
})

export const { addPlanning, editPlanning, dropPlanning } = planningSlice.actions
export default planningSlice.reducer