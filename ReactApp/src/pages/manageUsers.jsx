import { useEffect } from "react";
import { RoleList } from "../components/manageUsers/roleList";
import { UserTable } from "../components/manageUsers/userTable";
import { useDispatch } from "react-redux"
import { initPermissions } from "../redux/slice/permission";
import { initRoles } from "../redux/slice/role"
import { roleService } from "../services/role.service";
import { toast } from "react-toastify";
import { PERMISSION_RESOURCE_ID } from "../constants/resourceIds";
import { READ_ACTION_ID } from "../constants/actionIds";
import { useHasPermission } from "../hooks/hasPermission";

export default function ManageUser() {
    const dispatch = useDispatch()
    const hasReadRoleListPermission = useHasPermission(PERMISSION_RESOURCE_ID, READ_ACTION_ID)

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