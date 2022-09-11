import { useEffect } from "react";
import { RoleList } from "../components/manageUsers/roleList";
import { UserTable } from "../components/manageUsers/userTable";
import { useDispatch, useSelector } from "react-redux"
import { initPermissions } from "../redux/slice/permission";
import { initRoles } from "../redux/slice/role"
import { roleService } from "../services/role.service";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { PERMISSION_RESOURCE_ID } from "../constants/resourceIds";
import { READ_ACTION_ID } from "../constants/actionIds";

export default function ManageUser() {
    const userRole = useSelector(state => state.personal.role)
    const dispatch = useDispatch()

    const hasReadRoleListPermission = useMemo(() => {
        // Find "nhóm quyền"
        const permissionResource = userRole.resources.find(rsrc => rsrc.ID === PERMISSION_RESOURCE_ID)
        if (!permissionResource)
            return false
        const readAction = permissionResource.actions.find(action => action.ID === READ_ACTION_ID)
        if (!readAction)
            return false
        return true
    }, [userRole])

    useEffect(() => {
        if (hasReadRoleListPermission)
            roleService.getPermission().then(response => {
                dispatch(initPermissions(response.data.permissions))
            }).catch(err => toast.error("Lỗi network"))
                
        roleService.getRoles().then(response => {
            dispatch(initRoles(response.data))
        }).catch(err => console.log(err => toast.error("Không thể load data cho role")))
    }, [dispatch, hasReadRoleListPermission])

    return <div>
        <UserTable />
        <hr />
        {hasReadRoleListPermission && <RoleList />}
    </div>
}