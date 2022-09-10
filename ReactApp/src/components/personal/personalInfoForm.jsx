import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import { personalService } from "../../services/personal.service"
import { DEPARTMENTS } from "../../constants/departments"
import { setPersonalInfo } from "../../redux/slice/personal"

export function PersonalInfoForm() {
  const user = useSelector(state => state.personal)
  const dispatch = useDispatch()
  const [formInfoData, setFormInfoData] = useState({
    email: "npvinh0507@gmail.com",
    name: "Nguyễn Phúc Vinh",
    phone: "0373395726",
    birthday: "2001-07-05",
    expertise: "IT",
    departmentId: 1
  })

  useEffect(() => {
    setFormInfoData({
      email: user.email,
      name: user.name,
      phone: user.phone,
      birthday: user.birthday,
      expertise: user.expertise,
      departmentId: user.department.ID
    })
  }, [user])

  return <Form onSubmit={e => {
    e.preventDefault()
    personalService.updateInfo(formInfoData).then(response => {
      alert(response.data.msg)
      const department = DEPARTMENTS.find(d => d.ID == formInfoData.departmentId)

      dispatch(setPersonalInfo({
        ...formInfoData,
        department
      }))
    }).catch(err => {
      alert(err.response.data.msg)
    })

  }}>
    <h4>Thông tin tài khoản</h4>
    <div className="row mb-2">
      <Form.Group className="col-6">
        <Form.Label>ID thành viên (MSSV):</Form.Label>
        <Form.Control size="sm" type="text" defaultValue={user.ID} disabled />
      </Form.Group>
      <Form.Group className="col-6">
        <Form.Label>Tên tài khoản:</Form.Label>
        <Form.Control size="sm" type="text" defaultValue={user.username} disabled />
      </Form.Group>
    </div>
    <Form.Group className="mb-2">
      <Form.Label>Họ và tên:</Form.Label>
      <Form.Control size="sm"
        type="text" value={formInfoData.name} required
        onChange={e => setFormInfoData({ ...formInfoData, name: e.target.value })}
      />
    </Form.Group>
    <div className="row mb-2">
      <Form.Group className="col-6">
        <Form.Label>Email:</Form.Label>
        <Form.Control size="sm"
          type="email" value={formInfoData.email} required
          onChange={e => setFormInfoData({ ...formInfoData, email: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="col-6">
        <Form.Label>Số  điện thoại:</Form.Label>
        <Form.Control size="sm"
          type="tel" value={formInfoData.phone}
          onChange={e => setFormInfoData({ ...formInfoData, phone: e.target.value })}
        />
      </Form.Group>
    </div>
    <div className="row mb-2">
      <Form.Group className="col-6">
        <Form.Label>Ngày sinh:</Form.Label>
        <Form.Control size="sm"
          type="date" value={formInfoData.birthday}
          onChange={e => setFormInfoData({ ...formInfoData, birthday: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="col-6">
        <Form.Label>Lĩnh vực chuyên môn:</Form.Label>
        <Form.Select
          value={formInfoData.expertise} required size="sm"
          onChange={e => setFormInfoData({ ...formInfoData, expertise: e.target.value })}
        >
          <option value={"IT"}>IT</option>
          <option value={"ME"}>Cơ khí</option>
          <option value={"DEE"}>Điện</option>
        </Form.Select>
      </Form.Group>
    </div>

    <Form.Group className="mb-2">
      <Form.Label>Thuộc ban:</Form.Label>
      <Form.Select
        value={formInfoData.departmentId} required size="sm"
        onChange={e => setFormInfoData({ ...formInfoData, departmentId: e.target.value })}
      >
        {DEPARTMENTS.map(department => <option key={department.ID} value={department.ID}>
          {department.name}
        </option>)}
      </Form.Select>
    </Form.Group>
    <div className="d-flex justify-content-end">
      <Button type="submit">Lưu thông tin</Button>
    </div>
  </Form>
}