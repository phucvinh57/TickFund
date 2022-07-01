import React, { useState } from 'react'
import { Button, Row, Col, Form, ModalBody, Modal, Container } from 'react-bootstrap'
import { Book } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory } from '../../redux/slice/category'

const init = {
  name: '',
  type: '',
  icon: ''
}

function FormCategory({ show, onHide }) {

  const [data, setData] = useState(init)

  const dispatch = useDispatch()

  const handleAddCategory = (event) => {
    dispatch(addCategory(data))
    setData(init)
    onHide()
    event.preventDefault()
  }

  const modify = (obj) => {
    setData({ ...data, ...obj })
  }

  return <Modal
    show={show}
    onHide={onHide}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered>
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Danh mục mới
      </Modal.Title>
    </Modal.Header>
    <ModalBody>
      <Form onSubmit={handleAddCategory}>
        <Row className="mb-3">
          <Form.Group>
            <Form.Label>Loại danh mục</Form.Label>
            <Form.Select required defaultValue="Chọn..." onChange={event => modify({ type: event.target.value })}>
              <option>Chọn...</option>
              <option value="Thu">Thu</option>
              <option value="Chi">Chi</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Tên danh mục</Form.Label>
            <Form.Control required type="text" placeholder="Tên danh mục" onChange={event => modify({ name: event.target.value })} />
          </Form.Group>
          <Form.Group>

          </Form.Group>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </ModalBody>
  </Modal>
}

export default function Category() {
  const [FormShow, setFormShow] = useState(false)

  const categories = useSelector(state => state.category)

  // useEffect(() => setFormShow(FormShow ? true : false))

  let groups = ((categories, md) => {
    let buffer = []
    for (let index = 0; index < categories.length; index += md) {
      buffer.push(categories.slice(index, index + md))
    }
    return buffer
  })(categories, 6)

  return <div className='mb-3'>
    <h4>Danh mục</h4>
    <div className='mb-3'>
      <Button variant="primary" onClick={() => setFormShow(true)}>
        Thêm danh mục
      </Button>

      <FormCategory
        show={FormShow}
        onHide={() => setFormShow(false)}
      ></FormCategory>
    </div>

    {
      groups.map(
        (group, key) =>
          <Row xs={1} md={6} className='gx-4' key={key}>
            {
              group.map(
                (el, key) =>
                  <Col className='p-4 shadow-sm' key={key}>
                    <Container className='shadow-sm'>
                      <Row xs={1} md={1} className='d-flex justify-content-center text-center'>
                        <Col className=''><Book size={25} /></Col>
                        <Col>{el.name.split().map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(' ')}</Col>
                      </Row>
                    </Container>
                  </Col>
              )
            }
          </Row>
      )
    }
  </div>
}