import { Form } from "react-bootstrap"

export function ChangeUserPasswordForm() {
    return <Form>
        <h4>Thay đổi mật khẩu</h4>
        <Form.Group className="mb-2">
            <Form.Label>Mật khẩu cũ</Form.Label>
            <Form.Control size="sm" type="password" placeholder="**********" />
        </Form.Group>
        <Form.Group className="mb-2">
            <Form.Label>Mật khẩu mới</Form.Label>
            <Form.Control size="sm" type="password" placeholder="**********" />
        </Form.Group>
        <Form.Group className="mb-2">
            <Form.Label>Xác nhận mật khẩu mới</Form.Label>
            <Form.Control size="sm" type="password" placeholder="**********" />
        </Form.Group>
    </Form>
}