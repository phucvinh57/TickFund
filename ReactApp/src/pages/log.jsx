import TickTable from "../components/ticktable";
import { House } from "react-bootstrap-icons"

export default function Log() {
    return <div>
        <TickTable
            data={data}
            headers={headers}
            name="Nhật ký hệ thống"
            numPages={20}
            onSearch={str => console.log(str)}
            onPageChange={pageNum => console.log(pageNum)}
            onRowClick={row => console.log(row)}
            onSort={sortOption => console.log(sortOption)}
            onFilter={filter => console.log(filter)}
        />
    </div>
}

const headers = [{
    label: 'Mã giao dịch',
    association: {
        key: 'transactionID',
        type: 'text'
    },
    sortable: false
}, {
    label: 'Thời gian',
    association: {
        key: 'time',
        type: 'datetime-local'
    },
    sortable: true
}, {
    label: 'Số tiền',
    association: {
        key: 'amount',
        type: 'number'
    },
    sortable: true
}, {
    label: 'Danh mục',
    association: {
        key: 'category',
        type: 'text'
    },
    sortable: false
}]

const data = [{
    transactionID: '121342',
    time: new Date().toISOString().slice(0, 19).replace('T', ' ').replaceAll('-', '/'),
    amount: 500000,
    category: {
        val: 'Tiền nhà',
        component: <div className='d-flex align-items-center justify-content-end'>
            <House size={18} className='me-2' />Tiền nhà
        </div>
    }
}, {
    transactionID: '121342',
    time: new Date().toISOString().slice(0, 19).replace('T', ' ').replaceAll('-', '/'),
    amount: 500000,
    category: {
        val: 'Tiền nhà',
        component: <div className='d-flex align-items-center justify-content-end'>
            <House size={18} className='me-2' />Tiền nhà
        </div>
    }
}, {
    transactionID: '121342',
    time: new Date().toISOString().slice(0, 19).replace('T', ' ').replaceAll('-', '/'),
    amount: 500000,
    category: {
        val: 'Tiền nhà',
        component: <div className='d-flex align-items-center justify-content-end'>
            <House size={18} className='me-2' />Tiền nhà
        </div>
    }
}, {
    transactionID: '121342',
    time: new Date().toISOString().slice(0, 19).replace('T', ' ').replaceAll('-', '/'),
    amount: 500000,
    category: {
        val: 'Tiền nhà',
        component: <div className='d-flex align-items-center justify-content-end'>
            <House size={18} className='me-2' />Tiền nhà
        </div>
    }
}, {
    transactionID: '121342',
    time: new Date().toISOString().slice(0, 19).replace('T', ' ').replaceAll('-', '/'),
    amount: 500000,
    category: {
        val: 'Tiền nhà',
        component: <div className='d-flex align-items-center justify-content-end'>
            <House size={18} className='me-2' />Tiền nhà
        </div>
    }
}, {
    transactionID: '121342',
    time: new Date().toISOString().slice(0, 19).replace('T', ' ').replaceAll('-', '/'),
    amount: 500000,
    category: {
        val: 'Tiền nhà',
        component: <div className='d-flex align-items-center justify-content-end'>
            <House size={18} className='me-2' />Tiền nhà
        </div>
    }
}]