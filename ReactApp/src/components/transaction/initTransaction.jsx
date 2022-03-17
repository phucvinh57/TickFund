import React, {useState} from 'react';
import { Button, Row, Col, ListGroup, ButtonGroup} from "react-bootstrap"
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
// import ModalHeader from 'react-bootstrap/ModalHeader'
// import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import {Link, X} from 'react-bootstrap-icons'

function UploadFile() {
    
    const [selectedFiles, setSelectedFiles] = useState([])

    const changeHandler = (event) => {
        let files = selectedFiles.concat([...event.target.files].filter((file) => 
            {return !selectedFiles.some(el => {return el.name == file.name}) }
        ))
        setSelectedFiles(files)
    }

    const removeHandler = (id) => {
        const newList = [...selectedFiles]
        newList.splice(id, 1)
        setSelectedFiles(newList)

    }

    return (
        <ListGroup horizontal="sm">
            <ListGroup.Item className='p-1 flex-grow-1'>
                {
                    selectedFiles.length !== 0 ?
                    selectedFiles.map((file, id) => {
                        console.log(id)
                        return (<ButtonGroup key={id} className="m-1">
                                <Button variant="primary" size="sm">{file.name}</Button>
                                <Button variant="primary" size="sm" className='p-1' onClick={() => removeHandler(id)}><X size={12}/></Button>
                            </ButtonGroup>)
                    })
                    : <div></div>
                }
            </ListGroup.Item>
            <ListGroup.Item className='py-1 px-2'>
                <Form.Group>
                    <Form.Label className='mb-1'>
                        <input type="file" name="file" accept="image/*" multiple hidden onChange={changeHandler}/>
                        <Link size={15}/>
                    </Form.Label>
                </Form.Group>
            </ListGroup.Item>
        </ListGroup>
    )
}

function PopUp(props) {
    return <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
             <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Giao dịch mới
                </Modal.Title>
            </Modal.Header>
            <ModalBody>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Số tiền</Form.Label>
                        <Form.Control type="number" placeholder="300 000đ"/>
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Loại danh mục</Form.Label>
                            <Form.Select defaultValue="Chọn...">
                                <option>Chọn...</option>
                                <option value="1">Thu</option>
                                <option value="2">Chi</option>  
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Tên danh mục</Form.Label>
                            <Form.Select defaultValue="Chọn...">
                                <option>Chọn...</option>
                                <option value="1">Quỹ Lab hằng tháng</option>
                                <option value="2">Viễn thông</option>  
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Thời gian giao dịch</Form.Label>
                        <Form.Control type="datetime-local" size="sm" placeholder={Date.now()}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Người giao dịch</Form.Label>
                        <Form.Control type="text" placeholder="Nguyễn Phúc Vinh"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Ghi chú</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                        <UploadFile/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </ModalBody>
        </Modal>
}

export default function InitTransaction() {
    const [modalShow, setModalShow] = useState(false);
    return <div className='mb-3'>
        <Button variant="primary" onClick={() => setModalShow(true)}>
            Tạo giao dịch
        </Button>

        <PopUp
            show={modalShow}
            onHide={() => setModalShow(false)}
        ></PopUp>


    </div>
}