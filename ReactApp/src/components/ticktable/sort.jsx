import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'

export default function Sort({ onSort, fields }) {
    const [sortOption, setSortOption] = useState(fields.length !== 0 ? {
        association: fields[0].association,
        order: 'desc'
    } : null)
    return <div className='col-auto d-flex border-left'>
        <div className='me-2'>
            <Form.Select
                value={sortOption.association} size='sm'
                onChange={e => setSortOption({
                    ...sortOption,
                    association: fields.find(field => field.association === e.target.value).association
                })}
            >
                {fields.map(field => <option
                    key={field.association}
                    value={field.association}
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