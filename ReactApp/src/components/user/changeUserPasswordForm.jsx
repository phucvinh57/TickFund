import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { userService } from "../../services/user.service"

export function ChangeUserPasswordForm() {
    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [confirmedNewPass, setConfirmedNewPass] = useState("")

    return <Form onSubmit={e => {
        e.preventDefault()
        userService.changePassword(oldPass, newPass, confirmedNewPass).then(response => {
            alert(response.data.msg)
            setOldPass("")
            setNewPass("")
            setConfirmedNewPass("")
        }).catch(err => {
            alert(err.response.data.msg)
        })
    }}>
        <h4>Thay đổi mật khẩu</h4>
        <Form.Group className="mb-2">
            <Form.Label>Mật khẩu cũ</Form.Label>
            <Form.Control
                size="sm" type="password" placeholder="**********" required
                value={oldPass} onChange={e => setOldPass(e.target.value)}
            />
        </Form.Group>
        <Form.Group className="mb-2">
            <Form.Label>Mật khẩu mới</Form.Label>
            <Form.Control
                size="sm" type="password" placeholder="**********" required
                value={newPass} onChange={e => setNewPass(e.target.value)}
            />
        </Form.Group>
        <Form.Group className="mb-2">
            <Form.Label>Xác nhận mật khẩu mới</Form.Label>
            <Form.Control
                size="sm" type="password" placeholder="**********" required
                value={confirmedNewPass} onChange={e => setConfirmedNewPass(e.target.value)}
            />
        </Form.Group>
        <div className="d-flex justify-content-end">
            <Button type="submit" disabled={newPass !== confirmedNewPass}>Lưu mật khẩu mới</Button>
        </div>
    </Form>
}