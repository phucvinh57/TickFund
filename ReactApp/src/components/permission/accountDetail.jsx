import { Modal, Button, Row, Col, InputGroup, FormControl, Form} from "react-bootstrap"
import { useRef, useState, useEffect } from "react";
import { ACTIVE_STR, INACTIVE_STR } from "../../resource";
import { MEMBER_ROLE_STR} from "../../resource";

export default function AccountDetail({show, handleClose, handleSave, init, departments, roles, handleAdd}){

    const [account, setAccount] = useState(init)
    const [isChange, setIsChange] = useState(false)

    const hiddenImgInput = useRef(null);

    useEffect(() => {
        JSON.stringify(init) !== JSON.stringify(account) 
            ? setIsChange(true)
            : setIsChange(false)
    }, [init, account]);

    useEffect(() => {
        if(!roles.includes(account.role)){
            setAccount({...account, role: MEMBER_ROLE_STR})
        }
    });

    function handleImgChange(event){
        const url = URL.createObjectURL(event.target.files[0]);
        console.log(url)
        const newAccount = {
            ...account,
            img: url
        }
        console.log(newAccount)
        setAccount(newAccount)
    }

    function changeImg(){
        hiddenImgInput.current.click();
    }

    function setProperty(obj){
        setAccount({...account, ...obj})
    }

    return(
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header>
            <Modal.Title>Tài khoản</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={e => {
                    e.preventDefault()
                    init.accountName ? handleSave(account) : handleAdd(account)
                }}>
                    <Row className='justify-content-center'>
                        <Col className='col-2 text-center'>
                            <img className='img-fluid circle-border mb-2' src={account.img} style={{aspectRatio: '1/1'}}></img>
                        </Col>
                        <Col>
                            <p className='my-0 fw-bold'>@{account.accountName}</p>
                            <p><span className={`badge rounded-pill ${account.active ? 'bg-success' : 'bg-danger'}`}>{account.active ? ACTIVE_STR : INACTIVE_STR}</span></p>
                            <Col className='d-flex'>
                                <Button variant='outline-primary me-3' size='sm' onClick={changeImg}>Đổi ảnh đại diện</Button>
                                <input
                                    type='file'
                                    accept='image/*'
                                    ref={hiddenImgInput}
                                    onChange={handleImgChange}
                                    style={{display: 'none'}}
                                />
                                
                                <Button variant='outline-primary me-3' size='sm' onClick={changeImg}>Đổi mật khẩu</Button>
                            </Col>
                        </Col>
                        <Col className='col-auto'>
                            {
                                account.active ? 
                                <Button variant='outline-danger' 
                                    onClick={() => {
                                        // handleSave({...account, active: false})
                                        setProperty({active: false})
                                    }}>Vô hiệu hóa tài khoản</Button>
                                :
                                <Button variant='outline-success' 
                                    onClick={() => {
                                        // handleSave({...account, active: true})
                                        setProperty({active: true})
                                    }}>Kích hoạt tài khoản</Button>
                            }
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Tên tài khoản</InputGroup.Text>
                                <FormControl required readOnly={init.accountName} value={account.accountName ? account.accountName : ''} onChange={e => setProperty({accountName: e.target.value})} />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Họ và tên</InputGroup.Text>
                                <FormControl required value={account.name} onChange={e => setProperty({name: e.target.value})}/>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Ngày sinh</InputGroup.Text>
                                <FormControl type='date' value={account.dob ? account.dob.toISOString().split('T')[0] : ''}
                                    onChange={e => setProperty({dob: new Date(e.target.value)})} />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Email</InputGroup.Text>
                                <FormControl type='email' value={account.email} onChange={e => setProperty({email: e.target.value})}/>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Số điện thoại</InputGroup.Text>
                                <FormControl type='text' pattern='\d*' value={account.phone} onChange={e => setProperty({phone: e.target.value})}/>
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Link Facebook</InputGroup.Text>
                                <FormControl value={account.facebookLink} onChange={e => setProperty({facebookLink: e.target.value})}/>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Bộ phận</InputGroup.Text>
                                <Form.Select 
                                    className="form-select" 
                                    onChange={e => setProperty({department: e.target.value})}
                                    defaultValue={account.department}>
                                    {
                                        departments.map(dp => <option key={dp}>
                                            {dp}
                                        </option>)
                                    }
                                </Form.Select>
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Vai trò</InputGroup.Text>
                                <Form.Select 
                                    defaultValue={roles.includes(account.role) ? account.role : MEMBER_ROLE_STR}
                                    onChange={e => setProperty({role: e.target.value})}>
                                    {
                                        roles.map(role => <option key={role}>
                                            {role}
                                        </option>)
                                    }
                                </Form.Select>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Button variant='primary' 
                        type='submit'
                        disabled={!isChange}>
                        {init.accountName ? 'Lưu thay đổi' : 'Thêm tài khoản'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}