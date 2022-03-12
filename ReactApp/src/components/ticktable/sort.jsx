import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'

export default function Sort({ onSort, fields }) {
    const [sortOption, setSortOption] = useState({
        key: fields[0].association.key,
        order: 'desc'
    })
    return <div className='col-auto d-flex border-left'>
        <div className='me-2'>
            <Form.Select
                value={sortOption.key} size='sm'
                onChange={e => setSortOption({
                    ...sortOption,
                    key: fields.find(field => field.association.key === e.target.value).association.key
                })}
            >
                {fields.map(field => <option
                    key={field.association.key}
                    value={field.association.key}
                >
                    {field.label}
                </option>)}
            </Form.Select>
        </div>

        <div className='me-2'>
            <Form.Select
                value={sortOption.order} size='sm'
                onChange={e => setSortOption({ ...sortOption, order: e.target.value })}>
                <option value="inc">Tăng</option>
                <option value="desc">Giảm</option>
            </Form.Select>
        </div>
        <div>
            <Button size='sm' onClick={() => onSort(sortOption)}>
                Sắp xếp
            </Button>
        </div>
    </div>
}