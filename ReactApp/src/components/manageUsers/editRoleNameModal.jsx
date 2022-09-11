import { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { roleService } from "../../services/role.service"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux";
import { editRoleName } from "../../redux/slice/role";
import { editPermissionRoleName } from "../../redux/slice/permission";

export function EditRoleNameModal({ show, onHide, roleId, currRoleName }) {
  const [roleName, setRoleName] = useState("")
  const dispatch = useDispatch()

  return <Modal show={show} onHide={onHide}>
    <Modal.Header className="bg-primary text-white">
      <h5 className="m-auto">
        Đổi tên vai trò
      </h5>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={e => {
        e.preventDefault()
        roleService.updateRoleName(roleId, roleName).then(response => {
          const role = {
            roleId: response.data.ID,
            roleName: response.data.name
          }
          dispatch(editRoleName(role))
          dispatch(editPermissionRoleName(role))
          setRoleName("")
          onHide()
          toast.success("Đổi tên vai trò thành công")
        }).catch(err => {
          console.log(err)
          toast.error(err)
        })
      }}>
        <Form.Group className="mb-1">
          <InputGroup>
            <Form.Control
              type="text" minLength={4} required
              value={roleName} placeholder={"Tên cũ: " + currRoleName}
              onChange={e => setRoleName(e.target.value)}
            />
            <Button type="submit">
              Lưu
            </Button>
          </InputGroup>
        </Form.Group>
      </Form>
    </Modal.Body>
  </Modal>
}