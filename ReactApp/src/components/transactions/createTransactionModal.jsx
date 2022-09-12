import { useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { AttachmentUploader } from "../attachment/attachmentUploader"
import { useDispatch, useSelector } from "react-redux"
import { convertUnifiedCodeToEmojiSymbol, dateToStringYYYYmmDD, prettyNumber } from "../../utils"
import DatePicker from "react-datepicker"
import { transactionService } from "../../services/transaction.service"
import { fileService } from "../../services/file.service"
import { toast } from "react-toastify"
import { INCOME, EXPENSE } from "../../constants/categoryTypes"
import { triggerReloadTransaction } from "../../redux/slice/transactionTrigger"

const initFormData = {
  type: 'expense',
  history: dateToStringYYYYmmDD(new Date()),
  note: '',
  amount: 0,
  category_name: "",
  user_id: ""
}

export default function AddTransactionModal({ show, onHide, planningData }) {
  const [formData, setFormData] = useState(initFormData)
  const [categoryType, setCategoryType] = useState(INCOME)
  const [fileData, setFileData] = useState([])

  const categories = useSelector((state) => state.categories)
  const users = useSelector((state) => state.users)
  const personal = useSelector((state) => state.personal)

  const dispatch = useDispatch()

  useEffect(() => {
    if (planningData) {
      setFormData({
        type: categories.find(category => category.name === planningData.categoryName).type,
        history: dateToStringYYYYmmDD(new Date()),
        note: '',
        amount: planningData.amount,
        category_name: planningData.categoryName,
        user_id: planningData.userId
      })
    }
  }, [categories, planningData])

  useEffect(() => {
    var defaultCategory = null
    const temp = categories.filter(c => c.type === categoryType)
    if (temp.length != 0) {
      defaultCategory = temp[0]
      setFormData({ ...formData, category_name: defaultCategory.name })
    }
  }, [categories, categoryType])

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
      if (fileData.length === 0) {
        createBody = { ...createBody, attachments: [], planningId: planningData ? planningData.ID : null }
      }
      else {
        fileData.forEach(file => fileForm.append('file', file, file.name))
        const fileUploadResponse = await fileService.uploadToTfService(fileForm)
        console.log(fileUploadResponse.data.id)
        createBody = { ...createBody, attachments: fileUploadResponse.data.id }
      }
      await transactionService.addTransactions(createBody)
      dispatch(triggerReloadTransaction())
      toast.success("Tạo giao dich thành công")
      setFormData(initFormData)
      onHide()
    }
    catch (err) {
      toast.error("Tạo giao dịch thất bại")
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
              type="text"
              required
            />
          </Form.Group>

          <Form.Group className="col-6">
            <Form.Label className="fw-500">Người giao dịch</Form.Label>
            <Form.Select
              required
              value={formData.user_id}
              onChange={e => setFormData({ ...formData, user_id: e.target.value })}
              disabled={!!planningData}
            >
              <option value={""} disabled> -- Chọn người giao dịch --</option>
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
                setCategoryType(e.target.value)
              }}
              value={categoryType}
              disabled={!!planningData}
              required
            >
              <option value={""} disabled> -- Loại danh mục --</option>
              <option value={INCOME}>Thu</option>
              <option value={EXPENSE}>Chi</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="col-6">
            <Form.Label className="fw-500">Danh mục</Form.Label>
            <Form.Select
              value={formData.category_name}
              onChange={e => setFormData({ ...formData, category_name: e.target.value })}
              disabled={!!planningData}
              required
            >
              <option value={""} disabled> -- Tên danh mục --</option>
              {categories
                .filter(c => c.type === categoryType)
                .map(c => <option key={c.name} value={c.name}>{c.name + " " + convertUnifiedCodeToEmojiSymbol(c.icon)}</option>)}
            </Form.Select>
          </Form.Group>
        </div>
        <Form.Group className="mb-2">
          <Form.Label className="fw-500">Ngày diễn ra giao dịch</Form.Label>
          <DatePicker
            className="form-control"
            dateFormat="dd/MM/yyyy"
            selected={new Date(formData.history)}
            onChange={newDate => setFormData({ ...formData, history: dateToStringYYYYmmDD(newDate) })} />
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

        <Button type="submit" className="float-end">Tạo giao dịch</Button>
      </Form>
    </Modal.Body>
  </Modal>
}
