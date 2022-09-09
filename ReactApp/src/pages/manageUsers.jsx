import { useEffect } from "react";
import { RoleList } from "../components/manageUsers/roleList";
import { UserTable } from "../components/manageUsers/userTable";
import { useDispatch, useSelector } from "react-redux"
import { initPermissions } from "../redux/slice/permission";
import { initRoles } from "../redux/slice/role"
import { roleService } from "../services/role.service";
import { useMemo } from "react";

const PERMISSION_RESOURCE_ID = 4
const READ_ACTION_ID = 2

export default function ManageUser() {
    const userRole = useSelector(state => state.personal.role)
    const dispatch = useDispatch()
    useEffect(() => {
        roleService.getPermission().then(response => {
            dispatch(initPermissions(response.data.permissions))
        }).catch(err => {
            console.log(err.response)
        })
        roleService.getRoles().then(response => {
            dispatch(initRoles(response.data))
        })
    }, [dispatch])

    const canViewRoleList = useMemo(() => {
        // Find "nhóm quyền"
        const permissionResource = userRole.resources.find(rsrc => rsrc.ID === PERMISSION_RESOURCE_ID)
        if(!permissionResource) return false
        const readAction = permissionResource.actions.find(action => action.ID === READ_ACTION_ID)
        if(!readAction) return false
        return true
    })

    return <div>
        <UserTable />
        <hr />
        {canViewRoleList && <RoleList />}
    </div>
}