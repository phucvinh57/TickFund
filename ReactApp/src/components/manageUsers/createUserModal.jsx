import { Form, Modal } from "react-bootstrap";

export function CreateUserModal({ show, onHide }) {
  return <Modal show={show} onHide={onHide} size="lg">
    <Modal.Header className="bg-primary text-white">
      <h5 className="m-auto">
        Tạo tài khoản
      </h5>
    </Modal.Header>
    <Modal.Body>
      <Form className="container">
        <div className="row mb-2">
          <Form.Group className="col-6">
            <Form.Label className="fw-500">MSSV (ID cho tài khoản)</Form.Label>
            <Form.Control type="text" placeholder="MSSV"/>
          </Form.Group>
          <Form.Group className="col-6">
            <Form.Label className="fw-500">Tên thành viên</Form.Label>
            <Form.Control type="text" placeholder="Nguyễn Văn Dúi"/>
          </Form.Group>
        </div>

        <div className="row mb-2">
          <Form.Group className="col-6">
            <Form.Label className="fw-500">Chuyên môn</Form.Label>
            <Form.Select placeholder="Chuyên môn">
              <option value={"IT"}>IT</option>
              <option value={"ME"}>Cơ khí</option>
              <option value={"DEE"}>Điện</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="col-6">
            <Form.Label>Vai trò</Form.Label>
            <Form.Select className="fw-500" placeholder="Vai trò">
              <option value={1}>Thành viên</option>
            </Form.Select>
          </Form.Group>
        </div>

        <div className="row mb-2">
          <Form.Group className="col-6">
            <Form.Label className="fw-500">Email</Form.Label>
            <Form.Control type="email" placeholder="abcd@gmail.com"/>
          </Form.Group>
          <Form.Group className="col-6">
            <Form.Label className="fw-500">Số điện thoại</Form.Label>
            <Form.Control type="tel" placeholder="0123456789"/>
          </Form.Group>
        </div>

        <Form.Group>
          <Form.Label>Thuộc ban</Form.Label>
          <Form.Select placeholder="Làm việc tại ban">
            <option value={1}>{"Ban Phát triển dự án"}</option>
            <option value={2}>{"Ban Nghiên cứu khoa học"}</option>
            <option value={3}>{"Ban Phát triển đội nhóm và con người"}</option>
          </Form.Select>
        </Form.Group>
      </Form>
    </Modal.Body>
  </Modal>
}