import { Button, Modal } from "react-bootstrap";
import { ACTIVE_STR, EMPTY_AVATAR, INACTIVE_STR } from "../../resource";
import { getExpertiseName } from "../../utils";
import { RoundImg } from "../roundImage"

export function ViewUserInfoModal({ user, show, onHide }) {
  return <Modal size="lg" centered show={show} onHide={onHide}>
    <Modal.Header className="bg-primary text-white">
      <h5 className="m-auto">
        Thông tin tài khoản
      </h5>
    </Modal.Header>
    <Modal.Body>
      <div className="row">
        <div className="col-4 d-flex flex-column align-items-center">
          <RoundImg
            sizes={"200"} src={user.avatarUrl ? user.avatarUrl : EMPTY_AVATAR}
            alt="avatar" className="mb-2"
          />
          {user.active ? <Button variant="outline-danger">Vô hiệu hóa</Button>
            : <Button variant="outline-success">Kích hoạt</Button>}
        </div>
        <div className="col-8">
          <div>
            <div className="fw-bold">@{user.username}</div>
            <div className={`badge rounded-pill ${user.active ? 'bg-success' : 'bg-danger'}`}>
              {user.active ? ACTIVE_STR : INACTIVE_STR}
            </div>
          </div>

          <div className="row mt-2">
            <strong className="col-5">Họ và tên</strong>
            <div className="col-7">{user.name}</div>
          </div>

          <div className="row mt-2">
            <strong className="col-5">Email</strong>
            <div className="col-7">{user.email}</div>
          </div>

          <div className="row mt-2">
            <strong className="col-5">Ngày sinh</strong>
            <div className="col-7">{user.birthday}</div>
          </div>

          <div className="row mt-2">
            <strong className="col-5">Chuyên môn</strong>
            <div className="col-7">{getExpertiseName(user.expertise)}</div>
          </div>

          <div className="row mt-2">
            <strong className="col-5">Vai trò</strong>
            <div className="col-7">{user.role.name}</div>
          </div>

          <div className="row mt-2">
            <strong className="col-5">Thuộc ban</strong>
            <div className="col-7">{user.department.name}</div>
          </div>
        </div>
      </div>
    </Modal.Body>
  </Modal>
}