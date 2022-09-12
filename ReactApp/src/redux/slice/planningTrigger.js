import { createSlice } from "@reduxjs/toolkit";

const planningTriggerSlice = createSlice({
    name: "planningTrigger",
    initialState: false,
    reducers: {
        triggerReloadPlanning: (state, action) => {
            return !state
        }
    }
})

export const { triggerReloadPlanning } = planningTriggerSlice.actions
export default planningTriggerSlice.reducer