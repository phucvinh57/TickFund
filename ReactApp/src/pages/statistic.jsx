import { Routes, Route } from "react-router-dom"
import FilterBar from "../components/statistics/filterbar"
import LineChart, { compareRecord } from "../components/statistics/lineChart"
import BarChart from "../components/statistics/barChart"
import PieChart from "../components/statistics/pieChart"
import Overviews from "../components/statistics/overview"
import { useState, useEffect } from "react"
import statService from "../services/stat.service"
import { dateToString } from "../utils/utils"
import { Toast } from "react-bootstrap"
import WarnToast from "../components/statistics/warnToast"


export default function Statistic() {
    const [transactions, setTransactions] = useState([])
    const [plannings, setPlannings] = useState([])
    const [filter, setFilter] = useState(null)
    const [prevBalance, setPrevBalance] = useState(0)
    const [showWarn, setShowWarn] = useState(true)

    // useEffect(() => {
    //     statService.getStat
    // }, [])
    function handleOnFilter(newFilter){
        statService
            .getStat(newFilter.start, newFilter.end, newFilter.interval)
            .then(response => {
                console.log(response.data)
                setTransactions(response.data.transactions.sort(compareRecord))
                setPlannings(response.data.plannings.sort(compareRecord))
                setPrevBalance(response.data.previous_amount)
                setFilter(newFilter)
                setShowWarn(true)
            })
    }
    return <div>
        <FilterBar onFilter={handleOnFilter} />
        <Overviews 
            transactions={transactions}
            filter={filter}
            prevBalance={prevBalance} />
        <WarnToast
            filter={filter}
            plannings={plannings}
            show={showWarn}
            setShow={setShowWarn}/>
        <Routes>
            <Route path='donut' element={<PieChart 
                    transactions={transactions}
                    plannings={plannings} />} />
            <Route path='bar' element={<BarChart />} />
            <Route path='line' element={<LineChart
                    title={filter == null ? null : `Biểu đồ đường từ ngày ${dateToString(filter.start)}  đến ${dateToString(filter.end)}`}
                    filter={filter}
                    prevBalance={prevBalance}
                    transactions={transactions} 
                    plannings={plannings} />} />
        </Routes>
    </div>
}
