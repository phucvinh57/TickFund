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
			{data.map(item =>
				<tr key={shortKey()}
					onClick={() => {
						onRowClick(item)
					}}
					className={onRowClick ? 'hover' : ''}
				>
					{associations.map((association) => {
						return <td key={shortKey()} >
							{
								isObject(item[association]) ?
									item[association].component
									: item[association]
							}
						</td>
					})}
				</tr>
			)}
		</tbody>
	</table>
}