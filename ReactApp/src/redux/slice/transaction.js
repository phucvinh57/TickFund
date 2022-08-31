import { createSlice } from "@reduxjs/toolkit";
import { genTransaction } from "../../components/transactions/sampleData"; 

// const data = genTransaction(72)
const data = []

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: data, // Data of a page
  reducers: {
    addTransaction: (state, action) => {
      return [action.payload, ...state]
    }
  }
})

export const { addTransaction } = transactionSlice.actions
export default transactionSlice.reducer