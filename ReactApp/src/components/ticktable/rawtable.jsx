import { useMemo } from "react"
import { shortKey, isObject } from "../../utils"

export default function RawTable({ headers, data, onRowClick }) {
	const associations = useMemo(() => {
		return headers.map(header => header.association)
	}, [headers])
	return <table className='w-100 styled-table mt-2'>
		{/* Render header */}
		<thead>
			<tr>
				{headers.map((header, idx) => {
					return <th key={header.label} className={idx === headers.length - 1 ? 'text-end' : ''}>
						{header.label}
					</th>
				})}
			</tr>
		</thead>

		{/* Render data */}
		<tbody>
			{data.map((item, idx) =>
				<tr key={shortKey()}
					onClick={onRowClick ? () => {
						onRowClick(idx)
					} : null}
					className={onRowClick ? 'hover' : ''}
				>
					{associations.map((association, idx) => {
						return <td key={shortKey()} className={idx === headers.length - 1 ? 'text-end' : ''}>
							{
								isObject(item[association.key]) ?
									item[association.key].component
									: item[association.key]
							}
						</td>
					})}
				</tr>
			)}
		</tbody>
	</table>
}