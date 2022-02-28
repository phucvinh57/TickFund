import { Sparklines, SparklinesLine } from "react-sparklines"
import faker from "faker"

export default function Overviews() {
    return <div className="row m-0 p-0 mt-2">
        <Overview title='Thu' data={incomeData} color='green' />
        <Overview title='Chi' data={expenseData} color='red' />
        <Overview
            title='Tổng quỹ'
            data={subTwoArrays(incomeData, expenseData)}
            color='blue'
        />
    </div>
}

function Overview({ title, data, color }) {
    return <div className='col m-2 border border-1 rounded-3 ps-3 py-3 pe-0'>
        <div className="row w-100 align-items-end">
            <div className="col-6">
                <h5>{title}</h5>
                <span className="fw-bold fs-5">
                    {format(data.reduce((prev, curr) => prev + curr))} VND
                </span>
            </div>
            <div className="col-6 p-0">
                <Sparklines data={data}>
                    <SparklinesLine color={color} />
                </Sparklines>
            </div>
        </div>
        <div className="fst-italic mt-2">Giảm 12% so với tháng trước</div>
    </div>
}

function subTwoArrays(arr1, arr2) {
    return arr1.map((i1, idx) => i1 - arr2[idx])
}

// Create our number formatter.
const format = number => String(number).replace(/(.)(?=(\d{3})+$)/g,'$1,')

const incomeData = [...Array(12).keys()].map(() => faker.datatype.number({ min: 10000, max: 20000 }))
const expenseData = [...Array(12).keys()].map(() => faker.datatype.number({ min: 5000, max: 20000 }))