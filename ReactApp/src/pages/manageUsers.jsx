import { useEffect } from "react";
import { RoleList } from "../components/manageUsers/roleList";
import { UserTable } from "../components/manageUsers/userTable";
import { useDispatch } from "react-redux"
import { initRoles } from "../redux/slice/roles";
import { roleService } from "../services/role.service";

export default function ManageUser() {
    const dispatch = useDispatch()
    useEffect(() => {
        roleService.getPermission().then(response => {
            dispatch(initRoles(response.data.roles))
        })
    }, [dispatch])

    return <div>
        <UserTable />
        <hr />
        <RoleList />
    </div>
}