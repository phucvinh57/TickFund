import { useSelector } from "react-redux";
import { useMemo } from "react";

export function useHasPermission(permissionId, actionId) {
    const userRole = useSelector(state => state.personal.role)
    const hasPermission = useMemo(() => {
        const permissionResource = userRole.resources.find(rsrc => rsrc.ID === permissionId)
        if (!permissionResource)
            return false
        const readAction = permissionResource.actions.find(action => action.ID === actionId)
        if (!readAction)
            return false
        return true
    }, [userRole, permissionId, actionId])
    return hasPermission
}