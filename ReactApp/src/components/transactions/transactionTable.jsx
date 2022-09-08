import React, { useState } from 'react';
import { useEffect } from 'react';
import { Col, Modal, ModalBody, Row } from 'react-bootstrap';
import { transactionTableHeaders } from '../../constants/transactionTableHeaders';
import { transactionService } from '../../services/transaction.service';
import { convertUnifiedCodeToEmojiSymbol } from '../../utils/convertUnifiedCodeToEmojiSymbol';
import Attachment from '../attachment/attachment';
import { TickTableV2 } from '../ticktable/tableV2';

function TransactionDetailModal({ data, show, onHide }) {
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
    <ModalBody>
      <Row className='mb-2'>
        <Col className="ms-2">
          <strong>Số tiền</strong>
        </Col>
        <Col className="me-2" sm={8} >
          {data.money}
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
        <Col className="me-2" sm={8} >{data.time}</Col>
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
        <Col className="me-2" sm={8} >{data.notes}</Col>
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
    </ModalBody>
  </Modal>
}

export default function TransactionTable() {
  const [show, setShow] = useState(false)
  const [showData, setShowData] = useState(null)

  const [data, setData] = useState([])

  useEffect(() => {
    transactionService.getTransactions(null).then(response => {
      const fetchedTransactionData = response.data
      const convertedFetchTransactionDataToComponents = fetchedTransactionData.map(transaction => ({
        id: transaction.id,
        user: {
          val: transaction.user.name,
          component: <div>
            <Row>
              <Col className='col-auto d-flex align-items-center'>
                <div style={{ height: '2.5rem', width: '2.5rem' }}>
                  <img className='img-fluid circle-border'
                    src={transaction.user.avatarUrl}
                    style={{ aspectRatio: '1/1' }} alt='avatar' />
                </div>
              </Col>
              <Col>
                <Row className='my-0'>
                  <span className='fw-bold'>{transaction.user.name}</span>
                </Row>
                <Row className='my-0'>
                  <span>@{transaction.user.username}</span>
                </Row>
              </Col>
            </Row>
          </div>
        },
        time: transaction.time,
        money: {
          val: transaction.amount,
          component: <div className='col d-flex align-items-center'>
            <span
              className={((transaction.category.type === "Thu") ? "text-success " : "text-danger ") + "fw-bold"}
            >
              {((transaction.category.type === "Thu") ? "+ " : "- ") + transaction.amount}
            </span>
          </div>
        },

        category: {
          val: transaction.category.name,
          component: <span>
            {convertUnifiedCodeToEmojiSymbol(transaction.category.icon) + " " + transaction.category.name}
          </span>
        }

      }))
      setData(convertedFetchTransactionDataToComponents)
    })
  }, [])

  const openTransactionDetail = row => {
    transactionService.getTransactionDetailById(row.id).then(response => {
      const allTransactionData = {
        money: row.money.component,
        category: row.category.component,
        user: row.user.component,
        time: row.time,
        id: row.id,
        notes: response.data.notes,
        attachments: response.data.attachments
      }
      setShowData(allTransactionData)
      setShow(true)
    })
  }

  return <div className='mb-3' >
    <TickTableV2
      tableName={"Lịch sử giao dịch"}
      componentSize="md"
      headers={transactionTableHeaders}
      data={data}
      numPages={20}
      defaultSortField="time"
      onQuery={data => console.log(data)}
      onRowClick={openTransactionDetail}
    />

    {showData !== null && <TransactionDetailModal
      data={showData}
      show={show}
      onHide={() => setShow(false)}
    />}
  </div>
}