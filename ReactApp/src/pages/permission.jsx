import { Accordion, Button, Row, Col, Modal, InputGroup, FormControl} from "react-bootstrap";
import AccountTable from "../components/permission/accountTable";
import PermissionCheckCard from "../components/permission/permissionCheckCard";
import { useState } from "react";
import { EMPTY_AVATAR, MEMBER_ROLE_STR } from "../resource";

export default function Permission(){
    const [roles, setRoles] = useState(initRoles)
    const [addRoleShow, setAddRoleShow] = useState(false)
    const [db, setDb] = useState(ACCOUNT_DB)

    return(
        <div>
            <AccountTable roles={roles} DB={db} setDB={setDb}/>
            <Row className='mb-4'>
                <Col>
                    <h4> Chỉnh sửa quyền truy cập</h4>
                </Col>
                <Col className='col-auto'>
                    <Button onClick={() => setAddRoleShow(true)}> Thêm nhóm quyền </Button>
                </Col>
            </Row>
            <Accordion>
                {
                    roles.map(role => 
                        <PermissionCheckCard
                            key={role}
                            handleDelete={handleDelete}
                            init={initRoles.includes(role) ? randPermission : emptyPermission}
                            role={role}/>
                    )
                }
            </Accordion>
            <Modal show={addRoleShow} onHide={() => setAddRoleShow(false)}>
                <Modal.Header>
                <Modal.Title>Thêm nhóm quyền</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <FormControl onKeyDown={e => e.key === 'Enter' ? handleAdd(e.target.value) : null}/>
                    </InputGroup>
                </Modal.Body>
            </Modal>
        </div>
    )

    function handleAdd(role){
        if(roles.includes(role)){
            alert('Tên nhóm quyền đã tồn tại') 
        }
        else{
            setRoles([
                ...roles,
                role
            ])
            setAddRoleShow(false)
        }
    }

    function handleDelete(deletedRole) {
        setRoles(roles.filter(role => role !== deletedRole))
        setDb(db.map(acc => ({...acc, role: MEMBER_ROLE_STR})))
    }
    
}
var ACCOUNT_DB = [
    {
        name: 'Cù Đỗ Thanh Nhân',
        accountName: 'cudothanhnhan',
        img: EMPTY_AVATAR,
        department: 'IT',
        role: 'Thành viên',
        active: true,
        dob: new Date('2001-6-1'),
        email: 'email@gmail.com',
        phone: '0915654321',
        facebookLink: 'https://www.facebook.com/'
    },
    {
        name: 'Nguyễn Phúc Vinh',
        accountName: 'nguyenphucvinh',
        img: EMPTY_AVATAR,
        department: 'IT',
        role: 'Quản trị viên',
        active: true,
        dob: new Date('2001-6-1'),
        email: 'email@gmail.com',
        phone: '0915654321',
        facebookLink: 'https://www.facebook.com/'
    },
    {
        name: 'Trần Hà Tuấn Kiệt',
        accountName: 'kiettran',
        img: EMPTY_AVATAR,
        department: 'IT',
        role: 'Thành viên',
        active: false,
        dob: new Date('2001-6-1'),
        email: 'email@gmail.com',
        phone: '0915654321',
        facebookLink: 'https://www.facebook.com/'
    },
]
const initRoles = ['Quản trị viên', 'Thành viên']
const randPermission = [
    {
        resource: 'Tài khoản',
        actions: [
            {name: 'Tạo tài khoản', valid: true},
            {name: 'Chỉnh sửa thông tin tài khoản', valid: false},
            {name: 'Vô hiệu hóa tài khoản', valid: true}
        ] 
    },
    {
        resource: 'Nhóm quyền',
        actions: [
            {name: 'Chỉnh sửa các nhóm quyền', valid: true},
            {name: 'Thêm gỡ các tài khoản vào nhóm quyền', valid: true},
        ] 
    },
    {
        resource: 'Giao dịch',
        actions: [
            {name: 'Tạo giao dịch', valid: true},
            {name: 'Vô hiệu hóa giao dịch', valid: true},
            {name: 'Chỉnh sửa ghi chú', valid: true},
            {name: 'Xem thống kê quỹ', valid: true},
            {name: 'Xem thông tin tất cả các giao dịch', valid: true}
        ] 
    },
    {
        resource: 'Dự trù',
        actions: [
            {name: 'Tạo dự trù', valid: true},
            {name: 'Vô hiệu hóa dự trù', valid: true},
            {name: 'Giải quyết dự trù', valid: true},
            {name: 'Xem thông tin tất cả dự trù', valid: true}
        ] 
    },
    {
        resource: 'Yêu cầu giải ngân/đóng góp',
        actions: [
            {name: 'Tạo yêu cầu giải ngân/đóng góp', valid: true},
            {name: 'Vô hiệu hóa yêu cầu giải ngân/đóng góp', valid: true},
            {name: 'Xét duyệt yêu cầu giải ngân/đóng góp', valid: true},
            {name: 'Xem thông tin tất cả các yêu cầu giải ngân đóng góp', valid: true}
        ] 
    }
]

const emptyPermission = [
    {
        resource: 'Tài khoản',
        actions: [
            {name: 'Tạo tài khoản', valid: false},
            {name: 'Chỉnh sửa thông tin tài khoản', valid: false},
            {name: 'Vô hiệu hóa tài khoản', valid: false}
        ] 
    },
    {
        resource: 'Nhóm quyền',
        actions: [
            {name: 'Chỉnh sửa các nhóm quyền', valid: false},
            {name: 'Thêm gỡ các tài khoản vào nhóm quyền', valid: false},
        ] 
    },
    {
        resource: 'Giao dịch',
        actions: [
            {name: 'Tạo giao dịch', valid: false},
            {name: 'Vô hiệu hóa giao dịch', valid: false},
            {name: 'Chỉnh sửa ghi chú', valid: false},
            {name: 'Xem thống kê quỹ', valid: false},
            {name: 'Xem thông tin tất cả các giao dịch', valid: false}
        ] 
    },
    {
        resource: 'Dự trù',
        actions: [
            {name: 'Tạo dự trù', valid: false},
            {name: 'Vô hiệu hóa dự trù', valid: false},
            {name: 'Giải quyết dự trù', valid: false},
            {name: 'Xem thông tin tất cả dự trù', valid: false}
        ] 
    },
    {
        resource: 'Yêu cầu giải ngân/đóng góp',
        actions: [
            {name: 'Tạo yêu cầu giải ngân/đóng góp', valid: false},
            {name: 'Vô hiệu hóa yêu cầu giải ngân/đóng góp', valid: false},
            {name: 'Xét duyệt yêu cầu giải ngân/đóng góp', valid: false},
            {name: 'Xem thông tin tất cả các yêu cầu giải ngân đóng góp', valid: false}
        ] 
    }
]