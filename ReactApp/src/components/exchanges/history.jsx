import React, { useMemo, useState, useEffect } from 'react';
import { Col, Container, Modal, ModalBody, Row} from 'react-bootstrap';
import { MockDatabase } from '../../utils';
// import { Button, Row, Col, ListGroup, ButtonGroup} from "react-bootstrap"
import TickTable from '../ticktable';
import { category } from './sampleData';

function Detail({openData,show,onHide}) {

    console.log(openData)
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
                    <Col className="me-2" sm={8} >{openData.money}</Col>
                </Row>
                <Row className='mb-2'>
                    <Col className="ms-2">
                        <strong>Danh mục</strong>
                    </Col>
                    <Col className="me-2" sm={8} >{!openData.category ? null : openData.category.val.split().map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(' ')}</Col>
                </Row>
                <Row className='mb-2'>
                    <Col className="ms-2">
                        <strong>Người giao dịch</strong>
                    </Col>
                    <Col className="me-2" sm={8} >{!openData.user ? null : openData.user.val}</Col>
                </Row>
                <Row className='mb-2'>
                    <Col className="ms-2">
                        <strong>Thời gian giao dịch</strong>
                    </Col>
                    <Col className="me-2" sm={8} >{openData.time}</Col>
                </Row>
                <Row className='mb-2'>
                    <Col className="ms-2">
                        <strong>Mã giao dịch</strong>
                    </Col>
                    <Col className="me-2" sm={8} >{openData.id}</Col>
                </Row>
                <Row className='mb-2'>
                    <Col className="ms-2">
                        <strong>Ghi chú</strong>
                    </Col>
                    <Col className="me-2" sm={8} >{openData.notes}</Col>
                </Row>
            </Container>
        </ModalBody>
    </Modal>
}

export default function History({DB}) {
    const pages = 10

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
                options: DB.map(transaction => transaction.user)
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
                options: DB.map(transaction => transaction.category)
            },
            sortable: true
        }
    ]

    const name = "Lịch sử giao dịch"
    const itemsPerPage = 10


    function populate(transactions) {
        return transactions.map( el => {
            return {
                ...el,
                id: el.id,
                user: {
                    val: el.user.person,
                    component: <div>
                        <Row>
                            <Col className='col-auto d-flex align-items-center'>
                                <div style={{height: '2.5rem', width: '2.5rem' }}>
                                <img className='img-fluid circle-border' src={el.user.img} style={{aspectRatio: '1/1'}}></img>
                                </div>
                            </Col>
                            <Col>
                                <Row className='my-0'>
                                    <span className='fw-bold'>{el.user.val}</span>
                                </Row>
                                <Row className='my-0'>
                                    <span>@{el.user.val}</span>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                },
                time: el.time,
                money: {
                    val: el.money,
                    component: <div className='col d-flex align-items-center'>
                        <span className={((el.category.kind === "Thu") ? "text-success " : "text-danger ") + "fw-bold"}>{((el.category.kind === "Thu") ? "+ " : "- ") + el.money}</span>
                    </div>
                },
                category: el.category.val.split().map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(' ')
            }
        })
    }


    const [show, setShow] = useState(false)
    const [openData, setOpenData] = useState({})

    const [pageData, setPageData] = useState([])
    const [numPages, setNumPages] = useState(0)

    const [searchQuery, setSearchQuery] = useState('')

    const mockDB = useMemo(() => { let db = new MockDatabase(DB); db.sort('time', 'dec'); return db}, [DB])

    const init = () => {
        console.log(pageData)
        setPageData(mockDB.slice(0, itemsPerPage))
        setNumPages(Math.ceil(mockDB.getCurrLength() / itemsPerPage))
    }

    useEffect(init, [mockDB])

    const search = (query) => {

        setSearchQuery(query)
        if (query === '') {
            init()
            return
        }
        const searchResult = mockDB.search(query, 0, itemsPerPage)
        setPageData(searchResult)
        setNumPages(Math.ceil(mockDB.getCurrLength() / itemsPerPage))
    }
    
    const change = (nth) => {
        let start = nth * itemsPerPage
        let end = start + itemsPerPage
        setPageData(searchQuery === '' ? mockDB.slice(start, end) : mockDB.search(searchQuery, start, end))
    }

    const click = (row) => {
        setOpenData(DB.filter(rec => rec.id === row.id)[0])
        setShow(true)
    }
    
    const sort = (option) => {
        console.log(option)
        mockDB.sort(option.key, option.order)
        init()
    }
    
    const filter = (str) => {
        console.log(str)
    }

    return <div className='mb-3' >
        <TickTable
            data={populate(pageData)}
            headers = {headers}
            name={name}
            numPages={numPages}
            onSearch = {search}
            onPageChange = {change}
            onRowClick={click}
            onSort={sort}
            onFilter={filter}
        />

        <Detail 
            openData={openData} 
            show={show}
            onHide={() => setShow(false)}
        />
    </div>
}
