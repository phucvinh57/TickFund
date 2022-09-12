import React, { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { transactionService } from '../../services/transaction.service';
import { dateTimeToString, prettyNumber, queryToApiBody } from '../../utils';
import { convertUnifiedCodeToEmojiSymbol } from '../../utils/convertUnifiedCodeToEmojiSymbol';
import { TickTableV2 } from '../ticktable/tableV2';
import { useSelector } from 'react-redux';
import { EMPTY_AVATAR } from '../../resource';
import { DEFAULT_TRANSACTION_QUERY, PAGE_SIZE } from '../../constants/pageSettings';
import { TransactionDetailModal } from './transactionDetailModal';

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

  const transactionTrigger = useSelector(state => state.transactionTrigger)

  useEffect(() => {
    transactionService.getTransactions(query).then(response => {
      setTransactions(response.data.results)
      setTotalMatched(response.data.total)
    })
    .catch(err => {
      console.log(err)
    })
  }, [query, transactionTrigger])

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
      attachments: transaction.attachments,
      createdAt: transaction.created_at
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
        if(totalMatched !== 0){
          data.slice.pageNumber = filterPageNum > Math.ceil(totalMatched / PAGE_SIZE) ? Math.ceil(totalMatched / PAGE_SIZE) : filterPageNum
        }
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