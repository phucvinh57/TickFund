import { useState } from "react";
import { ButtonGroup, Form, FormGroup, Button } from "react-bootstrap";
import DateRangePicker from 'react-bootstrap-daterangepicker'

export default function FilterBar() {
    const [filter, setFilter] = useState(0)

    return <div className="d-flex justify-content-between">
        <FormGroup className='col-auto'>
            <Form.Select defaultValue={1}>
                <option value={0}>Không tính dự trù</option>
                <option value={1}>Có tính dự trù</option>
            </Form.Select>
        </FormGroup>

        <div className="d-inline-flex">
            <ButtonGroup className="me-3">
                {radioSet.map(radio => <Button
                    key={radio.value}
                    type="radio"
                    variant="primary"
                    value={filter}
                    checked={filter === radio.value}
                    onChange={e => setFilter(e.currentTarget.value)}
                >
                    {radio.name}
                </Button>)}
            </ButtonGroup>
            <FormGroup style={{ width: '210px' }}>
                <DateRangePicker onCallback={(start, end, label) => {
                    console.log(start, end, label)
                }}>
                    <input type="text" className="form-control" />
                </DateRangePicker>
            </FormGroup>
        </div>
    </div>
}

const radioSet = [{
    name: 'Tuần',
    value: 0
}, {
    name: 'Tháng',
    value: 1
}, {
    name: 'Quý',
    value: 2
}]