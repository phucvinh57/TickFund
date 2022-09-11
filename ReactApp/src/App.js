import Sidebar from "./components/sidebar"
import { Routes, Route, Navigate } from 'react-router-dom'
import styled from "styled-components"
import { useSelector } from "react-redux"

import Log from "./pages/log"
import Transactions from "./pages/transactions"

import Statistic from "./pages/statistic"
import Planning from "./pages/planning"
import NotFound from "./pages/notFound"
import Fab from "./components/fab"
import { Coin, PiggyBank, Tags } from "react-bootstrap-icons"
import { useState } from "react"
import AddTransactionModal from "./components/transactions/createTransactionModal"

import { CategoryModal } from "./components/category/categoryModal"
import Personal from "./pages/personal"
import ManageUser from "./pages/manageUsers"
import { AddPlanningModal } from "./components/planning/addPlanningModal"

const Main = styled.div`
  transition: 0.3s;
  margin-bottom: 60px;
`;

export default function App() {
  const collapse = useSelector(state => state.sidebar.collapse)

  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false)
  const [showAddPlanningModal, setShowAddPlanningModal] = useState(false)
  const [showManageCategoryModal, setShowManageCategoryModal] = useState(false)

  const actions = [{
    label: "Danh mục",
    icon: <Tags size={25} />,
    onClick: () => setShowManageCategoryModal(true),
    color: "#343a40"
  }, {
    label: "Dự trù",
    icon: <PiggyBank size={25} />,
    onClick: () => setShowAddPlanningModal(true),
    color: "#343a40"
  }, {
    label: "Giao dịch",
    icon: <Coin size={25} />,
    onClick: () => setShowAddTransactionModal(true),
    color: "#343a40"
  }]

  return <div>
    <Sidebar />
    <Main style={{ marginLeft: collapse ? '80px' : '270px' }}>
      <div className="container-fluid p-4">
        <Routes>
          <Route path='/' element={<Navigate to='/stat/line' />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/plannings" element={<Planning />} />
          <Route path="/stat/*" element={<Statistic />} />

          <Route path="/manager" element={<ManageUser />} />
          <Route path="/log" element={<Log />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </Main>
    <Fab actions={actions} />
    <AddTransactionModal
      show={showAddTransactionModal}
      onHide={() => setShowAddTransactionModal(false)}
    />
    <AddPlanningModal
      show={showAddPlanningModal}
      onHide={() => setShowAddPlanningModal(false)}
      mode='add'
    />
    <CategoryModal
      show={showManageCategoryModal}
      onHide={() => setShowManageCategoryModal(false)}
    />
  </div>
}
