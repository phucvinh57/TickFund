import React, { useMemo, useState, useEffect } from 'react';
import { Col, Container, Modal, ModalBody, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { removeAccents, reduceValuesToString, multiFilter } from "../../utils"

// import { Button, Row, Col, ListGroup, ButtonGroup} from "react-bootstrap"
import TickTable from '../ticktable';

function Detail({ data, show, onHide }) {
  // console.log(data)
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
      <Container>
        <Row className='mb-2'>
          <Col className="ms-2">
            <strong>Số tiền</strong>
          </Col>
          <Col className="me-2" sm={8} >{data.money}</Col>
        </Row>
        <Row className='mb-2'>
          <Col className="ms-2">
            <strong>Danh mục</strong>
          </Col>
          <Col className="me-2" sm={8} >
            {
              !data.category ?
                null :
                data.category.name.split().map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(' ')
            }
          </Col>
        </Row>
        <Row className='mb-2'>
          <Col className="ms-2">
            <strong>Người giao dịch</strong>
          </Col>
          <Col className="me-2" sm={8} >{!data.user ? null : data.user.name}</Col>
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
      </Container>
    </ModalBody>
  </Modal>
}

export default function HistoryTable() {
  const users = useSelector(state => state.user)
  let DB = useSelector(state => state.transaction)
  console.log(DB)

  const headers = [
    {
      label: 'Mã giao dịch',
      association: {
        key: 'id',
        type: 'text',
      },
      sortable: false
    },
    {
      label: 'Người giao dịch',
      association: {
        key: 'user',
        type: 'select',
        options: users.map(user => user.name)
      },
      sortable: true,
    },
    {
      label: 'Thời gian',
      association: {
        key: 'time',
        type: 'select',
        options: DB.map(transaction => transaction.time)
      },
      sortable: true
    },
    {
      label: 'Số tiền',
      association: {
        key: 'money',
        type: 'select',
        options: DB.map(transaction => transaction.money)
      },
      sortable: true
    },
    {
      label: 'Danh mục',
      association: {
        key: 'category',
        type: 'select',
        options: ['Thu', 'Chi']
      },
      sortable: true
    }
  ]

  const name = "Lịch sử giao dịch"
  const itemsPerPage = 10


  function populate(transactions) {
    return transactions.map(el => {
      return {
        ...el,
        id: el.id,
        user: {
          val: el.user.name,
          component: <div>
            <Row>
              <Col className='col-auto d-flex align-items-center'>
                <div style={{ height: '2.5rem', width: '2.5rem' }}>
                  <img className='img-fluid circle-border' src={el.user.img} style={{ aspectRatio: '1/1' }} alt='avatar' />
                </div>
              </Col>
              <Col>
                <Row className='my-0'>
                  <span className='fw-bold'>{el.user.name}</span>
                </Row>
                <Row className='my-0'>
                  <span>@{el.user.name}</span>
                </Row>
              </Col>
            </Row>
          </div>
        },
        time: el.time,
        money: {
          val: el.money,
          component: <div className='col d-flex align-items-center'>
            <span className={((el.category.type === "Thu") ? "text-success " : "text-danger ") + "fw-bold"}>{((el.category.type === "Thu") ? "+ " : "- ") + el.money}</span>
          </div>
        },
        category: el.category.name.split().map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(' ')
      }
    })
  }


  const [show, setShow] = useState(false)
  const [showData, setShowData] = useState({})

  const [pageData, setPageData] = useState([])
  const [numPages, setNumPages] = useState(0)

  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState(null)

  const mockDB = useMemo(() => {
    return populate(DB)
  }, [DB])

  const init = () => {
    setPageData(itemsPerPage ? mockDB.slice(0, itemsPerPage) : mockDB)
    setNumPages(Math.ceil(mockDB.length / itemsPerPage))
    setFilters(null)
  }

  useEffect(init, [mockDB])

  const search = (query) => {
    setSearchQuery(removeAccents(query).replaceAll(' ', '').toLowerCase())

    if (query === '') {
      init()
      return
    }

    const matchedRecord = mockDB.filter(
      rec => removeAccents(reduceValuesToString(rec))
        .replaceAll(' ', '')
        .toLowerCase()
        .match(searchQuery)
    )
    setFilters(matchedRecord.slice(0, itemsPerPage))
    setNumPages(Math.ceil(matchedRecord.length / itemsPerPage))
  }

  const change = (nth) => {
    let start = nth * itemsPerPage
    let end = start + itemsPerPage

    const searchResult = searchQuery === '' ? mockDB.slice(0) : filters
    const filterResult = filters ? multiFilter(searchResult, filters) : searchResult
    setPageData(filterResult.slice(start, end))
  }

  const click = (row) => {
    setShowData(DB.filter(rec => rec.id === row.id)[0])
    setShow(true)
  }

  const sort = (option) => {
    const { key, order } = option
    mockDB.sort((row1, row2) => ((order === 'inc') ? 1 : -1) * row1[key].localeCompare(row2[key]))
    init()
  }

  const filter = (str) => {
    const filteredData = multiFilter(DB, str)
    setNumPages(Math.ceil(filteredData.length / itemsPerPage))
  }

  return <div className='mb-3' >
    <TickTable
      data={pageData}
      headers={headers}
      name={name}
      numPages={numPages}
      onSearch={search}
      onPageChange={change}
      onRowClick={click}
      onSort={sort}
      onFilter={filter}
    />

    <Detail
      data={showData}
      show={show}
      onHide={() => setShow(false)}
    />
  </div>
}