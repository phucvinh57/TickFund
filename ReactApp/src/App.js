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
import Fab from "./components/fab"
import { BagPlus, BookmarkPlus, CartPlus } from "react-bootstrap-icons"
import { useState } from "react"
import PlanningModal from "./components/planning/modal"
import AddTransactionModal from "./components/transactions/createTransactionModal"
import User from "./pages/Personal"
import CategoryModal from "./components/category/CategoryModal"

const Main = styled.div`
  transition: 0.3s;
`;

export default function App() {
  const collapse = useSelector(state => state.sidebar.collapse)

  const [showTransaction, setShowTransaction] = useState(false)
  const [showPlanning, setShowPlanning] = useState(false)
  const [showCategory, setShowCategory] = useState(false)

  const actions = [
    { label: "Danh mục", icon: <BookmarkPlus size={25} />, onClick: () => setShowCategory(true), color: "#00a8ff" },
    { label: "Dự trù", icon: <CartPlus size={25} />, onClick: () => setShowPlanning(true), color: "#00a8ff" },
    { label: "Giao dịch", icon: <BagPlus size={25} />, onClick: () => setShowTransaction(true), color: "#00a8ff" },
  ]

  return <div>
    <Sidebar />
    <Main style={{ marginLeft: collapse ? '80px' : '270px' }}>
      <div className="container-fluid p-4">
        <Routes>
          <Route path='/' element={<Navigate to='/stat/donut' />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/plannings" element={<Planning />} />
          <Route path="/stat/*" element={<Statistic />} />
          <Route path='/permission' element={<Permission />} />
          <Route path="/log" element={<Log />} />
          <Route path="/personal" element={<User />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </Main>
    <Fab actions={actions} />
    <AddTransactionModal
      show={showTransaction}
      onHide={() => setShowTransaction(false)}
    />
    <PlanningModal
      show={showPlanning}
      onHide={() => setShowPlanning(false)}
      mode='add'
    />
    <CategoryModal
      show={showCategory}
      onHide={() => setShowCategory(false)}
    />
  </div>
}
