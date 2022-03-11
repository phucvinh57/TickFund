import { Toast, Button, ToastContainer, Form } from "react-bootstrap";
import { useMemo, useState } from "react";
import { shortKey } from "../../utils";
import { TerminalPlus, Trash } from "react-bootstrap-icons";

const initFilter = () => ({
    type: '',
    association: '',
    label: '',
    operator: '',
    comparedValue: '',
    id: shortKey()
})

export default function Filter({ onFilter, fields, show, onHide }) {
    const [filters, setFilters] = useState([initFilter()])

    const filterFields = useMemo(() => {
        const list = fields.map(field => {
            let filterField = {
                ...field,
                operator: '',
                comparedValue: ''
            }
            delete filterField.sortable
            return filterField
        })
        return list
    }, [fields])

    const setFilterComparison = (id, key, value) => {
        const newFilter = [...filters]
        let filter = newFilter.find(f => f.id === id)
        filter[key] = value
        setFilters(newFilter)
    }

    const removeFilter = id => {
        const newFilter = [...filters]
        const idx = newFilter.findIndex(f => f.id === id)
        newFilter.splice(idx, 1)
        setFilters(newFilter)
    }

    const addFilter = () => {
        const newFilter = [...filters]
        newFilter.push(initFilter())
        setFilters(newFilter)
    }

    return <ToastContainer className="position-absolute zdrop bg-white rounded">
        <Toast show={show} onClose={onHide} position='top-end' style={{ width: '600px' }}>
            <Toast.Header>
                <strong className="me-auto">Define your filter</strong>
            </Toast.Header>
            <Toast.Body>
                {filters.map(filter => {
                    return <div className="row align-items-center mb-2" key={shortKey()}>
                        <Form.Group className="col">
                            <Form.Select
                                value={filter.association} size='sm'
                                onChange={e => setFilterComparison(filter.id, 'association', e.target.value)}
                            >
                                {filterFields.map(val => <option key={shortKey()} value={val.association}>
                                    {val.label}
                                </option>)}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="col-auto">
                            <Form.Select
                                value={filter.operator} size='sm'
                                onChange={e => setFilterComparison(filter.id, 'operator', e.target.value)}
                            >
                                {operators.map(op => <option key={shortKey()}>{op}</option>)}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="col-auto">
                            <Form.Control
                                type={'text'} value={filter.comparedValue} size='sm'
                                onChange={e => setFilterComparison(filter.id, 'comparedValue', e.target.value)}
                            />
                        </Form.Group>
                        <div className="col-auto ps-0">
                            <Trash size={20} className='hover'
                                onClick={() => removeFilter(filter.id)}
                            />
                        </div>
                    </div>
                })}
                <hr className="my-2" />
                <div className="d-flex justify-content-between align-items-center">
                    <span>
                        <TerminalPlus size={25} className='hover' 
                            onClick={addFilter}
                        />
                    </span>
                    <Button size='sm' onClick={() => onFilter(filters)} >
                        Apply
                    </Button>
                </div>
            </Toast.Body>
        </Toast>
    </ToastContainer>
}

const operators = ['LT', 'GT', 'EQ', 'UNEQ', 'LTE', 'GTE']