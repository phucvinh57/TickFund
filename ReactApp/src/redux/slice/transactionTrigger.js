import { createSlice } from "@reduxjs/toolkit";

const transactionTriggerSlice = createSlice({
    name: "transactionTrigger",
    initialState: false,
    reducers: {
        triggerReloadTransaction: (state, action) => {
            return !state
        }
    }
})

export const { triggerReloadTransaction } = transactionTriggerSlice.actions
export default transactionTriggerSlice.reducer