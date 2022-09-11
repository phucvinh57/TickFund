import React, { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { Col, Modal, ModalBody, Row } from 'react-bootstrap';
import { transactionService } from '../../services/transaction.service';
import { dateTimeToString, prettyNumber, queryToApiBody } from '../../utils';
import { convertUnifiedCodeToEmojiSymbol } from '../../utils/convertUnifiedCodeToEmojiSymbol';
import Attachment from '../attachment/attachment';
import { TickTableV2 } from '../ticktable/tableV2';
import { useSelector } from 'react-redux';
import { EMPTY_AVATAR } from '../../resource';
import { DEFAULT_TRANSACTION_QUERY, PAGE_SIZE } from '../../constants/pageSettings';

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

function transactionToTableData(transactions, users, categories) {
  return transactions.map(transaction => {
    const transactionUser = users.find(u => u.ID === transaction.user_id)
    const storeCategory = categories.find(c => c.name === transaction.category_name)
    const categoryIcon = storeCategory ? storeCategory.icon : null
    return {
      id: transaction.ID,
      user: {
        val: transactionUser.ID,
        component: <div>
          <Row>
            <Col className='col-auto d-flex align-items-center'>
              <div style={{ height: '2.5rem', width: '2.5rem' }}>
                <img className='img-fluid circle-border'
                  src={transactionUser.avatarUrl ? transactionUser.avatarUrl : EMPTY_AVATAR}
                  style={{ aspectRatio: '1/1' }} alt='avatar' />
              </div>
            </Col>
            <Col>
              <Row className='my-0'>
                <span className='fw-bold'>{transactionUser.name}</span>
              </Row>
              <Row className='my-0'>
                <span>@{transactionUser.ID}</span>
              </Row>
            </Col>
          </Row>
        </div>
      },
      history: transaction.history,
      createdAt: dateTimeToString(new Date(transaction.created_at)),
      amount: {
        val: transaction.amount,
        component: <div className='col d-flex align-items-center'>
          <span
            className={((transaction.category_type === "income") ? "text-success " : "text-danger ") + "fw-bold"}
          >
            {prettyNumber(transaction.amount)}
          </span>
        </div>
      },

      category: {
        val: transaction.category_name,
        component: <span>
          {convertUnifiedCodeToEmojiSymbol(categoryIcon)
            + " " + transaction.category_name}
        </span>
      }

    }
  })
}


const TRANSACTION_FIELD_MAP = {
  'id': 'ID',
  'user': 'user_id',
  'createdAt': 'created_at',
  'category': 'category_name'
}

export default function TransactionTable() {
  const [show, setShow] = useState(false)
  const [showData, setShowData] = useState(null)
  const users = useSelector((state) => state.users)
  const [transactions, setTransactions] = useState([])
  const [totalMatched, setTotalMatched] = useState(0)
  const [query, setQuery] = useState(DEFAULT_TRANSACTION_QUERY)
  const categories = useSelector(state => state.categories)

  useEffect(() => {
    transactionService.getTransactions(query).then(response => {
      setTransactions(response.data.results)
      setTotalMatched(response.data.total)
    })
    .catch(err => {
      console.log(err)
    })
  }, [query])

  useEffect(() => {
    if(Math.ceil(totalMatched / PAGE_SIZE) < query.size.page_number){
      setQuery({...query, size: {page_number: 1, page_size: PAGE_SIZE}})
    }
  }, [totalMatched])

  const openTransactionDetail = row => {
    const transaction = transactions.find(t => t.ID === row.id)
    const allTransactionData = {
      money: row.amount.component,
      category: row.category.component,
      user: row.user.component,
      history: row.history,
      id: row.id,
      notes: transaction.note ? transaction.note : '',
      attachments: transaction.attachments
    }
    setShowData(allTransactionData)
    setShow(true)
  }

  const transactionTableHeaders = useMemo(() => {
    return [{
      label: 'Mã giao dịch',
      association: {
        key: 'id',
        type: 'text'
      },
      sort: false,
      filter: false
    }, {
      label: 'Người giao dịch',
      association: {
        key: 'user',
        type: 'select',
        options: users.map(u => ({
          value: u.ID,
          label: u.name
        }))
      },
      sort: false,
      filter: true
    }, {
      label: 'Ngày giao dịch',
      association: {
        key: 'history',
        type: 'date',
      },
      sort: true,
      filter: true
    }, {
      label: 'Số tiền',
      association: {
        key: 'amount',
        type: 'number'
      },
      sort: true,
      filter: true
    }, {
      label: 'Danh mục',
      association: {
        key: 'category',
        type: 'select',
        options: categories.map(c => ({
          value: c.name,
          label: convertUnifiedCodeToEmojiSymbol(c.icon) + " " + c.name
        }))
      },
      sort: false,
      filter: true
    }, {
      label: 'Ngày tạo',
      association: {
        key: 'createdAt',
        type: 'date'
      },
      sort: true,
      filter: true
    }]
  }, [categories, users])

  return <div className='mb-3' >
    {categories.length > 0 && users.length > 0 &&
     <TickTableV2
      tableName={"Lịch sử giao dịch"}
      componentSize="md"
      headers={transactionTableHeaders}
      data={transactionToTableData(transactions, users, categories)}
      numPages={Math.ceil(totalMatched / PAGE_SIZE)}
      defaultSortField="createdAt"
      onQuery={data => {
        const filterPageNum = data.slice.pageNumber
        data.slice.pageNumber = filterPageNum > totalMatched ? totalMatched : filterPageNum
        console.log(data)
        setQuery(queryToApiBody(data, TRANSACTION_FIELD_MAP))
      }}
      onRowClick={openTransactionDetail}
    />}

    {showData !== null && <TransactionDetailModal
      data={showData}
      show={show}
      onHide={() => setShow(false)}
    />}
  </div>
}