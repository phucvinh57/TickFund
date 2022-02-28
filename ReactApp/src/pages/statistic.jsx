import { Routes, Route } from "react-router-dom"
import FilterBar from "../components/statistics/filterbar"
import LineChart from "../components/statistics/lineChart"
import BarChart from "../components/statistics/barChart"
import PieChart from "../components/statistics/pieChart"
import Overviews from "../components/statistics/overview"

export default function Statistic() {
    return <div>
        <FilterBar />
        <Overviews />
        <Routes>
            <Route path='donut' element={<PieChart />} />
            <Route path='bar' element={<BarChart />} />
            <Route path='line' element={<LineChart />} />
        </Routes>
    </div>
}
