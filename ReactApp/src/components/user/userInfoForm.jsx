import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { Form } from "react-bootstrap"

export function UserInfoForm() {
  const user = useSelector(state => state.user)

  const [formInfoData, setFormInfoData] = useState({
    email: "npvinh0507@gmail.com",
    name: "Nguyễn Phúc Vinh",
    avatarUrl: "http://localhost:3002/public/1w5zx9q6asd.jpg",
    phone: "0373395726",
    birthday: "2001-07-05",
    expertise: "IT",
    departmentId: 1
  })

  useEffect(() => {
    setFormInfoData({
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      phone: user.phone,
      birthday: user.birthday,
      expertise: user.expertise,
      departmentId: user.department.ID
    })
  }, [user])

  return <Form>
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
        type="text" value={formInfoData.name}
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
          type="tel" value={formInfoData.phone} required
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
        <option value={1}>Ban phát triển dự án</option>
        <option value={2}>Ban Nghiên cứu khoa học</option>
        <option value={3}>Ban Phát triển đội nhóm và con người</option>
      </Form.Select>
    </Form.Group>
  </Form>
}