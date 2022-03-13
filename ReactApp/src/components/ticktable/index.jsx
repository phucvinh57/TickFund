import { useMemo, useState } from 'react'
import ReactPaginate from 'react-paginate'
import RawTable from './rawtable'
import SearchBox from './searchbox'
import Sort from './sort'
import Filter from './filter'
import { Button } from 'react-bootstrap'
import { Funnel } from 'react-bootstrap-icons'

export default function TickTable({
	data, headers, name,
	numPages,
	onPageChange,
	onSearch,
	onSort,
	onFilter,
	onRowClick
}) {
	const sortableFields = useMemo(() => {
		return headers.filter(header => header.sortable === true)
	}, [headers])

	const [showFilter, setShowFilter] = useState(false)

	return <div>
		<h4>{name}</h4>
		<div className='row'>
			{/* Form search */}
			<div className='col'>
				<SearchBox onSearch={onSearch} />
			</div>

			{/* Form sort */}
			{sortableFields.length !== 0 ? <Sort onSort={onSort} fields={sortableFields} /> : null}

			{/* Filter button click to show and hide */}
			<div className='col-auto'>
				<Button size='sm' onClick={() => setShowFilter(!showFilter)}>
					<Funnel size={18} />
				</Button>
			</div>
		</div>

		<div className='mt-2 d-flex justify-content-end'>
			<Filter 
				onFilter={onFilter} 
				fields={headers} 
				show={showFilter}
				onHide={() => setShowFilter(false)}
			/>
		</div>

		{/* Render Date */}
		<RawTable
			headers={headers}
			data={data}
			onRowClick={onRowClick}
		/>

		{/* Pagination */}
		<div className='float-end mt-2'>
			<ReactPaginate
				nextLabel='>'
				previousLabel='<'
				pageCount={numPages}
				renderOnZeroPageCount={null}
				onPageChange={e => onPageChange(e.selected)}
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
		</div>
	</div>
}