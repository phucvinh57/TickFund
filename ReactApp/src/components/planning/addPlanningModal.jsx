import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { INCOME, EXPENSE } from "../../constants/categoryTypes"
import planningService from "../../services/planning.service";
import { convertUnifiedCodeToEmojiSymbol } from "../../utils";
import { toast } from "react-toastify"
import { triggerReloadPlanning } from "../../redux/slice/planningTrigger";

const cycles = [{
  value: "day",
  label: "Ngày"
}, {
  value: "week",
  label: "Tuần"
}, {
  value: "month",
  label: "Tháng"
}, {
  value: "quarter",
  label: "Quý"
}, {
  value: "year",
  label: "Năm"
}]

const initFormData = {
  categoryName: "",
  amount: 0,
  userId: "",
  startDate: "",
  isRepeat: "false",
  repeat: {
    cycle: cycles[0].value,
    countdown: 1
  }
}

export function AddPlanningModal({ show, onHide }) {
  const categories = useSelector(state => state.categories)
  const users = useSelector(state => state.users)
  const [categoryType, setCategoryType] = useState('')
  const [formData, setFormData] = useState(initFormData)

  const dispatch = useDispatch()

  return <Modal show={show} onHide={onHide} size="lg">
    <Modal.Header className="bg-primary text-white">
      <h5 className="m-auto">
        Thêm dự trù
      </h5>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={e => {
        e.preventDefault()
        if(formData.repeat.countdown === 0) {
          toast.warn("Số lần lặp lại phải khác 0")
        }
        else planningService.addNew(formData).then(response => {
          toast.success("Tạo dự trù thành công")
          setFormData(initFormData)
          onHide()
          dispatch(triggerReloadPlanning())
        }).catch(err => {
          console.log(err.response.data)
          toast.error("Tạo dự trù thất bại")
        })
      }}>
        <div className="row mb-2">
          <Form.Group className="col-6">
            <Form.Label className="fw-500">Loại danh mục</Form.Label>
            <Form.Select
              required value={categoryType}
              onChange={e => {
                setCategoryType(e.target.value)
                setFormData({ ...formData, categoryName: "" })
              }}
            >
              <option value='' disabled>--- Loại danh mục ---</option>
              <option value={INCOME}>Thu</option>
              <option value={EXPENSE}>Chi</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="col-6">
            <Form.Label className="fw-500">Tên danh mục</Form.Label>
            <Form.Select required
              value={formData.categoryName}
              onChange={e => setFormData({ ...formData, categoryName: e.target.value })}
            >
              <option value='' disabled>--- Tên danh mục ---</option>
              {categories.reduce((filtered, category) => {
                if (category.type === categoryType) {
                  filtered.push(<option key={category.name} value={category.name}>
                    {category.name + " " + convertUnifiedCodeToEmojiSymbol(category.icon)}
                  </option>)
                }
                return filtered
              }, [])}
            </Form.Select>
          </Form.Group>
        </div>

        <div className="row mb-2">
          <Form.Group className="col-6">
            <Form.Label className="fw-500">Số tiền</Form.Label>
            <Form.Control
              type="number" min={1000} placeholder="Số tiền"
              value={formData.amount}
              onChange={e => setFormData({ ...formData, amount: e.target.valueAsNumber })}
            />
          </Form.Group>

          <Form.Group className="col-6">
            <Form.Label className="fw-500">Người giao dịch</Form.Label>
            <Form.Select
              value={formData.userId}
              required
              onChange={e => setFormData({ ...formData, userId: e.target.value })}
            >
              <option value=''>--- Chọn người giao dịch ---</option>
              {users.map(user => <option value={user.ID} key={user.ID}>
                {user.name}
              </option>)}
            </Form.Select>
          </Form.Group>
        </div>

        <div className="row mb-2">
          <Form.Group className="col-6">
            <Form.Label className="fw-500">Lặp lại</Form.Label>
            <Form.Select required value={formData.isRepeat}
              onChange={e => {
                console.log(e.target.value)
                setFormData({ ...formData, isRepeat: e.target.value })
              }}
            >
              <option value={"false"}>Không</option>
              <option value={"true"}>Có</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="col-6">
            <Form.Label className="fw-500">Ngày bắt đầu</Form.Label>
            <Form.Control
              type="date" required value={formData.startDate}
              onChange={e => setFormData({ ...formData, startDate: e.target.value })}
            />
          </Form.Group>
        </div>
        <div style={{ display: formData.isRepeat === 'true' ? 'block' : 'none' }}>
          <div className="row mb-2">
            <Form.Group className="col-6">
              <Form.Label className="fw-500">Chu kỳ</Form.Label>
              <Form.Select
                value={formData.repeat.cycle}
                onChange={e => setFormData({
                  ...formData,
                  repeat: { ...formData.repeat, cycle: e.target.value }
                })}
              >
                {cycles.map(cycle => <option value={cycle.value} key={cycle.value}>
                  {cycle.label}
                </option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="col-6">
              <Form.Label className="fw-500">Số lần lặp lại</Form.Label>
              <Form.Control
                value={formData.repeat.countdown}
                type="number"
                min={-1}
                required
                onChange={e => setFormData({
                  ...formData,
                  repeat: { ...formData.repeat, countdown: e.target.valueAsNumber }
                })}
              />
            </Form.Group>
          </div>
        </div>

        <Button type="submit" className="float-end">
          Tạo dự trù
        </Button>
      </Form>
    </Modal.Body>
  </Modal>
}   