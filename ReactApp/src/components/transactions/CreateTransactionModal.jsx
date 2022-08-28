import { useState } from "react"
import { Form, Modal } from "react-bootstrap"
import { useSelector } from "react-redux"
import { EMPTY_AVATAR } from "../../resource"

export default function AddTransactionModal({ show, onHide }) {
  // const users = useSelector(state => state.user)
  // const categories = useSelector(state => state.category)

  const [files, setFiles] = useState([])

  return <Modal show={show} onHide={onHide} size='lg'>
    <Modal.Header className="bg-primary text-white">
      <h5 className="m-auto">
        Tạo giao dịch
      </h5>
    </Modal.Header>
    <Modal.Body>
      <Form method="POST" action="http://localhost:8081/transactions">
        <div className="row mb-2">
          <Form.Group className="col-6">
            <Form.Label>Số  tiền</Form.Label>
            <Form.Control type="number" />
          </Form.Group>

          <Form.Group className="col-6">
            <Form.Label>Người giao dịch</Form.Label>
            <Form.Select>
              <option value={"1915940"}>
                Nguyễn Phúc Vinh
              </option>
            </Form.Select>
          </Form.Group>
        </div>
        <div className="row mb-2">
          <Form.Group className="col-6">
            <Form.Label>Loại</Form.Label>
            <Form.Select>
              <option value={"INCOME"}>Thu</option>
              <option value={"EXPENSE"}>Chi</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="col-6">
            <Form.Label>Danh mục</Form.Label>
            <Form.Select>
              <option value={"tien nha"}>Tiền nhà</option>
            </Form.Select>
          </Form.Group>
        </div>
        <Form.Group>
          <Form.Label>Ngày diễn ra giao dịch</Form.Label>
          <Form.Control type="date"/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Thêm file mô tả</Form.Label>
          <input 
            type="file" multiple value={files} 
            onChange={e => setFiles([...files, e.target.value])}
          />
        </Form.Group>
        <button type="submit">Submit</button>
      </Form>
    </Modal.Body>
  </Modal>
}
