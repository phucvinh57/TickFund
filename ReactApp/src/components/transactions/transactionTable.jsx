import React, { useState } from 'react';
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { transactionTableHeaders } from '../../constants/transactionTableHeaders';
import { transactionService } from '../../services/transaction.service';
import { prettyNumber } from '../../utils';
import { convertUnifiedCodeToEmojiSymbol } from '../../utils/convertUnifiedCodeToEmojiSymbol';
import { TickTableV2 } from '../ticktable/tableV2';
import { TransactionDetailModal } from './transactionDetailModal';

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
              className={((transaction.category.type === "income") ? "text-success " : "text-danger ") + "fw-bold"}
            >
              {((transaction.category.type === "income") ? prettyNumber(transaction.amount) : prettyNumber(-transaction.amount))}
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