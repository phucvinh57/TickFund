// import { useState } from "react"
import Sidebar from "./components/sidebar"
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import { BarChart, PieChart } from "./pages/statistic"
import { useSelector, useDispatch } from 'react-redux'
import { Form } from 'react-bootstrap'
import { setCollapse } from "./redux/slice/sidebar"

export default function App() {
  const sidebarCollapse = useSelector(state => state.sidebar.collapse)
  const dispatch = useDispatch()
  console.log(sidebarCollapse);
  return <div className="">
    <div className="row">
      <div className="col-auto">
        <Sidebar collapse={sidebarCollapse} />
      </div>

      <main className="col">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/statistic/bar' element={<BarChart />} />
          <Route path='/statistic/donut' element={<PieChart />} />
        </Routes>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Check this switch"
          value={sidebarCollapse}
          onChange={() => dispatch(setCollapse(!sidebarCollapse))}
        />
      </main>
    </div>
  </div>
}
