import Attachment from '../attachment/attachment';
import { Modal, Row, Col } from "react-bootstrap"
import { dateToString } from '../../utils';

export function TransactionDetailModal({ data, show, onHide }) {
  return <Modal
    show={show}
    onHide={onHide}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered>
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Chi tiết giao dịch
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Row className='mb-2'>
        <Col className="ms-2">
          <strong>Số tiền</strong>
        </Col>
        <Col className="me-2" sm={8} >
          {data.amount}
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col className="ms-2">
          <strong>Danh mục</strong>
        </Col>
        <Col className="me-2" sm={8} >
          {data.category}
        </Col>
      </Row>
      <Row className='mb-2'>
        <Col className="ms-2">
          <strong>Người giao dịch</strong>
        </Col>
        <Col className="me-2" sm={8} >{data.user}</Col>
      </Row>
      <Row className='mb-2'>
        <Col className="ms-2">
          <strong>Thời gian giao dịch</strong>
        </Col>
        <Col className="me-2" sm={8} >{dateToString(new Date(data.history))}</Col>
      </Row>
      <Row className='mb-2'>
        <Col className="ms-2">
          <strong>Mã giao dịch</strong>
        </Col>
        <Col className="me-2" sm={8} >{data.id}</Col>
      </Row>
      <Row className='mb-2'>
        <Col className="ms-2">
          <strong>Ghi chú</strong>
        </Col>
        <Col className="me-2" sm={8} >{data.note}</Col>
      </Row>
      <Row className='mb-2'>
        <Col className="ms-2">
          <strong>Ngày tạo</strong>
        </Col>
        <Col className="me-2" sm={8} >{dateToString(new Date(data.createdAt))}</Col>
      </Row>
      <Row className='mb-2'>
        <Col className="ms-2">
          <strong>Id Người tạo</strong>
        </Col>
        <Col className="me-2" sm={8} >{data.creatorId}</Col>
      </Row>
      <Row className='mb-2'>
        <Col className="ms-2">
          <strong>Đính kèm</strong>
        </Col>
        <Col className="me-2" sm={8} >
          {data.attachments.map(attachment => <Attachment
            key={attachment.name}
            path={attachment.path}
            name={attachment.name}
          />)}
        </Col>
      </Row>
    </Modal.Body>
  </Modal>
}
