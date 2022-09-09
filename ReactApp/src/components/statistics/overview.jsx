import { Sparklines, SparklinesLine } from "react-sparklines"
import { calcFundTotalLineData, genInRangeDataSetWithMissing, reduceRecordByTime } from "../../utils/chartutils"
import { dateToString, prettyNumber } from "../../utils"

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
function calcTotalIncome(records){
    // console.log(records)
    return records
            .filter(r =>  r.category_type === 'income')
            .reduce((prev, cur) => prev + cur.sum, 0)
}

function calcTotalExpense(records){
    return records
            .filter(r =>  r.category_type === 'expense')
            .reduce((prev, cur) => prev + cur.sum, 0)
}

function calcTotalFund(records, prevBalance){
    return records
            .reduce((prev, cur) => prev + (cur.category_type == 'income' ? cur.sum : - cur.sum), prevBalance)
}

export default function Overviews({transactions, filter, prevBalance = 0}) {
    return <div className="row m-0 p-0 mt-2">
        <Overview 
            title= 'Thu'
            subtitle = {getSubTitle(filter)}
            data={genData(filter, transactions.filter(t => t.category_type === 'income'))} 
            color='green'
            overviewNum={calcTotalIncome(transactions)} />
        <Overview 
            title='Chi'
            subtitle={getSubTitle(filter)}
            data={genData(filter, transactions.filter(t => t.category_type === 'expense'))} 
            color='red'
            overviewNum={calcTotalExpense(transactions)} />
        <Overview
            title='Tổng quỹ'
            subtitle={getSubTitle(filter) + ` - Tổng quỹ trước ${filter ? dateToString(filter.start) : ''} là: ${prettyNumber(prevBalance)} VNĐ`}
            data={calcFundTotalLineData(
                    genData(filter, transactions.filter(t => t.category_type === 'income')),
                    genData(filter, transactions.filter(t => t.category_type === 'expense'))
                    ,prevBalance)}
            color='blue'
            overviewNum={calcTotalFund(transactions, prevBalance)}
        />
    </div>
}

function Overview({ title, subtitle, data, color, overviewNum = 0 }) {
    return <div className='col m-2 border border-1 rounded-3 ps-3 py-3 pe-0'>
        <div className="row w-100 align-items-end">
            <div className="col-6">
                <h5>{title}</h5>
                <span className="fw-bold fs-5">
                    {prettyNumber(overviewNum)} VND
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