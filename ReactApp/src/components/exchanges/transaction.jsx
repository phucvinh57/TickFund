import React, { useEffect, useState } from 'react';
import { Button, Row, Col, ListGroup, ButtonGroup } from "react-bootstrap"
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
// import ModalHeader from 'react-bootstrap/ModalHeader'
// import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import { Link, X } from 'react-bootstrap-icons'
import { prettyDate } from '../../utils';
import { makeid } from './sampleData';
import { EMPTY_AVATAR } from '../../resource';


export default function FormAdd({ init, users, categories, show, onHide, onClick }) {
    const [selectedFiles, setSelectedFiles] = useState([])

    console.log(categories)

    const changeHandler = (event) => {
        let files = selectedFiles.concat([...event.target.files].filter((file) => { return !selectedFiles.some(el => { return el.name == file.name }) }
        ))
        setSelectedFiles(files)
    }

    const removeHandler = (id) => {
        const newList = [...selectedFiles]
        newList.splice(id, 1)
        setSelectedFiles(newList)

    }

    const [transaction, setTransaction] = useState(init)
    const [optionList, setOptionList] = useState([])
    const [option, setOption] = useState('')


    const modify = (obj) => {
        const _transaction = { ...transaction, ...obj }
        setTransaction(_transaction)
    }

    return <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Giao dịch mới
            </Modal.Title>
        </Modal.Header>
        <ModalBody>
            <Form onSubmit={(event) => {
                const files = selectedFiles.map(el => URL.createObjectURL(el))
                console.log(files)
                const changes = { ...transaction, id: makeid(6), time: prettyDate(new Date), attachments: files };
                event.preventDefault();
                onClick(changes);
                setTransaction(transaction);
                setSelectedFiles([]);
            }} >
                <Form.Group className="mb-3">
                    <Form.Label>Số tiền</Form.Label>
                    <Form.Control type="number" required onChange={(event) => modify({ money: event.target.value + ' đ' })} />
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Loại danh mục</Form.Label>
                        <Form.Select required defaultValue="Chọn..." onChange={(event) => {
                            const arr = categories.filter(el => el['kind'] === event.target.value).map(({ val }) => (val))
                            console.log(arr)
                            if (option < arr.length) modify({
                                category:
                                {
                                    val: arr[option],
                                    kind: event.target.value,
                                    img: "https://picsum.photos/400/300"
                                }
                            })
                            else modify({
                                category:
                                {
                                    val: '',
                                    kind: event.target.value,
                                    img: "https://picsum.photos/400/300"
                                }
                            })
                            setOptionList(arr)
                        }
                        }>
                            <option value="">Chọn...</option>
                            <option value="Thu">Thu</option>
                            <option value="Chi">Chi</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Tên danh mục</Form.Label>
                        <Form.Select required defaultValue="Chọn..."
                            onChange={
                                (event) => {
                                    modify({
                                        category:
                                        {
                                            val: optionList[event.target.value],
                                            kind: transaction.category.kind,
                                            img: "https://picsum.photos/400/300"
                                        }
                                    })
                                    setOption(event.target.value)
                                }
                            }>
                            <option value="">Chọn...</option>
                            {console.log(optionList[option])}
                            {(optionList.length !== 0) ? optionList.map((el, idx) => <option key={idx} value={idx}>{el}</option>) : <></>}
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Label>Người giao dịch</Form.Label>
                    <Form.Select defaultValue="Chọn..." required onChange={(event) => modify({ user: { val: users[event.target.value].val, img: EMPTY_AVATAR } })}>
                        <option value="">Chọn...</option>
                        {
                            (users.length !== 0) ? users.map((el, idx) => <option key={idx} value={idx}>{el.val}</option>) : <></>
                        }
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ghi chú</Form.Label>
                    <Form.Control as="textarea" rows={3} onChange={(event) => modify({ notes: event.target.value })} />
                    <ListGroup horizontal="sm">
                        <ListGroup.Item className='p-1 flex-grow-1'>
                            {
                                selectedFiles.length !== 0 ?
                                    selectedFiles.map((file, id) => {
                                        console.log(id)
                                        return (<ButtonGroup key={id} className="m-1">
                                            <Button variant="primary" size="sm" className='text-truncate' style={{ width: 5 + 'rem' }}>{file.name}</Button>
                                            <Button variant="primary" size="sm" className='p-1' onClick={() => removeHandler(id)}><X size={12} /></Button>
                                        </ButtonGroup>)
                                    })
                                    : <div></div>
                            }
                        </ListGroup.Item>
                        <ListGroup.Item className='py-1 px-2'>
                            <Form.Group>
                                <Form.Label className='mb-1'>
                                    <input type="file" name="file" accept="image/*" multiple hidden onChange={changeHandler} />
                                    <Link size={15} />
                                </Form.Label>
                            </Form.Group>
                        </ListGroup.Item>
                    </ListGroup>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </ModalBody>
    </Modal>
}
