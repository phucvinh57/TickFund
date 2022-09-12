import { useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { AttachmentUploader } from "../attachment/attachmentUploader"
import { useSelector } from "react-redux"
import { dateToString, prettyNumber } from "../../utils"
import DatePicker from "react-datepicker"
import { transactionService } from "../../services/transaction.service"
import { fileService } from "../../services/file.service"
import { toast } from "react-toastify"

const initFormData = {
  type: 'expense',
  history: dateToString(new Date()),
  note: '',
  amount: 1000,
  category_name: "",
  user_id: ""
}
export default function AddTransactionModal({ show, onHide, planningData }) {
  const [formData, setFormData] = useState(initFormData)
  const [isExpenseSelect, setIsExpenseSelect] = useState(true)
  const [fileData, setFileData] = useState([])

  const categories = useSelector((state) => state.categories)
  const users = useSelector((state) => state.users)
  const personal = useSelector((state) => state.personal)

  useEffect(() => {
    if (planningData) {
      const x = {
        type: categories.find(category => category.name === planningData.categoryName).type,
        history: dateToString(new Date()),
        note: '',
        amount: planningData.amount,
        category_name: planningData.categoryName,
        user_id: planningData.userId
      }
      console.log(x)

      setFormData(x)
    }
  }, [categories, planningData,])

  useEffect(() => {
    var defaultCategory = null
    const temp = categories.filter(c => c.type == (isExpenseSelect ? 'expense' : 'income'))
    if (temp.length != 0) {
      defaultCategory = temp[0]
      setFormData({ ...formData, category_name: defaultCategory.name })
    }
  }, [categories])

  useEffect(() => {
    setFormData({ ...formData, user_id: personal.ID })
  }, [personal])

  function onFileChange(fileData) {
    setFileData(fileData)
  }

  async function createTransaction() {
    var createBody = { ...formData }
    delete createBody.type

    const fileForm = new FormData()
    try {
      if (fileData.length == 0) {
        createBody = { ...createBody, attachments: [] }
      }
      else {
        fileData.forEach(file => fileForm.append('file', file, file.name))
        const fileUploadResponse = await fileService.uploadToTfService(fileForm)
        createBody = { ...createBody, attachments: fileUploadResponse.data.id }
      }
      await transactionService.addTransactions(createBody)
      toast.success("Tạo giao dich thành công")
      setFormData(initFormData)
      onHide()
    }
    catch (err) {
      alert("Tao giao dịch thất bại")
    }
  }

  return <Modal show={show} onHide={() => {
    onHide()
    setFormData(initFormData)
  }} size='lg'>
    <Modal.Header className="bg-primary text-white">
      <h5 className="m-auto">
        Tạo giao dịch
      </h5>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={e => {
        e.preventDefault()
        createTransaction()
      }}>
        <div className="row mb-2">
          <Form.Group className="col-6">
            <Form.Label className="fw-500">Số  tiền</Form.Label>
            <Form.Control
              value={formData.amount ? prettyNumber(formData.amount) : '0'}
              onChange={e => {
                const removeComma = e.target.value.replaceAll(',', '')
                if (isNaN(removeComma)) return
                const newValue = parseInt(removeComma)
                if (formData.amount != newValue) {
                  setFormData({ ...formData, amount: newValue })
                }
              }}
              type="text" />
          </Form.Group>

          <Form.Group className="col-6">
            <Form.Label className="fw-500">Người giao dịch</Form.Label>
            <Form.Select
              value={formData.user_id}
              onChange={e => setFormData({ ...formData, user_id: e.target.value })}
              disabled={!!planningData}
            >
              {users.map(u =>
                <option key={u.ID} value={u.ID}>{u.name}</option>)}
            </Form.Select>
          </Form.Group>
        </div>
        <div className="row mb-2">
          <Form.Group className="col-6">
            <Form.Label className="fw-500">Loại</Form.Label>
            <Form.Select
              onChange={e => {
                setIsExpenseSelect(e.target.value == 'true')
              }}
              value={isExpenseSelect}
              disabled={!!planningData}
            >
              <option value={false}>Thu</option>
              <option value={true}>Chi</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="col-6">
            <Form.Label className="fw-500">Danh mục</Form.Label>
            <Form.Select
              value={formData.category_name ? formData.category_name : null}
              onChange={e => setFormData({ ...formData, category_name: e.target.value })}
              disabled={!!planningData}
            >
              {categories
                .filter(c => c.type == (isExpenseSelect ? 'expense' : 'income'))
                .map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
            </Form.Select>
          </Form.Group>
        </div>
        <Form.Group className="mb-2">
          <Form.Label className="fw-500">Ngày diễn ra giao dịch</Form.Label>
          {/* <Form.Control
          placeholder={"dd/mm/yyyy"}
          format={"dd/mm/yyyy"}
            // value={formData.history}
            onChange={e => setFormData({...formData, history: (e.target.value)})}
            type="date"/> */}
          <DatePicker
            className="form-control"
            dateFormat="dd/MM/yyyy"
            selected={new Date(formData.history)}
            onChange={newDate => setFormData({ ...formData, history: dateToString(newDate) })} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label className="fw-500">Ghi chú</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            onChange={e => setFormData({ ...formData, note: e.target.value })}>

          </Form.Control>
        </Form.Group>
        <AttachmentUploader onFileChange={onFileChange} />

        <Button type="submit" className="float-end">Tạo giao dich</Button>
      </Form>
    </Modal.Body>
  </Modal>
}
