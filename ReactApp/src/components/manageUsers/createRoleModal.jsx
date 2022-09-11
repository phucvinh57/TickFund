import { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { roleService } from "../../services/role.service"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux";
import { addRole } from "../../redux/slice/role";
import { addPermission } from "../../redux/slice/permission";

export function CreateRoleModal({ show, onHide }) {
  const [roleName, setRoleName] = useState("")
  const dispatch = useDispatch()

  return <Modal show={show} onHide={onHide}>
    <Modal.Header className="bg-primary text-white">
      <h5 className="m-auto">
        Thêm vai trò
      </h5>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={e => {
        e.preventDefault()
        roleService.createRole(roleName).then(response => {
          toast.success("Thêm vai trò thành công")
          const newRole = {
            ID: response.data.ID,
            name: response.data.name
          }
          dispatch(addRole(newRole))
          dispatch(addPermission(response.data))
          onHide()
        }).catch(err => toast.error(err.response.data.message))
      }}>
        <Form.Group className="mb-1">
          <InputGroup>
            <Form.Control
              type="text" minLength={4} required
              value={roleName} placeholder="Tên vai trò"
              onChange={e => setRoleName(e.target.value)}
            />
            <Button type="submit">
              Thêm
            </Button>
          </InputGroup>

        </Form.Group>

      </Form>
    </Modal.Body>
  </Modal>
}