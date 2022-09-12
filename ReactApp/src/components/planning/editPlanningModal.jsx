import { useState } from "react";
import { Button, ButtonGroup, Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { INCOME, EXPENSE } from "../../constants/categoryTypes"
import planningService from "../../services/planning.service";
import { convertUnifiedCodeToEmojiSymbol } from "../../utils";
import { toast } from "react-toastify"
import { useEffect } from "react";

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

const initPlanningFormData = {
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



export function EditPlanningModal({ show, onHide, planningData, onResolve }) {
  const categories = useSelector(state => state.categories)
  const users = useSelector(state => state.users)
  const [categoryType, setCategoryType] = useState('')
  const [planningFormData, setPlanningFormData] = useState(initPlanningFormData)

  useEffect(() => {
    const category = categories.find(c => c.name === planningData.categoryName)
    setCategoryType(category.type)
  }, [planningData.categoryName, categories])

  useEffect(() => {
    setPlanningFormData(planningData)
  }, [planningData])

  const updatePlanning = e => {
    e.preventDefault()
    if (planningFormData.repeat.countdown === 0) {
      toast.warn("Số lần lặp lại phải khác 0")
    }
    else planningService.update(planningData.ID, planningFormData).then(response => {
      toast.success("Thay đổi dự trù thành công")
      onHide()
    }).catch(err => {
      console.log(err.response.data)
      toast.error("Thay đổi dự trù thất bại")
    })
  }
  const deletePlanning = planningId => {
    planningService.remove(planningId).then(response => {
      onHide()
      toast.success("Xóa dự trù thành công")
    }).catch(er => {
      toast.error("Xóa dự trù thất bại")
    })
  }

  return <Modal show={show} onHide={onHide} size="lg">
    <Modal.Header className="bg-primary text-white">
      <h5 className="m-auto">
        Thêm dự trù
      </h5>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={updatePlanning}>
        <div className="row mb-2">
          <Form.Group className="col-6">
            <Form.Label className="fw-500">Loại danh mục</Form.Label>
            <Form.Select
              required value={categoryType}
              onChange={e => {
                setCategoryType(e.target.value)
                setPlanningFormData({ ...planningFormData, categoryName: "" })
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
              value={planningFormData.categoryName}
              onChange={e => setPlanningFormData({ ...planningFormData, categoryName: e.target.value })}
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
              value={planningFormData.amount}
              onChange={e => setPlanningFormData({ ...planningFormData, amount: e.target.valueAsNumber })}
            />
          </Form.Group>

          <Form.Group className="col-6">
            <Form.Label className="fw-500">Người giao dịch</Form.Label>
            <Form.Select
              value={planningFormData.userId}
              required
              onChange={e => setPlanningFormData({ ...planningFormData, userId: e.target.value })}
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
            <Form.Select required value={planningFormData.isRepeat}
              onChange={e => {
                console.log(e.target.value)
                setPlanningFormData({ ...planningFormData, isRepeat: e.target.value })
              }}
            >
              <option value={"false"}>Không</option>
              <option value={"true"}>Có</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="col-6">
            <Form.Label className="fw-500">Ngày bắt đầu</Form.Label>
            <Form.Control
              type="date" required value={planningFormData.startDate}
              onChange={e => setPlanningFormData({ ...planningFormData, startDate: e.target.value })}
            />
          </Form.Group>
        </div>
        <div style={{ display: planningFormData.isRepeat === 'true' ? 'block' : 'none' }}>
          <div className="row mb-2">
            <Form.Group className="col-6">
              <Form.Label className="fw-500">Chu kỳ</Form.Label>
              <Form.Select
                value={planningFormData.repeat.cycle}
                onChange={e => setPlanningFormData({
                  ...planningFormData,
                  repeat: { ...planningFormData.repeat, cycle: e.target.value }
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
                value={planningFormData.repeat.countdown}
                type="number"
                min={-1}
                required
                onChange={e => setPlanningFormData({
                  ...planningFormData,
                  repeat: { ...planningFormData.repeat, countdown: e.target.valueAsNumber }
                })}
              />
            </Form.Group>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <ButtonGroup>
            <Button variant="outline-danger"
              onClick={() => deletePlanning(planningData.ID)}
            >
              Xóa
            </Button>
            <Button variant="outline-success"
              onClick={() => onResolve()}
            >
              Giải quyết
            </Button>
          </ButtonGroup>
          <Button type="submit" className="float-end">
            Lưu
          </Button>
        </div>
      </Form>
    </Modal.Body>
  </Modal>
}   