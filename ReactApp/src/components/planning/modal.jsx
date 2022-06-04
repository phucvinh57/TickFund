import { Modal, Form, Button } from "react-bootstrap";
import { generateHexId } from "../../utils";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { addPlanning, editPlanning, dropPlanning } from '../../redux/slice/planning'

import { categoryType, categories, users, repeatModes } from "./sampleData";


const emptyData = {
  id: '',
  category: {
    name: '',
    type: '',
  },
  amount: '',
  trader: '',
  startDate: '',
  isRepeat: 'false',
  repeat: {
    mode: repeatModes[0],
    times: '',
    cycle: 'day',
    hasEndDay: 'true',
    endDate: ''
  }
}

export default function PlanningModal({ show, onHide, mode, initData }) {
  const [formData, setFormData] = useState(emptyData)
  const dispatch = useDispatch()

  useEffect(() => {
    if (initData !== null && mode === "edit") setFormData({
      ...initData
    })
  }, [initData, mode])

  const handleAddPlanning = () => {
    // Call API to update DB, then dispatch addPlanning function to update store
    dispatch(addPlanning({ ...formData, id: generateHexId() }))
    setFormData(emptyData)
    onHide()
  }

  const handleEditPlanning = () => {
    dispatch(editPlanning({ ...formData }))
    setFormData(emptyData)
    onHide()
  }

  const handleDeletePlanning = () => {
    let confirm = window.confirm("Xác nhận xoá dự trù ?")
    confirm && dispatch(dropPlanning(formData.id))
    setFormData(emptyData)
    onHide()
  }

  return <Modal show={show} onHide={onHide} size='lg'>
    <Modal.Header className="bg-primary text-white">
      <h5 className="m-auto">
        {mode === 'add' ? 'Thêm dự trù' : `Chỉnh sửa dự trù #${initData.id}`}
      </h5>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={e => {
        e.preventDefault()
        mode === 'add' ? handleAddPlanning() : handleEditPlanning()
      }}>
        <div className="row mb-2">
          {/* Chọn loại danh mục */}
          <Form.Group className="col-6">
            <Form.Label className="fw-500">Loại danh mục</Form.Label>
            <Form.Select required
              value={formData.category.type}
              onChange={e => setFormData({
                ...formData,
                category: {
                  ...formData.category,
                  type: e.target.value
                }
              })}
            >
              <option value='' disabled>---Chọn loại danh mục---</option>
              {categoryType.map((name, idx) => <option key={idx} value={name}>
                {name}
              </option>)}
            </Form.Select>
          </Form.Group>

          {/* Chọn tên danh mục */}
          <Form.Group className="col-6">
            <Form.Label className="fw-500">Tên danh mục</Form.Label>
            <Form.Select required
              value={formData.category.name}
              onChange={e => setFormData({
                ...formData,
                category: {
                  ...formData.category,
                  name: e.target.value
                }
              })}
            >
              <option value='' disabled>---Chọn danh mục---</option>
              {categories.filter(category => category.type === formData.category.type)
                .map((category, idx) =>
                  <option key={idx} value={category.name}>
                    {category.name}
                  </option>
                )
              }
            </Form.Select>
          </Form.Group>
        </div>

        <div className="row mb-2">
          <Form.Group className="col-6">
            <Form.Label className="fw-500">Số tiền</Form.Label>
            <Form.Control
              type="number" placeholder="Số tiền ..." required min={5000}
              value={formData.amount}
              onChange={e => setFormData({ ...formData, amount: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="col-6">
            <Form.Label className="fw-500">Người giao dịch</Form.Label>
            <Form.Select
              value={formData.trader}
              onChange={e => setFormData({ ...formData, trader: e.target.value })}
            >
              <option value='' disabled>---Chọn TK (không bắt buộc)---</option>
              {users.map(user => <option key={user.id} value={user.name}>
                {user.name}
              </option>)}
            </Form.Select>
          </Form.Group>
        </div>

        <div className="row mb-3">
          <Form.Group className="col">
            <Form.Label className="fw-500">Lặp lại</Form.Label>
            <Form.Select
              value={formData.isRepeat}
              onChange={e => setFormData({ ...formData, isRepeat: e.target.value })}
              required
            >
              <option value={'false'}>Không</option>
              <option value={'true'}>Có</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="col">
            <Form.Label className="fw-500">Ngày bắt đầu</Form.Label>
            <Form.Control
              type="date" placeholder="Ngày bắt đầu" required
              value={formData.startDate}
              onChange={e => setFormData({ ...formData, startDate: e.target.value })}
            />
          </Form.Group>
        </div>

        {/* Repeat custom */}
        <div style={{ display: formData.isRepeat === 'true' ? 'block' : 'none' }}>
          <div className="d-flex align-items-center mb-2">
            <Form.Check
              type="radio"
              name="repeat-opt" label='Số lần lặp lại'
              className="text-nowrap fw-500"
              checked={formData.repeat.mode === repeatModes[0]}
              onChange={() => setFormData({
                ...formData,
                repeat: {
                  ...formData.repeat,
                  mode: repeatModes[0]
                }
              })}
            />
            <Form.Control
              type='number' className="ms-3"
              placeholder="Number ..." style={{ width: 'fit-content' }}
              disabled={formData.repeat.mode !== repeatModes[0]}
              required={formData.isRepeat === 'true' && formData.repeat.mode === repeatModes[0]}
              value={formData.repeat.times}
              onChange={e => setFormData({
                ...formData,
                repeat: {
                  ...formData.repeat,
                  times: e.target.value
                }
              })}
            />
          </div>

          <div className="d-flex justify-content-between flex-wrap">
            <div className="d-flex align-items-center mb-2">
              <Form.Check
                type="radio"
                name="repeat-opt" label="Chu kỳ"
                className="text-nowrap fw-500"
                checked={formData.repeat.mode === repeatModes[1]}
                onChange={() => setFormData({
                  ...formData,
                  repeat: {
                    ...formData.repeat,
                    mode: repeatModes[1]
                  }
                })}
              />
              <Form.Select className="ms-3"
                style={{ width: 'fit-content' }}
                disabled={formData.repeat.mode !== repeatModes[1]}
              >
                <option value="day">Ngày</option>
                <option value="week">Tuần</option>
                <option value="month">Tháng</option>
                <option value="year">Năm</option>
              </Form.Select>
            </div>

            <div className="d-flex align-items-center ms-4 mb-2">
              <span className="fw-500 text-nowrap p-0">
                Ngày kết thúc:
              </span>

              <Form.Select className="ms-3"
                value={formData.repeat.hasEndDay} onChange={e => setFormData({
                  ...formData,
                  repeat: {
                    ...formData.repeat,
                    hasEndDay: e.target.value
                  }
                })}
                disabled={formData.repeat.mode !== repeatModes[1]}
                style={{ width: 'fit-content' }}
              >
                <option value={"true"}>Có</option>
                <option value={"false"}>Không</option>
              </Form.Select>

              <Form.Control type='date' className="ms-3"
                disabled={!(formData.repeat.mode === repeatModes[1] && formData.repeat.hasEndDay === 'true')}
                value={formData.repeat.endDate}
                onChange={e => setFormData({
                  ...formData,
                  repeat: {
                    ...formData.repeat,
                    endDate: e.target.value
                  }
                })}
                required={
                  formData.isRepeat === 'true'
                  && formData.repeat.mode === repeatModes[1]
                  && formData.repeat.hasEndDay === 'true'
                }
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between">
          {mode === 'edit' && <Button variant="outline-danger"
            onClick={handleDeletePlanning}
          >
            Xoá dự trù
          </Button>}

          <Button type="submit" className="fw-bold">
            {mode === 'add' && 'Tạo dự trù'}
            {mode === 'edit' && 'Lưu thay đổi'}
          </Button>
        </div>
      </Form>
    </Modal.Body>
  </Modal>
}
