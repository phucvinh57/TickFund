import { createSlice } from "@reduxjs/toolkit";
import { genTransaction } from "../../components/exchanges/sampleData"; 

const transaction = genTransaction(72)

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: transaction, // Data of a page
  reducers: {
    addTransaction: (state, action) => {
      return [action.payload, ...state]
    },
    editTransaction: (state, action) => {
      const editData = action.payload
      let idx = state.findIndex(transaction => editData.id === transaction.id)
      if (idx !== -1) state[idx] = editData
      return state
    },
    dropTransaction: (state, action) => {
      const transactionId = action.payload
      let idx = state.findIndex(val => val.id === transactionId)
      if (idx !== -1) state.splice(idx, 1)
      return state
    }
  }
})

export const { addTransaction, editTransaction, dropTransaction } = transactionSlice.actions
export default transactionSlice.reducer