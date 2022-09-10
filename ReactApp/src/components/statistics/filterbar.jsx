import { useState, useEffect, useMemo } from "react";
import { ButtonGroup, Form, FormGroup, Button } from "react-bootstrap";
import DateRangePicker from 'react-bootstrap-daterangepicker'

export default function FilterBar({ onFilter }) {
    const [interval, setInterval] = useState('month')
    const [start, setStartDate] = useState(null)
    const [end, setEndDate] = useState(new Date())

    const initSetting = useMemo(() => ({
        startDate: (new Date(new Date().getFullYear(), 0, 1)).toLocaleDateString(),
        endDate: new Date().toLocaleDateString()
    }))
    useEffect(() => {
        onFilter({
            interval: interval,
            start: start ? start : new Date(end.getFullYear(), 0, 1),
            end: end
        })
    }, [start, end, interval])
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
                    variant={interval === radio.value ? "primary" : "outline-primary"}
                    value={interval}
                    onClick={e => setInterval(radio.value)}
                >
                    {radio.name}
                </Button>)}
            </ButtonGroup>
            <FormGroup style={{ width: '210px' }}>
                <DateRangePicker
                    initialSettings={initSetting}
                    onCallback={(start, end, label) => {
                        start = new Date(start.year(), start.month(), start.date())
                        end = new Date(end.year(), end.month(), end.date())
                        setStartDate(start)
                        setEndDate(end)
                    }}
                    format={"dd-MM-yyyy"}
                >
                    <input type="text" className="form-control" />
                </DateRangePicker>
            </FormGroup>
        </div>
    </div>
}

const radioSet = [
    {
        name: 'Ngày',
        value: 'day'
    },
    {
        name: 'Tuần',
        value: 'week'
    }, {
        name: 'Tháng',
        value: 'month'
    }, {
        name: 'Năm',
        value: 'year'
    }
]