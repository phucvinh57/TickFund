import React, {useEffect, useState} from 'react'
import { Card, Ratio, Button, InputGroup, FormControl  } from 'react-bootstrap'
import { PencilSquare, Search, Trash } from 'react-bootstrap-icons'
import InitCategory from './initCategory'
import InitTransaction from './initTransaction'
import { data, category } from './sampleData'

const CardsHolder = (props) => (
    <div className="cards-holder p-2">
    {
        props.cards.map((card, key) => (
            <Card
                text={card.type == 'Thu' ? 'success' : 'danger'}
                key={key}
                className={"shadow-sm card-item" + (key != 0 ? " ms-4": "")}
            >   
                <Ratio aspectRatio="4x3" >
                    <Card.Img variant='top' src={card.img} />
                </Ratio>
                <Card.Body>
                    <Card.Title>{card.name.split().map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(' ')}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{card.type}</Card.Subtitle>
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


export default function Category() {
    return <div className='mb-3'>
        <h4>Danh mục</h4>
        <div className='row'>
            <div className='col'>
                <SearchBox onSearch={(str) => console.log(str)}/>
            </div>
            <div className='col-auto'>
                <InitCategory />
            </div>
            <div className='col-auto'>
                <InitTransaction />
            </div>
        </div>
        <CardsHolder cards={category}/>
    </div>
}