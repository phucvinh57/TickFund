import { freeze } from '@reduxjs/toolkit'
import React, {useEffect, useState} from 'react'
import { Card, Ratio, Button, InputGroup, FormControl, Row, Col, Form, ModalBody, Modal  } from 'react-bootstrap'
import { PencilSquare, Search, Trash } from 'react-bootstrap-icons'
import { removeAccents } from '../../utils'


const CardsHolder = (props) => (
    <div className="cards-holder p-2">
    {
        props.cards.map((card, key) => (
            <Card
                text={card.kind == 'Thu' ? 'success' : 'danger'}
                key={key}
                className={"shadow-sm card-item" + (key != 0 ? " ms-4": "")}
            >   
                <Ratio aspectRatio="4x3" >
                    <Card.Img variant='top' src={card.img} />
                </Ratio>
                <Card.Body>
                    <Card.Title>{card.val.split().map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(' ')}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{card.kind}</Card.Subtitle>
                </Card.Body>
            </Card>
        ))
    }
    </div>
)

function SearchBox({ onSearch }) {
    const [query, setQuery] = useState('')

    return <InputGroup>
        <FormControl
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => { e.key === 'Enter' && onSearch(query) }}
            placeholder='Search text ...'
        />
        <Button onClick={() => onSearch(query)}><Search size={18} /></Button>
    </InputGroup>
} 


function FormCategory({show, onHide, onClick}) {
    const init = {
        val: '',
        kind: '',
        img: ''
    }
    const [ isChanged, setIsChanged ] = useState(false)
    const [ category, setCategory ] = useState({...init, img: 'https://picsum.photos/400/300'})

    useEffect(() => {
        const arrInit = Object.values(init)
        const arrCategory = Object.values(category)
        let _isChanged = !(arrInit.some((el, idx) => el == arrCategory[idx]))
        setIsChanged(_isChanged)
        console.log(category)
    })

    const modify = (obj) => {
        setCategory({ ...category, ...obj })
    }

    return <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
             <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Danh mục mới
                </Modal.Title>
            </Modal.Header>
            <ModalBody>
                <Form onSubmit={(event) => {event.preventDefault(); 
                    console.log(isChanged); 
                    if (isChanged) onClick(category);} }>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Loại danh mục</Form.Label>
                            <Form.Select defaultValue="Chọn..." onChange={event => modify({kind: event.target.value})}>
                                <option>Chọn...</option>
                                <option value="Thu">Thu</option>
                                <option value="Chi">Chi</option>  
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Tên danh mục</Form.Label>
                            <Form.Control type="text" placeholder="Tên danh mục" onChange={event => modify({val: event.target.value})}/>
                        </Form.Group>
                    </Row>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </ModalBody>
        </Modal>
}

export default function Category({data}) {
    const [ FormShow, setFormShow ] = useState(false)

    const [ categories, setCategories ] = useState([...data])

    // useEffect(() => setFormShow(FormShow ? true : false))

    const handleChange = (newCategory) => {
        const _categories = categories.some(
            el => removeAccents(newCategory.val).replaceAll(' ', '').toLowerCase() 
              === removeAccents(el.val).replaceAll(' ', '').toLowerCase()) 
        ? categories 
        : [newCategory,
            ...categories
        ]
        setCategories(_categories)
        setFormShow(false)
    }

    return <div className='mb-3'>
        <h4>Danh mục</h4>
        <div className='mb-3'>
            <Button variant="primary" onClick={() => setFormShow(true)}>
                Thêm danh mục
            </Button>

            <FormCategory
                show={FormShow}
                onHide={() => setFormShow(false)}
                onClick={handleChange}
            ></FormCategory>
        </div>
        <CardsHolder cards={categories}/>
    </div>
}