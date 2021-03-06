import TickTable from "../ticktable"
import { Row, Col, Form, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import { removeAccents, reduceValuesToString, multiFilter } from "../../utils"
import AccountDetail from "./accountDetail"
import { ACTIVE_STR, INACTIVE_STR, MEMBER_ROLE_STR, EMPTY_AVATAR, EXIST_ACCOUNT_ERROR } from "../../resource"

export default function AccountTable({roles, DB, setDB}){
    function populateTable(accounts, roles) {
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
                        <Form.Select 
                            defaultValue={acc.role}
                            onChange={e => {
                                handleSave({...acc, role: e.target.value})
                            }}
                            onClick={e => {
                                e.stopPropagation()
                            }}>
                            {
                                roles.map(role => <option key={role}>
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
    
    const departments = [
        'IT',
        'C?? kh??',
        '??i???n ??i???n t???'
    ]
    
    const headers = [{
        label: 'T??n th??nh vi??n',
        association: {
            key: 'name',
            type: 'select',
            options: DB.map(acc => acc.name)
        },
        sortable: false
    }, {
        label: 'B??? ph???n',
        association: {
            key: 'department',
            type: 'select',
            options: departments
        },
        sortable: false
    }, {
        label: 'Vai tr??',
        association: {
            key: 'role',
            type: 'select',
            options: roles
        },
        sortable: false
    }, {
        label: 'Tr???ng th??i',
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
        department: 'IT',
        role: MEMBER_ROLE_STR,
        active: true,
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
        if(DB.find(ele => ele.accountName === newAcc.accountName)){
            alert(EXIST_ACCOUNT_ERROR)
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
            return removeAccents(reduceValuesToString(populateTable([acc], roles)))
            .replaceAll(' ', '')
            .toLowerCase()
            .match(str)})

        setAccounts(matchedAccount)
    }

    function handleFilter(filterOptions){
        const filteredAccounts = multiFilter(DB, filterOptions)
        setAccounts(filteredAccounts)
    }

    return(
        <div>
            <Row className='mb-4'>
                <Col>
                    <h4>Danh s??ch t??i kho???n</h4>
                </Col>
                <Col className='col-auto'>
                    <Button onClick={() => setShowAccount(EMPTY_ACCOUNT)}> Th??m t??i kho???n </Button>
                </Col>
            </Row>
            <TickTable
                data={populateTable(accounts, roles)}
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


