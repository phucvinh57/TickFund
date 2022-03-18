import { Container, Row, Col, Button, Form, FormCheck, Accordion } from "react-bootstrap"
import { CaretRight, CaretDown } from "react-bootstrap-icons"
import { useState, useEffect } from "react"
import { ADMIN_ROLE_STR, MEMBER_ROLE_STR } from "../../resource"

export default function PermissionCheckCard({init, role, handleDelete}){

    const [permissions, setPermissions] = useState(init)
    const [save, setSave] = useState(false)


    useEffect(() => {
        JSON.stringify(init) === JSON.stringify(permissions) ? setSave(false) : setSave(true)
    });



    return(
        <Accordion.Item eventKey={role}>
            <Accordion.Header><h5>{role}</h5></Accordion.Header>
            <Accordion.Body>
                {
                    permissions.map((item, itemIdx) => {
                        return(
                            <div key={item.resource} className='py-1'>
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
                                                        setPermissions(newPermission)
                
                                                    }}
                                                    onChange={e => {}}
                                                    disabled={item.actions.every(action => action.valid)}/>
                                                </Col>
                                            </Row>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
                <Row className='clearfix justify-content-end'>
                    {
                        (role === ADMIN_ROLE_STR || role === MEMBER_ROLE_STR)
                        ? <></> 
                        :
                        <Col className='col-auto'>
                            <Button className='my-1' 
                                variant='danger' 
                                onClick={() => {
                                    handleDelete(role)
                                }}>Xóa nhóm quyền</Button>
                        </Col>
                    }
                    <Col className='col-auto'>
                        <Button className='my-1' 
                            variant='primary' 
                            disabled={!save}
                            onClick={() => {
                                setSave(false)
                            }}>Lưu những thay đổi</Button>
                    </Col>
                </Row>
            </Accordion.Body>
        </Accordion.Item>
    )
}