import Sidebar from "./components/sidebar"
import { Routes, Route, Navigate } from 'react-router-dom'
import styled from "styled-components"
import { useSelector } from "react-redux"

import Permission from "./pages/permission"
import Log from "./pages/log"
import Transactions from "./pages/transactions"

import Statistic from "./pages/statistic"
import Planning from "./pages/planning"
import NotFound from "./pages/notFound"

const Main = styled.div`
  transition: 0.3s;
`;

export default function App() {
  const collapse = useSelector(state => state.sidebar.collapse)
  return <div>
    <Sidebar />
    <Main style={{ marginLeft: collapse ? '80px' : '270px' }}>
      <div className="container-fluid p-4">
        <Routes>
          <Route path='/' element={<Navigate to='/stat/donut' />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/plannings" element={<Planning />} />
          <Route path="/stat/*" element={<Statistic />} />
          <Route path='/permission' element={<Permission/>} />
          <Route path="/log" element={<Log />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </Main>
  </div>
}
