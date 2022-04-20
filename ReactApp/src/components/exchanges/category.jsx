import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Form, ModalBody, Modal, Container } from 'react-bootstrap'
import { Book } from 'react-bootstrap-icons'
import { removeAccents } from '../../utils'

function FormCategory({ show, onHide, onClick }) {
  const init = {
    val: '',
    kind: '',
    img: ''
  }
  const [isChanged, setIsChanged] = useState(false)
  const [category, setCategory] = useState({ ...init, img: 'https://picsum.photos/400/300' })

  useEffect(() => {
    const arrInit = Object.values(init)
    const arrCategory = Object.values(category)
    let _isChanged = !(arrInit.some((el, idx) => el == arrCategory[idx]))
    setIsChanged(_isChanged)
    console.log(category)
  })

  const modify = (obj) => {
    setCategory({ ...category, ...obj })
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
      <Form onSubmit={(event) => {
        event.preventDefault();
        console.log(isChanged);
        if (isChanged) onClick(category);
      }}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Loại danh mục</Form.Label>
            <Form.Select defaultValue="Chọn..." onChange={event => modify({ kind: event.target.value })}>
              <option>Chọn...</option>
              <option value="Thu">Thu</option>
              <option value="Chi">Chi</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Tên danh mục</Form.Label>
            <Form.Control type="text" placeholder="Tên danh mục" onChange={event => modify({ val: event.target.value })} />
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </ModalBody>
  </Modal>
}

export default function Category({ data }) {
  const [FormShow, setFormShow] = useState(false)

  const [categories, setCategories] = useState([...data])

  // useEffect(() => setFormShow(FormShow ? true : false))

  const handleChange = (newCategory) => {
    const _categories = categories.some(
      el => removeAccents(newCategory.val).replaceAll(' ', '').toLowerCase()
        === removeAccents(el.val).replaceAll(' ', '').toLowerCase())
      ? categories
      : [newCategory,
        ...categories
      ]
    setCategories(_categories)
    setFormShow(false)
  }

  let groups = ((categories, md) => {
    let buffer = []
    for (let index = 0; index < categories.length; index += md) {
      buffer.push(categories.slice(index, index + md))
    }
    return buffer
  })(categories, 6)
  console.log(groups)

  return <div className='mb-3'>
    <h4>Danh mục</h4>
    <div className='mb-3'>
      <Button variant="primary" onClick={() => setFormShow(true)}>
        Thêm danh mục
      </Button>

      <FormCategory
        show={FormShow}
        onHide={() => setFormShow(false)}
        onClick={handleChange}
      ></FormCategory>
    </div>

    {
      groups.map(
        (group, key) =>
          <Row xs={1} md={6} className='gx-4'>
            {
              group.map(
                (el, key) =>
                  <Col className='p-4 shadow-sm'>
                    <Container className='shadow-sm'>
                      <Row xs={1} md={1} className='d-flex justify-content-center text-center'>
                        <Col className=''><Book size={25} /></Col>
                        <Col>{el.val.split().map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(' ')}</Col>
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