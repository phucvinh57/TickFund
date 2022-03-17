import React, {useState} from 'react';
import { Button, Row, Col, ListGroup, ButtonGroup} from "react-bootstrap"
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
// import ModalHeader from 'react-bootstrap/ModalHeader'
// import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import {Link, X} from 'react-bootstrap-icons'

function PopUp(props) {
    return <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
             <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Danh mục mới
                </Modal.Title>
            </Modal.Header>
            <ModalBody>
                <Form>
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
                            <Form.Control type="text" placeholder="Tên danh mục"/>
                        </Form.Group>
                    </Row>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </ModalBody>
        </Modal>
}

export default function InitCategory() {
    const [modalShow, setModalShow] = useState(false);
    return <div className='mb-3'>
        <Button variant="primary" onClick={() => setModalShow(true)}>
            Thêm danh mục
        </Button>

        <PopUp
            show={modalShow}
            onHide={() => setModalShow(false)}
        ></PopUp>
    </div>
}