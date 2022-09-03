import { useMemo } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { InputGroup, FormControl, Form, Button, Toast, ToastContainer, Badge } from "react-bootstrap"
import DateRangePicker from "react-bootstrap-daterangepicker"
import { Funnel, TerminalPlus, Trash, XCircle } from "react-bootstrap-icons"
import ReactPaginate from "react-paginate"
import { BETWEEN, getOperators } from "../../../constants/compareOperator"
import { PAGE_SIZE } from "../../../constants/pageSettings"
import { shortKey } from "../../../utils"
import RawTable from "./rawTable"

export function TickTableV2({
  tableName,
  componentSize,
  headers,
  data,
  numPages,

  defaultSortField,
  onQuery,
  onRowClick
}) {
  const sortableFields = useMemo(() => {
    const fields = headers.filter(header => header.sort === true)
    if(fields.length === 0) throw new Error("Must have at least a sort field")
    return fields
  }, [headers])

  const defaultConditions = useMemo(() => {
    let sortKey = null
    if (defaultSortField) sortKey = defaultSortField
    else if (sortableFields.length > 0) sortKey = sortableFields[0].association.key
    return {
      search: '',
      sort: {
        key: sortKey,
        order: 'desc'
      },
      filter: {
        combineLogic: 'AND',
        // { lhs: { key, type }, operator, rhs }
        items: []
      },
      slice: {
        pageNumber: 1,
        pageSize: PAGE_SIZE
      }
    }
  }, [sortableFields, defaultSortField])
  const [conditions, setConditions] = useState(defaultConditions)

  const [filters, setFilters] = useState([])

  // Using useEffect to change condition on table base on filter
  useEffect(() => {
    // Convert filter state to condition.filter
    const filterValues = filters.map(filter => ({
      lhs: {
        key: filter.association.key,
        type: filter.association.type
      },
      operator: filter.operator,
      rhs: filter.rhs
    }))
    setConditions({
      ...conditions,
      filter: {
        ...conditions.filter,
        items: filterValues
      }
    })
  }, [filters])

  const filterRules = useMemo(() => {
    const list = headers.reduce((rules, header) => {
      if (header.filter === true) {
        let defaultRhsValue = ''
        const operator = getOperators(header.association.type)[0]
        if (header.association.type === "select") {
          defaultRhsValue = header.association.options[0].value
        } else if (operator === BETWEEN) {
          defaultRhsValue = { upperbound: '', lowerbound: '' }
        }

        let filterRule = {
          ...header,
          operator,
          rhs: defaultRhsValue
        }

        delete filterRule.sort
        delete filterRule.filter

        rules.push(filterRule)
      }
      return rules
    }, [])
    if(list.length === 0) throw new Error("Must at least a filterable field !")
    return list
  }, [headers])

  const usedFieldKeyForFiltering = useMemo(() => {
    return filters.map(filter => filter.association.key)
  }, [filters])

  const [showFilter, setShowFilter] = useState(false)

  const setSearch = event => setConditions({
    ...conditions,
    search: event.target.value
  })

  const setSortField = event => setConditions({
    ...conditions,
    sort: { ...conditions.sort, key: event.target.value }
  })

  const setSortOrder = event => setConditions({
    ...conditions,
    sort: { ...conditions.sort, order: event.target.value }
  })

  const setFilterCombineLogic = event => setConditions({
    ...conditions,
    filter: { ...conditions.filter, combineLogic: event.target.value }
  })

  const addFilter = () => {
    if (usedFieldKeyForFiltering.length === filterRules.length) {
      return
    }
    const filterRule = filterRules.find(rule => !usedFieldKeyForFiltering.includes(rule.association.key))
    setFilters([...filters, { ...filterRule, id: shortKey() }])
  }

  const removeFilter = (fieldKey) => {
    const copyFilters = [...filters]
    const filterItemIndex = copyFilters.findIndex(filter => filter.association.key === fieldKey)
    copyFilters.splice(filterItemIndex, 1)
    setFilters(copyFilters)
  }

  const setFilterItemLhs = (oldFieldKey, newFieldKey) => {
    const copyFilters = [...filters]
    const filter = copyFilters.find(value => value.association.key === oldFieldKey)
    const newFilter = filterRules.find(value => value.association.key === newFieldKey)

    Object.assign(filter, newFilter)
    setFilters(copyFilters)
  }

  const setFilterItemOperator = (fieldKey, operator) => {
    const copyFilters = [...filters]
    const filter = copyFilters.find(value => value.association.key === fieldKey)
    filter.operator = operator
    filter.rhs = operator === BETWEEN ? { upperbound: '', lowerbound: '' } : ''
    setFilters(copyFilters)
  }

  const setFilterItemRhs = (fieldKey, value) => {
    const copyFilters = [...filters]
    const filter = copyFilters.find(value => value.association.key === fieldKey)
    filter.rhs = value
    setFilters(copyFilters)
  }

  const setPageSlice = pageNumber => {
    const newConditions = { ...conditions, slice: { ...conditions.slice, pageNumber } }
    setConditions(newConditions)
    onQuery(newConditions)
  }

  const [currentApplyingFilterNumber, setCurrentApplyingFilterNumber] = useState(0)

  return <div>
    <h4>{tableName}</h4>

    <div className="row align-items-center justify-content-between">
      {/* Search form */}
      <div className="col">
        <InputGroup size={componentSize}>
          <FormControl
            value={conditions.search}
            onChange={setSearch}
            placeholder='Search ...'
            onKeyDown={e => { e.key === 'Enter' && onQuery(conditions) }}
          />
        </InputGroup>
      </div>

      {/* Sort form */}
      {<div className="col-auto">
        <div className='col-auto d-flex'>
          <div className='me-2'>
            <Form.Select
              value={conditions.sort.key} size={componentSize}
              onChange={setSortField}
            >
              {sortableFields.map(field => <option
                key={field.association.key}
                value={field.association.key}
              >
                {field.label}
              </option>)}

            </Form.Select>
          </div>

          <div className='me-2'>
            <Form.Select
              value={conditions.sort.order} size={componentSize}
              onChange={setSortOrder}>
              <option value="asc">Tăng</option>
              <option value="desc">Giảm</option>
            </Form.Select>
          </div>
          <div>
            <Button size={componentSize} onClick={() => onQuery(conditions)}>
              Sắp xếp
            </Button>
          </div>
        </div>
      </div>}

      {/* Filter button */}
      <div className='col-auto'>
        <Button size={componentSize | 'md'} className="position-relative" onClick={() => setShowFilter(!showFilter)}>
          <Funnel size={18} />
          {currentApplyingFilterNumber > 0 && <Badge
            className="position-absolute top-0 start-100 translate-middle rounded-pill"
            bg="danger">{currentApplyingFilterNumber}
          </Badge>}
        </Button>
      </div>

      {/* Clear condition button of table */}
      <div className='col-auto ps-0'>
        <XCircle
          onClick={() => {
            setConditions(defaultConditions)
            setFilters([])
            setCurrentApplyingFilterNumber(0)
            if (onQuery) onQuery(defaultConditions)
          }}
          size={18} className="hover outline-danger"
        />
      </div>
    </div>

    {/* Filter engine */}
    <div className="mt-2 d-flex justify-content-end">
      <ToastContainer className="position-absolute zdrop bg-white rounded">
        <Toast
          show={showFilter}
          onClose={() => setShowFilter(false)}
          position='top-end'
          style={{ width: FILTER_WIDTH }}
        >
          <Toast.Header>
            <strong className="me-auto">Define your filter</strong>
            <div>
              <Form.Select size="sm" value={conditions.filter.combineLogic} onChange={setFilterCombineLogic}>
                <option value={'AND'}>Phù hợp tất cả</option>
                <option value={'OR'}>Thoả mãn một trong</option>
              </Form.Select>
            </div>
          </Toast.Header>
          <Toast.Body>
            {filters.length === 0 ? <i className="text-muted">Add your own filter ...</i>
              : filters.map(filter => {
                return <div className="row align-items-center mb-2" key={filter.id}>

                  {/* Left hand side */}
                  <Form.Group className="col">
                    <Form.Select
                      value={filter.association.key} size='sm'
                      onChange={e => setFilterItemLhs(filter.association.key, e.target.value)}
                    >
                      <option value={filter.association.key}>{filter.label}</option>
                      {filterRules.reduce((options, rule) => {
                        if (!usedFieldKeyForFiltering.includes(rule.association.key)) {
                          options.push(
                            <option key={rule.association.key} value={rule.association.key}>
                              {rule.label}
                            </option>
                          )
                        }
                        return options
                      }, [])}
                    </Form.Select>
                  </Form.Group>

                  {/* Expression: equal, unequal, less than ... */}
                  <Form.Group className="col-auto">
                    <Form.Select
                      defaultValue={filter.operator} size='sm'
                      onChange={e => setFilterItemOperator(filter.association.key, e.target.value)}
                    >
                      {getOperators(filter.association.type).map(op =>
                        <option key={op}>
                          {op}
                        </option>)}
                    </Form.Select>
                  </Form.Group>

                  {/* Right hand side value */}
                  <Form.Group className="col-auto">
                    {filter.association.type === 'select' && <Form.Select value={filter.rhs} size='sm'
                      onChange={e => setFilterItemRhs(filter.association.key, e.target.value)}
                    >
                      {filter.association.options.map(option => {
                        return <option value={option.value} key={option.value}>
                          {option.label}
                        </option>
                      })}
                    </Form.Select>}

                    {
                      filter.association.type === 'number'
                      && (filter.operator !== BETWEEN ? <Form.Control
                        type={filter.association.type} value={filter.rhs} size='sm'
                        onChange={e => setFilterItemRhs(filter.association.key, e.target.value)}
                      /> : <div className="d-flex align-items-center">
                        <Form.Control
                          className="me-1"
                          style={{ width: RANGE_INPUT_WIDTH }}
                          type={filter.association.type}
                          value={filter.rhs.lowerbound}
                          onChange={e => setFilterItemRhs(filter.association.key, {
                            ...filter.rhs,
                            lowerbound: e.target.value
                          })}
                          size="sm"
                          width={100}
                        />
                        {" to "}
                        <Form.Control
                          className="ms-1"
                          style={{ width: RANGE_INPUT_WIDTH }}
                          type={filter.association.type}
                          value={filter.rhs.upperbound}
                          onChange={e => setFilterItemRhs(filter.association.key, {
                            ...filter.rhs,
                            upperbound: e.target.value
                          })}
                          size="sm"
                          width={100}
                        />
                      </div>)
                    }
                    {filter.association.type === 'date' && <DateRangePicker>
                      <input type="text" className="form-control" />
                    </DateRangePicker>}
                  </Form.Group>

                  {/* Remove filter button */}
                  <div className="col-auto ps-0">
                    <Trash size={20} className='hover'
                      onClick={() => removeFilter(filter.association.key)}
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

              <Button size='sm' onClick={() => {
                setCurrentApplyingFilterNumber(filters.length)
                if (onQuery) onQuery(conditions)
                setShowFilter(false)
              }}>
                Apply
              </Button>
            </div>

          </Toast.Body>
        </Toast>
      </ToastContainer >
    </div>

    <RawTable onRowClick={onRowClick} headers={headers} data={data} />
    {data.length === 0 && <div
      className="d-flex justify-content-center py-5"
      style={{ borderBottom: '1px solid #343a40' }}
    >
      <h5 className="text-muted">No data available</h5>
    </div>}

    {/* Pagination */}
    {data.length !== 0 && <div className='d-flex justify-content-center mt-2'>
      <ReactPaginate
        nextLabel='>'
        previousLabel='<'
        pageCount={numPages}
        renderOnZeroPageCount={null}
        onPageChange={e => setPageSlice(e.selected)}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}

        // style display
        breakClassName="page-item"
        breakLinkClassName="page-link"
        breakLabel='...'
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
      />
    </div>}
  </div>
}

const FILTER_WIDTH = '550px';
const RANGE_INPUT_WIDTH = '100px'