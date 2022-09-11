import { useEffect } from "react";
import { useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import { roleService } from "../../services/role.service";
import { v4 as uuidv4 } from "uuid";
import { RoleItem } from "./roleItem";
import { useSelector } from "react-redux";
import { toast } from "react-toastify"
import { CreateRoleModal } from "./createRoleModal";
import { EditRoleNameModal } from "./editRoleNameModal";

export function RoleList() {
  const permissions = useSelector(state => state.permissions)
  const [resourceActionMappings, setResourceActionMappings] = useState([])
  useEffect(() => {
    roleService.getResourceActionMapping().then(response => {
      setResourceActionMappings(response.data.resources)
    })
  }, [])

  const [roleConfigs, setRoleConfigs] = useState([])
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false)
  const [showEditRoleNameModal, setShowEditRoleNameModal] = useState(false)
  const [edittingRole, setEdittingRole] = useState(null)

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

  const setPolicy = (roleId, resourceId, actionId, permit) => {
    const copyRoleConfigs = [...roleConfigs]
    const role = copyRoleConfigs.find(roleConfig => roleConfig.ID === roleId)
    const resource = role.resources.find(rsrc => rsrc.ID === resourceId)
    const action = resource.actions.find(action => action.ID === actionId)

    action.permit = permit
    setRoleConfigs(copyRoleConfigs)
  }

  const updateRolePolicyById = (roleId) => {
    const role = roleConfigs.find(r => r.ID === roleId)
    const data = {
      roleId: role.ID,
      mappings: []
    }
    role.resources.forEach(resource => {
      resource.actions.forEach(action => {
        if (action.permit === true)
          data.mappings.push({
            resourceId: resource.ID,
            actionId: action.ID
          })
      })
    })
    roleService.updatePermissions(data).then(response => {
      console.log(response.data)
      toast.success("Cập nhật quyền truy cập thành công")
    }).catch(err => toast.error("Xảy ra lỗi"))
  }

  return <div className="mt-4">
    <div className="d-flex justify-content-between align-items-center mb-2">
      <h4>Quản lý quyền truy cập</h4>
      <Button onClick={() => setShowCreateRoleModal(true)}>Thêm vai trò</Button>
    </div>

    <CreateRoleModal show={showCreateRoleModal} onHide={() => setShowCreateRoleModal(false)}/>
    {edittingRole && <EditRoleNameModal 
      show={showEditRoleNameModal} onHide={() => setShowEditRoleNameModal(false)}
      roleId={edittingRole.ID} currRoleName={edittingRole.name}
    />}
    <Accordion>
      {roleConfigs.map(itemConfig => <RoleItem
        config={itemConfig}
        key={itemConfig.key}
        setPolicy={setPolicy}
        updatePolicy={updateRolePolicyById}
        openRoleNameModal={() => {
          setEdittingRole({
            ID: itemConfig.ID,
            name: itemConfig.name
          })
          setShowEditRoleNameModal(true)
        }}
      />)}
    </Accordion>
  </div>
}