import { Container, Row, Col, Button, Form, FormCheck } from "react-bootstrap"
import { CaretRight, CaretDown } from "react-bootstrap-icons"
import { useState, useEffect } from "react"
// const init = [
//     {
//         resource: 'Tài khoản',
//         actions: [
//             {name: 'Tạo tài khoản', valid: true},
//             {name: 'Chỉnh sửa thông tin tài khoản', valid: false},
//             {name: 'Vô hiệu hóa tài khoản', valid: true}
//         ] 
//     },
//     {
//         resource: 'Nhóm quyền',
//         actions: [
//             {name: 'Chỉnh sửa các nhóm quyền', valid: true},
//             {name: 'Thêm gỡ các tài khoản vào nhóm quyền', valid: true},
//         ] 
//     },
//     {
//         resource: 'Giao dịch',
//         actions: [
//             {name: 'Tạo giao dịch', valid: true},
//             {name: 'Vô hiệu hóa giao dịch', valid: true},
//             {name: 'Chỉnh sửa ghi chú', valid: true},
//             {name: 'Xem thống kê quỹ', valid: true},
//             {name: 'Xem thông tin tất cả các giao dịch', valid: true}
//         ] 
//     },
//     {
//         resource: 'Dự trù',
//         actions: [
//             {name: 'Tạo dự trù', valid: true},
//             {name: 'Vô hiệu hóa dự trù', valid: true},
//             {name: 'Giải quyết dự trù', valid: true},
//             {name: 'Xem thông tin tất cả dự trù', valid: true}
//         ] 
//     },
//     {
//         resource: 'Yêu cầu giải ngân/đóng góp',
//         actions: [
//             {name: 'Tạo yêu cầu giải ngân/đóng góp', valid: true},
//             {name: 'Vô hiệu hóa yêu cầu giải ngân/đóng góp', valid: true},
//             {name: 'Xét duyệt yêu cầu giải ngân/đóng góp', valid: true},
//             {name: 'Xem thông tin tất cả các yêu cầu giải ngân đóng góp', valid: true}
//         ] 
//     }
// ]

export default function PermissionCheckCard({init, role}){
    const [shrink, setShrink] = useState(true)
    // const [resource, setResource] = useState([])
    const [permissions, setPermissions] = useState(init)
    const [save, setSave] = useState(false)


    useEffect(() => {
        if(JSON.stringify(init) === JSON.stringify(permissions)){
            setSave(false)
        }
        else{
            setSave(true)
        }
    }, [permissions]);

    return(
        <Container>
            <Row>
                <Col>
                    <h4>{role}</h4>
                </Col>
                <Col xs='auto'>
                    { shrink ? 
                        <></>
                        :
                        <Button variant='success' disabled={!save}>
                            Lưu
                        </Button>
                    }
                </Col>
                <Col xs='auto'>
                    <Button variant='light' className="shadow-none" onClick={() => setShrink(!shrink)}>
                        { shrink ? 
                            <CaretRight size={24} className='mx-auto d-block'/>
                            :
                            <CaretDown size={24} className='mx-auto d-block'/>
                        }
                    </Button>
                </Col>
            </Row>
            <div className="border-top border-2 my-1"></div>
            <Row className="p-2">
                {
                    shrink 
                    ? 
                    <></> 
                    :
                    permissions.map((item, itemIdx) => {
                        return(
                            <Container key={item.resource} className='py-1'>
                                <Row>
                                    <Col>
                                        <h5>{`Quyền với ${item.resource}`}</h5>
                                    </Col>
                                    <Col xs='auto d-flex align-items-center'>
                                        <FormCheck 
                                            onClick={() => {
                                                var newPermission = JSON.parse(JSON.stringify(permissions))
                                                const isCheckedAll = item.actions.every(action => action.valid)
                                                newPermission[itemIdx].actions = newPermission[itemIdx].actions
                                                    .map(action => {return {name: action.name, valid: !isCheckedAll}})
                                                setPermissions(newPermission)
                                            }}
                                            checked={item.actions.every(action => action.valid)} 
                                            onChange={e => {}}/>
                                    </Col>
                                </Row>
                                {
                                    item.actions.map((action, actionIdx) => {
                                        return(
                                            <Row key={action.name} className='py-1'>
                                                <Col>
                                                    <span>{action.name}</span>
                                                </Col>
                                                <Col xs='auto d-flex align-items-center'>
                                                    <FormCheck checked={action.valid } onClick={() => {
                                                        var newPermission = JSON.parse(JSON.stringify(permissions))
                                                        newPermission[itemIdx].actions[actionIdx].valid = !action.valid
                                                        console.log(newPermission)
                                                        setPermissions(newPermission)
                
                                                    }}
                                                    onChange={e => {}}
                                                    disabled={item.actions.every(action => action.valid)}/>
                                                </Col>
                                                
                                            </Row>
                                        )
                                    })
                                }
                            <Row>
                                <div className="border-top border-1"></div>
                            </Row>
                            </Container>

                        )
                    })
                }
            </Row>
        </Container>
    )
}