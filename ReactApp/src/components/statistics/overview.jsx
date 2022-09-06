import { Sparklines, SparklinesLine } from "react-sparklines"
import faker from "faker"
import { calculateTotal, genInRangeDataSetWithMissing, reduceRecordByTime } from "../../utils/chartutils"
import { dateToString } from "../../utils/utils"

function genData(filter, records){
    if(filter == null){
        return []
    }

    const reducedRecords = reduceRecordByTime(records)

    const fillMissingTime = genInRangeDataSetWithMissing(filter, reducedRecords)
    return fillMissingTime.map(r => r.y)

}
function getSubTitle(filter){
    return filter == null ? '' : `Tính từ ${dateToString(filter.start)} đến ${dateToString(filter.end)} - Không bao gôm dự trù`
}
export default function Overviews({transactions, filter, prevBalance = 0}) {
    return <div className="row m-0 p-0 mt-2">
        <Overview 
            title= 'Thu'
            subtitle = {getSubTitle(filter)}
            data={genData(filter, transactions.filter(t => t.category_type === 'income'))} 
            color='green'
            prevBalance={prevBalance} />
        <Overview 
            title='Chi'
            subtitle={getSubTitle(filter)}
            data={genData(filter, transactions.filter(t => t.category_type === 'expense'))} 
            color='red'
            prevBalance={prevBalance} />
        <Overview
            title='Tổng quỹ'
            subtitle={getSubTitle(filter) + ` - Tổng quỹ trước ${filter ? dateToString(filter.start) : ''} là: ${format(prevBalance)} VNĐ`}
            data={calculateTotal(
                    genData(filter, transactions.filter(t => t.category_type === 'income')),
                    genData(filter, transactions.filter(t => t.category_type === 'expense'))
                    ,prevBalance)}
            color='blue'
            isSum={false}
        />
    </div>
}

function Overview({ title, subtitle, data, color, isSum = true }) {
    return <div className='col m-2 border border-1 rounded-3 ps-3 py-3 pe-0'>
        <div className="row w-100 align-items-end">
            <div className="col-6">
                <h5>{title}</h5>
                <span className="fw-bold fs-5">
                    {(isSum || data.length == 0) ? format(data.reduce((prev, curr) => prev + curr, 0)) : format(data[data.length - 1])} VND
                </span>
            </div>
            <div className="col-6 p-0">
                <Sparklines data={data}>
                    <SparklinesLine color={color} />
                </Sparklines>
            </div>
        </div>
        <div className="fst-italic mt-2">{subtitle}</div>
    </div>
}


// Create our number formatter.
const format = number =>(number < 0 ? '-' : '')  + String(Math.abs(number)).replace(/(.)(?=(\d{3})+$)/g,'$1,')

const incomeData = [...Array(12).keys()].map(() => faker.datatype.number({ min: 10000, max: 20000 }))
const expenseData = [...Array(12).keys()].map(() => faker.datatype.number({ min: 5000, max: 20000 }))