import { useState } from "react"

import { Button, Form, Modal } from "react-bootstrap"
import { AttachmentUploader } from "../attachment/attachmentUploader"

const defaultState = {
  userId: "",
  amount: "",
  categoryName: "",
  history: "",
  notes: "",
  attachments: [{
    path: "",
    name: ""
  }]
}

export default function CreateTransactionModal({ show, onHide }) {
  // Users & categories must select from state
  // const users = useSelector(state => state.user)
  // const categories = useSelector(state => state.category)


  const [formData, setFormData] = useState(defaultState)
  const [categoryType, setCategoryType] = useState("INCOME")

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
            <Form.Label className="fw-bold">Người giao dịch:</Form.Label>
            <Form.Select value={formData.userId} onChange={e => setFormData({
              ...formData,
              userId: e.target.value
            })}>
              <option value={"1915940"}>
                Nguyễn Phúc Vinh
              </option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="col-6">
            <Form.Label className="fw-bold">Số  tiền:</Form.Label>
            <Form.Control type="number" value={formData.amount} onChange={e => setFormData({
              ...formData,
              amount: e.target.value
            })} />
          </Form.Group>
        </div>
        <div className="row mb-2">
          <Form.Group className="col-6">
            <Form.Label className="fw-bold">Loại:</Form.Label>
            <Form.Select value={categoryType} onChange={e => setCategoryType(e.target.value)}>
              <option value={"INCOME"}>Thu</option>
              <option value={"EXPENSE"}>Chi</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="col-6">
            <Form.Label className="fw-bold">Danh mục:</Form.Label>
            <Form.Select value={formData.categoryName} onChange={e => setFormData({
              ...formData,
              categoryName: e.target.value
            })}>
              <option value={"tien nha"}>Tiền nhà</option>
            </Form.Select>
          </Form.Group>
        </div>

        <Form.Group className="mb-2">
          <Form.Label className="fw-bold">Ngày diễn ra giao dịch:</Form.Label>
          <Form.Control type="date" value={formData.history} onChange={e => setFormData({
            ...formData,
            history: e.target.value
          })} />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label className="fw-bold">Ghi chú:</Form.Label>
          <Form.Control as="textarea" rows={4} value={formData.notes} onChange={e => setFormData({
            ...formData,
            notes: e.target.value
          })} />
        </Form.Group>

        <AttachmentUploader />
        <div>
          <Button type="submit" className="float-end">Tạo giao dịch</Button>
        </div>

      </Form>
    </Modal.Body>
  </Modal>
}
