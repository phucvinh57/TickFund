import { useEffect } from "react";
import { RoleList } from "../components/manageUsers/roleList";
import { UserTable } from "../components/manageUsers/userTable";
import { useDispatch } from "react-redux"
import { initPermissions } from "../redux/slice/permission";
import { initRoles } from "../redux/slice/role"
import { roleService } from "../services/role.service";

export default function ManageUser() {
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

    return <div>
        <UserTable />
        <hr />
        <RoleList />
    </div>
}