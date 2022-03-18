import React, {useEffect, useState} from 'react';
import { Button, Row, Col, ListGroup, ButtonGroup } from "react-bootstrap"
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
// import ModalHeader from 'react-bootstrap/ModalHeader'
// import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalBody from 'react-bootstrap/ModalBody'
import {Link, X} from 'react-bootstrap-icons'
import { prettyDate } from '../../utils';
import { makeid } from './sampleData';

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

export default function Transaction({categoryList, show, onHide, onClick}) {
    const init = {
        id: makeid(10),
        time: prettyDate(new Date(1970,1,1)),
        money: '',
        category: {
            name: '',
            kind: ''
        },
        user: '',
        notes: '',
        attachment: ''
    }
    const [transaction, setTransaction] = useState(init)
    const [optionList, setOptionList] = useState([])
    const [option, setOption] = useState(0)


    const modify = (obj) => {
        setTransaction({ ...transaction, ...obj })
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
                <Form onSubmit={(event) => {event.preventDefault();onClick(transaction)} } >
                    <Form.Group className="mb-3">
                        <Form.Label>Số tiền</Form.Label>
                        <Form.Control type="number" onChange={(event) => modify({money: event.target.value + ' đ'})}/>
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Loại danh mục</Form.Label>
                            <Form.Select defaultValue="Chọn..." onChange={(event) => {
                                        modify({category: 
                                            {name:optionList[option], kind: event.target.value}
                                        })
                                        const arr = categoryList.filter(el => el['kind'] === event.target.value ).map( ({name}) => (name) )
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
                            <Form.Select defaultValue="Chọn..." 
                                    onChange={
                                        (event) => {
                                            setOption(event.target.value)
                                            modify({category: 
                                                {name:optionList[option], kind: transaction.category.kind}
                                            }) 
                                    }
                                }>
                                <option>Chọn...</option>
                                {console.log(optionList[option])}
                                { (optionList.length !== 0) ? optionList.map((el, idx) => <option key={idx} value={idx}>{el}</option>) : <></>}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3" controlId="duedate">
                        <Form.Label>Thời gian giao dịch</Form.Label> 
                        <Form.Control
                            type="datetime-local"
                            name="duedate"
                            onChange={(event) => modify({time: prettyDate(new Date(event.target.value))})}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Người giao dịch</Form.Label>
                        <Form.Control type="text" placeholder="Nguyễn Phúc Vinh" onChange={(event) => modify({user: event.target.value})}/>
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