import { useEffect } from "react";
import { useState } from "react";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import { TickTableV2 } from "../ticktable/tableV2";
import { userService } from "../../services/user.service"
import { ACTIVE_STR, EMPTY_AVATAR, INACTIVE_STR } from "../../resource";
import { useMemo } from "react";
import { ViewUserInfoModal } from "./viewUserInfoModal";
import { getExpertiseName } from "../../utils";
import { CreateUserModal } from "./createUserModal";
import { useSelector } from "react-redux";
import { DEPARTMENTS } from "../../constants/departments";
import { toast } from "react-toastify";
import { CREATE_ACTION_ID, UPDATE_ACTION_ID } from "../../constants/actionIds";
import { USER_RESOURCE_ID } from "../../constants/resourceIds";

export function UserTable() {
  const [showModalAddUser, setShowModalAddUser] = useState(false)
  const [showModalUserInfo, setShowModalUserInfo] = useState(false)
  const [userData, setUserData] = useState([])

  const [currViewUser, setCurrViewUser] = useState(null)
  const roles = useSelector(state => state.roles)
  const userRole = useSelector(state => state.personal.role)

  const hasUpdateUserPermission = useMemo(() => {
    const userResource = userRole.resources.find(rsrc => rsrc.ID === USER_RESOURCE_ID)
    if (!userResource)
      return false
    const updateAction = userResource.actions.find(action => action.ID === UPDATE_ACTION_ID)
    if (!updateAction)
      return false
    return true
  }, [userRole])

  const hasCreateUserPermission = useMemo(() => {
    const userResource = userRole.resources.find(rsrc => rsrc.ID === USER_RESOURCE_ID)
    if (!userResource)
      return false
    const createAction = userResource.actions.find(action => action.ID === CREATE_ACTION_ID)
    if (!createAction)
      return false
    return true
  }, [userRole]) 

  const changeRole = (userId, roleId) => {
    userService.changeRole(userId, roleId).then(response => {
      const copyUserData = [...userData]
      const targetUser = copyUserData.find(user => user.ID === userId)
      const targetRole = roles.find(role => role.ID === roleId)
      targetUser.role.ID = targetRole.ID
      targetUser.role.name = targetRole.name
      setUserData(copyUserData)
      toast.success("Thay đổi thành công")
    }).catch(err => toast.error("Thao tác bị từ chối"))
  }
  const changeDepartment = (userId, departmentId) => {
    userService.changeDepartment(userId, departmentId).then(response => {
      const copyUserData = [...userData]
      const targetUser = copyUserData.find(user => user.ID === userId)
      const targetDepartment = DEPARTMENTS.find(department => department.ID === departmentId)
      targetUser.department.ID = targetDepartment.ID
      targetUser.department.name = targetDepartment.name
      setUserData(copyUserData)
      toast.success("Thay đổi thành công")
    }).catch(err => toast.error("Thao tác bị từ chối"))
  }

  const mapFromUserDataToRow = user => ({
    ID: user.ID,
    name: {
      val: user.name,
      component: <div>
        <Row>
          <Col className='col-auto d-flex align-items-center'>
            <div style={{ height: '2.5rem', width: '2.5rem' }}>
              <img
                className='img-fluid circle-border'
                src={user.avatarUrl ? user.avatarUrl : EMPTY_AVATAR}
                style={{ aspectRatio: '1/1' }} alt='img'
              />
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
    role: hasUpdateUserPermission ? {
      val: user.role.ID,
      component: <Form.Select
        size="sm" value={user.role.ID}
        onChange={e => {
          e.stopPropagation()
          changeRole(user.ID, parseInt(e.target.value))
        }}
        onClick={e => e.stopPropagation()}
      >
        {roles.map(role => <option key={role.ID} value={role.ID}>{role.name}</option>)}
      </Form.Select>
    } : {
      val: user.role.ID,
      component: <span>{user.role.name}</span>
    },
    department: hasUpdateUserPermission ? {
      val: user.department.ID,
      component: <Form.Select
        size="sm" value={user.department.ID}
        onChange={e => {
          e.stopPropagation()
          changeDepartment(user.ID, parseInt(e.target.value))
        }}
        onClick={e => e.stopPropagation()}
      >
        {DEPARTMENTS.map(department => <option key={department.ID} value={department.ID}>
          {department.name}
        </option>)}

      </Form.Select>
    } : {
      val: user.department.ID,
      component: <span>{user.department.name}</span>
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
    return userData.map(data => mapFromUserDataToRow(data))
  }, [userData, roles])

  useEffect(() => {
    userService.getAllUserInfoWithRole().then(response => {
      setUserData(response.data)
    }).catch(err => {
      console.log(err.response)
    })
  }, [])

  const userTableHeaders = useMemo(() => [{
    label: "Tên thành viên",
    association: {
      key: "name",
      type: "text"
    },
    sort: true,
    filter: false
  }, {
    label: 'Chuyên môn',
    association: {
      key: 'expertise',
      type: 'select',
      options: [{
        value: "IT",
        label: "IT"
      }, {
        value: "ME",
        label: "Cơ khí"
      }, {
        value: "DEE",
        label: "Điện"
      }]
    },
    sort: false,
    filter: true
  }, {
    label: 'Vai trò',
    association: {
      key: 'role',
      type: 'select',
      options: roles.map(role => ({ value: role.ID, label: role.name }))
    },
    sort: false,
    filter: true
  }, {
    label: "Thuộc ban",
    association: {
      key: "department",
      type: "select",
      options: [{
        value: 1,
        label: "Ban Phát triển dự án"
      }, {
        value: 2,
        label: "Ban Nghiên cứu khoa học"
      }, {
        value: 3,
        label: "Ban Phát triển đội nhóm và con người"
      }]
    }
  }, {
    label: 'Trạng thái',
    association: {
      key: 'active',
      type: 'select',
      options: [{
        value: true,
        label: "Đang hoạt động"
      }, {
        value: false,
        label: "Không còn họat động"
      }]
    },
    sort: false,
    filter: true
  }], [roles])

  return <div>
    <div className="d-flex justify-content-between">
      <h4>Danh sách tài khoản</h4>
      {hasCreateUserPermission && <Button onClick={() => setShowModalAddUser(true)}>Tạo tài khoản</Button>} 
    </div>
    {roles.length > 0 && <TickTableV2
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
    />}

    <CreateUserModal show={showModalAddUser} onHide={() => setShowModalAddUser(false)} />

    {currViewUser && <ViewUserInfoModal
      user={currViewUser}
      show={showModalUserInfo}
      onHide={() => setShowModalUserInfo(false)}
    />}
  </div>
}