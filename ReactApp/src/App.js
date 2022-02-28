import Sidebar from "./components/sidebar"
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Statistic from "./pages/statistic"
import styled from "styled-components"
import { useSelector } from "react-redux"

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
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path="/stat/*" element={<Statistic />} />
        </Routes>
      </div>
    </Main>
  </div>
}
