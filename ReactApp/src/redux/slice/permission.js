import { createSlice } from "@reduxjs/toolkit";

const permissionSlice = createSlice({
    name: 'permissions',
    initialState: [],
    reducers: {
        initPermissions: (state, action) => {
            return action.payload
        },
        addPermission: (state, action) => {
            return [action.payload, ...state]
        },
        editPermissionRoleName: (state, action) => {
            const roleId = action.payload.roleId
            const newRoleName = action.payload.roleName
            const role = state.find(r => r.ID === roleId)
            role.name = newRoleName
            return state
        }
    }
})

export const { initPermissions, addPermission, editPermissionRoleName } = permissionSlice.actions
export default permissionSlice.reducer