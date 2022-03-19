import TickTable from "../ticktable"
<<<<<<< HEAD
import { Row, Col, Form } from "react-bootstrap"
import { useState } from "react"
import { removeAccents, reduceValuesToString } from "../../utils"
import AccountDetail from "./accountDetail"
import { ACTIVE_STR, INACTIVE_STR } from "../../resource"
import { shortKey } from "../../utils"

export default function AccountTable() {
    const [showAccount, setShowAccount] = useState(null)
    const [accounts, setAccounts] = useState(DB)
    function handleClose() {
        setShowAccount(null)
    }

    function handleSave(newAcc) {
        const newAccounts = accounts.map(acc => acc.accountName === newAcc.accountName ? newAcc : acc)
        setAccounts(newAccounts)
        setShowAccount(newAcc)
    }

    function onSearch(str) {
        str = removeAccents(str).replaceAll(' ', '').toLowerCase()

        const matchedAccount = DB.filter(acc => {
            return removeAccents(reduceValuesToString(dataFeed([acc], roles)))
                .replaceAll(' ', '')
                .toLowerCase()
                .match(str)
        })
        setAccounts(matchedAccount, roles)
    }

    return (
        <div>
            <TickTable
                data={dataFeed(accounts, roles)}
                headers={headers}
                name='Danh sách tài khoản'
                numPages={Math.ceil(accounts.length / 20)}
                onSearch={onSearch}
                onPageChange={pageNum => console.log(pageNum)}
                onRowClick={row => { setShowAccount(accounts.filter(acc => acc.accountName === row.name.val)[0]) }}
                onSort={sortOption => console.log(sortOption)}
                onFilter={filter => console.log(filter)}
            />

            {
                Boolean(showAccount) ?
                    <AccountDetail
                        departments={departments}
                        roles={roles}
                        init={showAccount}
                        show={true}
                        handleClose={handleClose}
                        handleSave={handleSave} />
                    : <></>
            }


        </div>
    )
=======
import { Row, Col, Form, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import { removeAccents, reduceValuesToString, evalComp } from "../../utils"
import AccountDetail from "./accountDetail"
import { ACTIVE_STR, INACTIVE_STR, MEMBER_ROLE_STR, EMPTY_AVATAR } from "../../resource"
>>>>>>> ea71e029d52783352d0c4f770cad6a5daea2e54a

export default function AccountTable({roles, DB, setDB}){
    function dataFeed(accounts, roles) {
        return accounts.map(acc => (
            {
                accountName: acc.accountName, // For search only, not for rendering
                name: {
                    val: acc.name,
                    component: <div>
                        <Row>
                            <Col className='col-auto d-flex align-items-center'>
                                <div style={{ height: '2.5rem', width: '2.5rem' }}>
                                    <img className='img-fluid circle-border' src={acc.img} style={{ aspectRatio: '1/1' }} alt='img' />
                                </div>
                            </Col>
                            <Col>
                                <Row className='my-0'>
                                    <span className='fw-bold'>{acc.name}</span>
                                </Row>
                                <Row className='my-0'>
                                    <span>@{acc.accountName}</span>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                },
                department: acc.department,
                role: {
                    val: acc.role,
                    component: <div>
<<<<<<< HEAD
                        <Form.Select
                            onChange={e => {
                                const newAccounts = [...accounts]
                                newAccounts[idx] = { ...acc, role: e.target.value }
                                setAccounts(newAccounts)
=======
                        <Form.Select 
                            defaultValue={acc.role}
                            onChange={e => {
                                handleSave({...acc, role: e.target.value})
>>>>>>> ea71e029d52783352d0c4f770cad6a5daea2e54a
                            }}
                            onClick={e => {
                                e.stopPropagation()
                            }}>
                            {
<<<<<<< HEAD
                                roles.map(role => <option key={shortKey()} selected={acc.role === role}>
=======
                                roles.map(role => <option key={role}>
>>>>>>> ea71e029d52783352d0c4f770cad6a5daea2e54a
                                    {role}
                                </option>)
                            }
                        </Form.Select>
                    </div>
                },
                status: {
                    val: acc.active ? ACTIVE_STR : INACTIVE_STR,
                    component:
                        <div className="d-flex align-items-center justify-content-end">
                            <span className={`badge rounded-pill ${acc.active ? 'bg-success' : 'bg-danger'}`}>{acc.active ? ACTIVE_STR : INACTIVE_STR}</span>
                        </div>
                }
            }
        ))
    }
<<<<<<< HEAD
}
const roles = [
    'Quản trị viên',
    'Thành viên',
    'Thủ quỹ'
]

const departments = [
    'IT',
    'Cơ khí',
    'Điện điện tử'
]
var DB = [
    {
        name: 'Cù Đỗ Thanh Nhân',
        accountName: 'cudothanhnhan',
        img: 'https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/245963739_1953900554769951_141450765917909238_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=FBNo7TjeNgMAX87xJhW&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT89fXgxvSYVSBB_-tPg1UzbvObyzznGN0x4oxujMiqxXA&oe=6238F50D',
        department: 'IT',
        role: 'Thủ quỹ',
        active: true,
        dob: new Date('2001-6-1'),
        email: 'email@gmail.com',
        phone: '0915654321',
        facebookLink: 'https://www.facebook.com/'
    },
    {
        name: 'Nguyễn Phúc Vinh',
        accountName: 'nguyenphucvinh',
        img: 'https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/245963739_1953900554769951_141450765917909238_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=FBNo7TjeNgMAX87xJhW&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT89fXgxvSYVSBB_-tPg1UzbvObyzznGN0x4oxujMiqxXA&oe=6238F50D',
=======
    
    const departments = [
        'IT',
        'Cơ khí',
        'Điện điện tử'
    ]
    
    const headers = [{
        label: 'Tên thành viên',
        association: {
            key: 'name',
            type: 'select',
            options: DB.map(acc => acc.name)
        },
        sortable: false
    }, {
        label: 'Bộ phận',
        association: {
            key: 'department',
            type: 'select',
            options: departments
        },
        sortable: false
    }, {
        label: 'Vai trò',
        association: {
            key: 'role',
            type: 'select',
            options: roles
        },
        sortable: false
    }, {
        label: 'Trạng thái',
        association: {
            key: 'status',
            type: 'select',
            options: [ACTIVE_STR, INACTIVE_STR]
        },
        sortable: false
    }]

    const EMPTY_ACCOUNT = {
        
        name: '',
        accountName: null,
        img: EMPTY_AVATAR,
>>>>>>> ea71e029d52783352d0c4f770cad6a5daea2e54a
        department: 'IT',
        role: MEMBER_ROLE_STR,
        active: true,
<<<<<<< HEAD
        dob: new Date('2001-6-1'),
        email: 'email@gmail.com',
        phone: '0915654321',
        facebookLink: 'https://www.facebook.com/'
    },
    {
        name: 'Trần Hà Tuấn Kiệt',
        accountName: 'kiettran',
        img: 'https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/245963739_1953900554769951_141450765917909238_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=FBNo7TjeNgMAX87xJhW&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT89fXgxvSYVSBB_-tPg1UzbvObyzznGN0x4oxujMiqxXA&oe=6238F50D',
        department: 'IT',
        role: 'Thành viên',
        active: false,
        dob: new Date('2001-6-1'),
        email: 'email@gmail.com',
        phone: '0915654321',
        facebookLink: 'https://www.facebook.com/'
    },
]

const headers = [{
    label: 'Tên thành viên',
    association: {
        key: 'name',
        type: 'select',
        options: DB.map(acc => acc.name)
    },
    sortable: false
}, {
    label: 'Bộ phận',
    association: {
        key: 'department',
        type: 'text',
        options: departments
    },
    sortable: false
}, {
    label: 'Vai trò',
    association: {
        key: 'role',
        type: 'select',
        options: roles
    },
    sortable: false
}, {
    label: 'Trạng thái',
    association: {
        key: 'status',
        type: 'select',
        options: [ACTIVE_STR, INACTIVE_STR]
    },
    sortable: false
}]
=======
        dob: null,
        email: '',
        phone: '',
        facebookLink: ''
   
    }

    const [showAccount, setShowAccount] = useState(null)
    const [accounts, setAccounts] = useState(DB)

    useEffect(() => {
        const newAccounts = accounts.map(acc => roles.includes(acc.role) ? acc : {...acc, role: MEMBER_ROLE_STR})
        if(JSON.stringify(newAccounts) !== JSON.stringify(accounts)){
            setAccounts(newAccounts)
        }
    });

    function handleClose(){
        setShowAccount(null)
    }

    function handleAdd(newAcc) {
        if(!newAcc.accountName){
            alert('Tên tài khoản phải được cung cấp')
            return
        }
        else if(DB.find(ele => ele.accountName === newAcc.accountName)){
            alert('Tên tài khoản đã tồn tại')
            return
        }
        setAccounts([...accounts, newAcc])
        setDB([...DB, newAcc])

        setShowAccount(null)
    }

    function handleSave(newAcc){
        const newAccounts = accounts.map(acc => acc.accountName === newAcc.accountName ? newAcc : acc)
        setAccounts(newAccounts)
        
        const newDB = DB.map(acc => acc.accountName === newAcc.accountName ? newAcc : acc)
        setDB(newDB)

        setShowAccount(null)
    }

    function handleSearch(str) {
        str = removeAccents(str).replaceAll(' ', '').toLowerCase()

        const matchedAccount = DB.filter(acc => {
            return removeAccents(reduceValuesToString(dataFeed([acc], roles)))
            .replaceAll(' ', '')
            .toLowerCase()
            .match(str)})

        setAccounts(matchedAccount)
    }

    function handleFilter(filterOptions){
        const OP = filterOptions.logic == 'AND' ? '&&' : '||'
        const initVal = OP === '&&' ? true : false 
        const filteredAccounts = DB.filter(ele => filterOptions.filters.map( option => evalComp(ele, 
                                            option.association.key,
                                            option.operator,
                                            option.comparedValue)).reduce((prev, cur) => eval(`prev ${OP} cur`), initVal))
        setAccounts(filteredAccounts)
    }

    return(
        <div>
            <Row className='mb-4'>
                <Col>
                    <h4>Danh sách tài khoản</h4>
                </Col>
                <Col className='col-auto'>
                    <Button onClick={() => setShowAccount(EMPTY_ACCOUNT)}> Thêm tài khoản </Button>
                </Col>
            </Row>
            <TickTable
                data={dataFeed(accounts, roles)}
                headers={headers}
                numPages={Math.ceil(accounts.length / 20)}
                onSearch={handleSearch}
                onPageChange={pageNum => console.log(pageNum)}
                onRowClick={row => {setShowAccount(accounts.filter(acc => acc.accountName === row.accountName)[0])}}
                onSort={sortOption => console.log(sortOption)}
                onFilter={handleFilter}
            />
            
            {
                Boolean(showAccount) ? 
                <AccountDetail
                    departments={departments}
                    roles={roles}
                    init={showAccount}
                    show={true}
                    handleClose={handleClose}
                    handleSave={handleSave}
                    handleAdd={handleAdd}/>
                :<></>
            }
        </div>
    )
}

>>>>>>> ea71e029d52783352d0c4f770cad6a5daea2e54a

