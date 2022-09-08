import { useEffect } from "react";
import { useState } from "react";
import { Accordion } from "react-bootstrap";
import { roleService } from "../../services/role.service";
import { v4 as uuidv4 } from "uuid";
import { RoleItem } from "./roleItem";
import { useSelector } from "react-redux";

export function RoleList() {
  const permissions = useSelector(state => state.permissions)
  const [resourceActionMappings, setResourceActionMappings] = useState([])
  useEffect(() => {
    roleService.getResourceActionMapping().then(response => {
      setResourceActionMappings(response.data.resources)
    })
  }, [])

  const [roleConfigs, setRoleConfigs] = useState([])

  useEffect(() => {
    const config = permissions.map(role => {
      const resources = resourceActionMappings.map(resource => {
        const userResource = role.resources.find(rsrc => rsrc.ID === resource.ID)
        if (!userResource) {
          return {
            key: uuidv4(),
            ID: resource.ID,
            name: resource.name,
            actions: resource.actions.map(action => ({ ...action, permit: false, key: uuidv4() }))
          }
        }
        const actions = resource.actions.map(action => {
          const userAction = userResource.actions.find(uaction => uaction.ID === action.ID)
          return {
            ...action,
            permit: typeof userAction !== "undefined",
            key: uuidv4()
          }
        })
        return {
          ID: resource.ID,
          name: resource.name,
          key: uuidv4(),
          actions
        }
      })
      return {
        ID: role.ID,
        name: role.name,
        key: uuidv4(),
        resources
      }
    })
    setRoleConfigs(config)
  }, [permissions, resourceActionMappings])

  const changePolicy = (roleId, resourceId, actionId, permit) => {
    const copyRoleConfigs = [...roleConfigs]
    const role = copyRoleConfigs.find(roleConfig => roleConfig.ID === roleId)
    const resource = role.resources.find(rsrc => rsrc.ID === resourceId)
    const action = resource.actions.find(action => action.ID === actionId)

    action.permit = permit
    setRoleConfigs(copyRoleConfigs)
  }

  return <div className="mt-3">
    <h4>Quản lý quyền truy cập</h4>
    <Accordion>
      {roleConfigs.map(itemConfig => <RoleItem
        config={itemConfig}
        key={itemConfig.key}
        changePolicy={changePolicy}
      />)}
    </Accordion>
  </div>
}