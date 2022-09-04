import { useEffect } from "react";
import { useState } from "react";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import { userTableHeaders } from "../../constants/userTableHeaders";
import { TickTableV2 } from "../ticktable/tableV2";
import { userService } from "../../services/user.service"
import { ACTIVE_STR, INACTIVE_STR } from "../../resource";
import { useMemo } from "react";
import { ViewUserInfoModal } from "./viewUserInfoModal";
import { getExpertiseName } from "../../utils";
import { CreateUserModal } from "./createUserModal";

export function UserTable() {
  const [showModalAddUser, setShowModalAddUser] = useState(false)
  const [showModalUserInfo, setShowModalUserInfo] = useState(false)
  const [userData, setUserData] = useState([])

  const [currViewUser, setCurrViewUser] = useState(null)

  const mapFromUserDataToRow = user => ({
    ID: user.ID, // For some API call, not for rendering
    name: {
      val: user.name,
      component: <div>
        <Row>
          <Col className='col-auto d-flex align-items-center'>
            <div style={{ height: '2.5rem', width: '2.5rem' }}>
              <img className='img-fluid circle-border' src={user.avatarUrl} style={{ aspectRatio: '1/1' }} alt='img' />
            </div>
          </Col>
          <Col>
            <Row className='my-0'>
              <span className='fw-bold'>{user.name}</span>
            </Row>
            <Row className='my-0'>
              <span>@{user.username}</span>
            </Row>
          </Col>
        </Row>
      </div>
    },
    expertise: {
      val: user.expertise,
      component: <span>{getExpertiseName(user.expertise)}</span>
    },
    role: {
      val: user.role.ID,
      component: <Form.Select
        size="sm" defaultValue={user.role.ID}
        onChange={e => e.stopPropagation()}
        onClick={e => e.stopPropagation()}
      >
        <option value={user.role.ID}>{user.role.name}</option>
      </Form.Select>
    },
    department: {
      val: user.department.ID,
      component: <Form.Select
        size="sm" defaultValue={user.department.ID}
        onChange={e => e.stopPropagation()}
        onClick={e => e.stopPropagation()}
      >
        <option value={1}>{"Ban Phát triển dự án"}</option>
        <option value={2}>{"Ban Nghiên cứu khoa học"}</option>
        <option value={3}>{"Ban Phát triển đội nhóm và con người"}</option>

      </Form.Select>
    },
    active: {
      val: user.active,
      component: <div className="d-flex align-items-center justify-content-end">
        <span className={`badge rounded-pill ${user.active ? 'bg-success' : 'bg-danger'}`}>
          {user.active ? ACTIVE_STR : INACTIVE_STR}
        </span>
      </div>
    }
  })

  const rows = useMemo(() => {
    return userData.map(data => { return mapFromUserDataToRow(data) })
  }, [userData])

  useEffect(() => {
    userService.getAllUserInfoWithRole().then(response => {
      setUserData(response.data)
    })
  }, [])

  return <div>
    <div className="d-flex justify-content-between">
      <h4>Danh sách tài khoản</h4>
      <Button onClick={() => setShowModalAddUser(true)}>Tạo tài khoản</Button>
    </div>
    <TickTableV2
      headers={userTableHeaders}
      componentSize="md"
      data={rows}
      numPages={1}
      defaultSortField={"name"}
      onQuery={data => console.log(data)}
      onRowClick={row => {
        userService.getUserById(row.ID).then(response => {
          setShowModalUserInfo(true)
          setCurrViewUser(response.data)
        })
      }}
    />

    <CreateUserModal show={showModalAddUser} onHide={() => setShowModalAddUser(false)} />

    {currViewUser && <ViewUserInfoModal
      user={currViewUser}
      show={showModalUserInfo}
      onHide={() => setShowModalUserInfo(false)}
    />}
  </div>
}