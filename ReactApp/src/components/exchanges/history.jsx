import React, { useMemo, useState, useEffect } from 'react';
import { MockDatabase } from '../../utils';
// import { Button, Row, Col, ListGroup, ButtonGroup} from "react-bootstrap"
import TickTable from '../ticktable';

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
        label: 'Thời gian',
        association: {
            key: 'time',
            type: 'datetime-local',
        },
        sortable: true
    },  
    {
        label: 'Số tiền',
        association: {
            key: 'money',
            type: 'text',
        },
        sortable: true
    },  
    {
        label: 'Danh mục',
        association: {
            key: 'category',
            type: 'text',
        },
        sortable: true
    }
]

const name = "Lịch sử giao dịch"
const itemsPerPage = 10

export default function History({data}) {

    const [pageData, setPageData] = useState([])
    const [numPages, setNumPages] = useState(0)

    const [searchQuery, setSearchQuery] = useState('')

    const mockDB = useMemo(() => { let db = new MockDatabase(data); db.sort('time', 'dec'); return db}, [data])

    const init = () => {
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
    
    const click = (str) => {
        console.log(str)
    }
    
    const sort = (option) => {
        mockDB.sort(option.key, option.order)
        init()
    }
    
    const filter = (str) => {
        console.log(str)
    }

    return <div className='mb-3' >
        <TickTable
            data={pageData}
            headers = {headers}
            name={name}
            numPages={numPages}
            onSearch = {search}
            onPageChange = {change}
            onRowClick={click}
            onSort={sort}
            onFilter={filter}
        />
    </div>
}
