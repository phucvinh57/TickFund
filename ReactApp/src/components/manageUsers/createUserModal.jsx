import { useMemo } from "react";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { userService } from "../../services/user.service";

const initFormData = {
  studentId: "",
  name: "",
  email: "",
  roleId: 1,
  phone: "",
  expertise: "IT",
  departmentId: 1,
}

export function CreateUserModal({ show, onHide }) {
  const [formData, setFormData] = useState(initFormData)
  const roles = useSelector(state => state.roles)

  const roleOptions = useMemo(() => {
    return roles.map(role => ({ ID: role.ID, name: role.name }))
  }, [roles])

  return <Modal show={show} onHide={onHide} size="lg">
    <Modal.Header className="bg-primary text-white">
      <h5 className="m-auto">
        Tạo tài khoản
      </h5>
    </Modal.Header>
    <Modal.Body>
      <Form className="container" onSubmit={e => {
        e.preventDefault()
        console.log(formData)
        userService.getAllUserInfoWithRole().then(response => {
          console.log(response.data)
        })
        userService.create(formData).then(response => {
          setFormData(initFormData)
          onHide()
        }).catch(err => {
          console.log(err.response)
        })
      }}>
        <div className="row mb-2">
          <Form.Group className="col-6">
            <Form.Label className="fw-500">MSSV (ID cho tài khoản)</Form.Label>
            <Form.Control
              type="text" placeholder="MSSV"
              value={formData.studentId} required
              onChange={e => setFormData({ ...formData, studentId: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="col-6">
            <Form.Label className="fw-500">Tên thành viên</Form.Label>
            <Form.Control
              type="text" placeholder="Nguyễn Văn Dúi" required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </Form.Group>
        </div>

        <div className="row mb-2">
          <Form.Group className="col-6">
            <Form.Label className="fw-500">Email</Form.Label>
            <Form.Control
              type="email" placeholder="abcd@gmail.com" required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="col-6">
            <Form.Label className="fw-500">Số điện thoại</Form.Label>
            <Form.Control
              type="tel" placeholder="0123456789"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
            />
          </Form.Group>
        </div>

        <div className="row mb-2">
          <Form.Group className="col-6">
            <Form.Label className="fw-500">Chuyên môn</Form.Label>
            <Form.Select
              placeholder="Chuyên môn" required
              value={formData.expertise}
              onChange={e => setFormData({ ...formData, expertise: e.target.value })}
            >
              <option value={"IT"}>IT</option>
              <option value={"ME"}>Cơ khí</option>
              <option value={"DEE"}>Điện</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="col-6">
            <Form.Label>Vai trò</Form.Label>
            <Form.Select
              className="fw-500" placeholder="Vai trò" value={formData.roleId} required
              onChange={e => setFormData({ ...formData, roleId: parseInt(e.target.value) })}
            >
              {roleOptions.map(role => <option key={role.ID} value={role.ID}>{role.name}</option>)}
            </Form.Select>
          </Form.Group>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Thuộc ban</Form.Label>
          <Form.Select
            placeholder="Làm việc tại ban" required
            value={formData.departmentId}
            onChange={e => setFormData({ ...formData, departmentId: e.target.value })}
          >
            <option value={1}>{"Phát triển dự án"}</option>
            <option value={2}>{"Nghiên cứu khoa học"}</option>
            <option value={3}>{"Phát triển đội nhóm và con người"}</option>
          </Form.Select>
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button type="submit">Tạo tài khoản</Button>
        </div>
      </Form>
    </Modal.Body>
  </Modal>
}