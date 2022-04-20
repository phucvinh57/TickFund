import React from 'react'
import { Col, Container, Form, Modal, ModalBody, Row } from 'react-bootstrap'



export default function TransactionModal(props) {
  function Input(props) {
    return <Form.Group>
      <Form.Label>{props.label}</Form.Label>
      {
        (props.type === 'select') ? <Form.Select defaultValue={props.default} onChange={props.onChange}>
          <option disabled value=''>{props.default}</option>
          {props.selection.map(element => <option value={element}>{element}</option>)}
        </Form.Select> : <Form.Control {...props} />
      }
    </Form.Group>
  }

  function View(props) {
    return <Row className='mb-2'>
      <Col className="ms-2">
        <strong>{props.title}</strong>
      </Col>
      <Col className="me-2" sm={8} >{props.data}</Col>
    </Row>
  }

  return <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered>
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        {props.title}
      </Modal.Title>
    </Modal.Header>
    <ModalBody>
      {props.headers.map(header => props.type === 'form' ? <Input {...header} /> : <View {...header} />)}
    </ModalBody>
  </Modal>
}