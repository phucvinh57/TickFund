import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
    name: 'roles',
    initialState: [],
    reducers: {
        initRoles: (state, action) => {
            return action.payload
        },
        addRole: (state, action) => {
            return [action.payload, ...state]
        },
        editRoleName: (state, action) => {
            const roleId = action.payload.roleId
            const newRoleName = action.payload.roleName
            const role = state.find(r => r.ID === roleId)
            role.name = newRoleName
            return state
        }
    }
})

export const { initRoles, addRole, editRoleName } = roleSlice.actions
export default roleSlice.reducer