import { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { roleService } from "../../services/role.service"
import { toast } from "react-toastify"
export function CreateRoleModal({ show, onHide }) {
  const [roleName, setRoleName] = useState("")

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
          console.log(response.data)
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