import React, { useState } from 'react';
import { Button, Row, Col, ListGroup, ButtonGroup } from "react-bootstrap"
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import ModalBody from 'react-bootstrap/ModalBody'
import { Link, X } from 'react-bootstrap-icons'
import { prettyDate } from '../../utils';
import { makeid } from './sampleData';
import { EMPTY_AVATAR } from '../../resource';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../../redux/slice/transaction';

const init = {
  id: '',
  time: '',
  money: '',
  category: {
    name: '',
    type: '',
    icon: ''
  },
  user: {
    name: '',
    img: ''
  },
  notes: '',
  attachments: []
}


export default function FormAdd({ show, onHide }) {
  const users = useSelector(state => state.user)
  const categories = useSelector(state => state.category)

  const [selectedFiles, setSelectedFiles] = useState([])

  const handleChangePic = (event) => {
    let files = selectedFiles.concat(
      [...event.target.files].filter(
        (file) => { return !selectedFiles.some(el => { return el.name === file.name }) }
      )
    )
    setSelectedFiles(files)
  }

  const handleRemovePic = (id) => {
    const newList = [...selectedFiles]
    newList.splice(id, 1)
    setSelectedFiles(newList)
  }

  const [data, setData] = useState(init)


  const dispatch = useDispatch()

  const handleAddTransaction = (event) => {
    const files = selectedFiles.map(el => URL.createObjectURL(el))
    dispatch(addTransaction({ ...data, id: makeid(10), time: prettyDate(new Date()), attachments: files }))
    setData(init)
    setSelectedFiles([]);
    onHide()
    event.preventDefault();
  }

  const modify = (obj) => {
    const _data = { ...data, ...obj }
    setData(_data)
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
      <Form onSubmit={handleAddTransaction} >
        <Form.Group className="mb-3">
          <Form.Label>Số tiền</Form.Label>
          <Form.Control type="number" required onChange={(event) => modify({ money: event.target.value + ' VND' })} />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Loại danh mục</Form.Label>
            <Form.Select required
              value={data.category.type}
              onChange={
                (event) => setData({
                  ...data,
                  category: {
                    ...data.category,
                    type: event.target.value
                  }
                })
              }
            >
              <option value="" disabled>Chọn...</option>
              <option value="Thu">Thu</option>
              <option value="Chi">Chi</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Tên danh mục</Form.Label>
            <Form.Select
              required
              value={data.category.name}
              onChange={
                (event) =>
                  setData({
                    ...data,
                    category: {
                      ...data.category,
                      name: event.target.value
                    }
                  })
              }
            >
              <option value='' disabled>---Chọn danh mục---</option>
              {
                categories.filter(category => category.type === data.category.type)
                  .map((category, idx) =>
                    <option key={idx} value={category.name}>
                      {category.name}
                    </option>
                  )
              }
            </Form.Select>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Người giao dịch</Form.Label>
          <Form.Select defaultValue="Chọn..." required onChange={(event) => modify({ user: { name: users[event.target.value].name, img: EMPTY_AVATAR } })}>
            <option value="">Chọn...</option>
            {
              (users.length !== 0) ? users.map((el, idx) => <option key={idx} value={idx}>{el.name}</option>) : <></>
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
                      <Button variant="primary" size="sm" className='p-1' onClick={() => handleRemovePic(id)}><X size={12} /></Button>
                    </ButtonGroup>)
                  })
                  : <div></div>
              }
            </ListGroup.Item>
            <ListGroup.Item className='py-1 px-2'>
              <Form.Group>
                <Form.Label className='mb-1'>
                  <input type="file" name="file" accept="image/*" multiple hidden onChange={handleChangePic} />
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
  </Modal >
}
