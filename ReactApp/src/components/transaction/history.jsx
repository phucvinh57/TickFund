import React from 'react';
// import { Button, Row, Col, ListGroup, ButtonGroup} from "react-bootstrap"
import TickTable from '../ticktable';
import { prettyDate } from '../../utils';

const pages = 10
const category = [
    {
        name: "Quỹ Lab",
        type: "Thu"
    },
    {
        name: "Tiền nhà",
        type: "Chi"
    },
    {
        name: "Tiền nước",
        type: "Chi"
    }
]
const data = [
    {
        id: '123456',
        time: prettyDate(new Date()),
        money: '250000 đ',
        category: category[0].type + " " + category[0].name
    },
    {
        id: '123456',
        time: prettyDate(new Date()),
        money: '250000 đ',
        category: category[1].type + " " + category[1].name
    },
    {
        id: '123456',
        time: prettyDate(new Date()),
        money: '250000 đ',
        category: category[2].type + " " + category[2].name
    },
    {
        id: '123456',
        time: prettyDate(new Date()),
        money: '250000 đ',
        category: category[0].type + " " + category[0].name
    },
    {
        id: '123456',
        time: prettyDate(new Date()),
        money: '250000 đ',
        category: category[1].type + " " + category[1].name
    },
    {
        id: '123456',
        time: prettyDate(new Date()),
        money: '250000 đ',
        category: category[2].type + " " + category[2].name
    },
    {
        id: '123456',
        time: prettyDate(new Date()),
        money: '250000 đ',
        category: category[0].type + " " + category[0].name
    },
    {
        id: '123456',
        time: prettyDate(new Date()),
        money: '250000 đ',
        category: category[1].type + " " + category[1].name
    },
    {
        id: '123456',
        time: prettyDate(new Date()),
        money: '250000 đ',
        category: category[2].type + " " + category[2].name
    },
    {
        id: '123456',
        time: prettyDate(new Date()),
        money: '250000 đ',
        category: category[0].type + " " + category[0].name
    }
]

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

const name = "Giao dịch"

export default function History() {
    const search = (str) => {
        console.log(str)
    }
    
    const change = (str) => {
        console.log(str)
    }
    
    const click = (str) => {
        console.log(str)
    }
    
    const sort = (str) => {
        console.log(str)
    }
    
    const filter = (str) => {
        console.log(str)
    }

    return <div >
        <TickTable
            data={data}
            headers = {headers}
            name={name}
            numPages={pages}
            onSearch = {search}
            onPageChange = {change}
            onRowClick={click}
            onSort={sort}
            onFilter={filter}
        />
    </div>
}
