import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent } from 'react-pro-sidebar'
import { Link } from 'react-router-dom'
import { House, Speedometer2, BarChartLine, PieChart, List, GraphUp,ShieldLock, JournalText, Tags } from 'react-bootstrap-icons'
import { useDispatch, useSelector } from 'react-redux';
import { setCollapse } from '../redux/slice/sidebar';
import styled from 'styled-components'

const SidebarHeaderContent = styled.div`
    padding: 14px 25px; 
    text-transform: uppercase; 
    font-weight: 600; 
    font-size: 14px; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    white-space: nowrap;
`;

const sidebarStyle = {
    position: 'fixed',
    left: 0,
    top: 0
}

export default function Sidebar() {
    const collapse = useSelector(state => state.sidebar.collapse)
    const dispatch = useDispatch()

    return <ProSidebar style={sidebarStyle} collapsed={collapse}>
        <SidebarHeader className='text-light'>
            <SidebarHeaderContent className='d-inline-flex align-items-center'>
                <List
                    className='fw-bold hover me-3' size={25}
                    onClick={() => dispatch(setCollapse(!collapse))}
                />
                {!collapse && <span>TickFund</span>}
            </SidebarHeaderContent>

        </SidebarHeader>
        <SidebarContent>
            <Menu iconShape="circle">
                {sidebarContent.map(content => visitItem(content))}
            </Menu>
        </SidebarContent>
    </ProSidebar>;
}

function visitItem(node) {
    return node.children ? <SubMenu icon={node.icon} title={node.title} key={node.title}>{
        node.children.map(child => visitItem(child))
    }</SubMenu>
        : <MenuItem icon={node.icon} key={node.title}>
            {/* {node.title} */}
            <Link to={node.path}>{node.title}</Link>
        </MenuItem>
}

const sidebarContent = [{
    icon: <House size={18} />,
    title: 'Trang chủ',
    path: '/home'
}, {
    icon: <Speedometer2 size={18} />,
    title: 'Thống kê',
    children: [{
        icon: <PieChart size={18} />,
        title: 'Biểu đồ tròn',
        path: '/stat/donut'
    }, {
        icon: <BarChartLine size={18} />,
        title: 'Biểu đồ cột',
        path: '/stat/bar'
    }, {
        icon: <GraphUp size={18} />,
        title: 'Biểu đồ đường',
        path: '/stat/line'
    }]
}, {
    icon: <ShieldLock size={18}/>,
    title: 'Quyền truy cập',
    path: '/permission'
}, {
    icon: <JournalText size={18}/>,
    title: 'Nhật ký hệ thống',
    path: '/log'
}, {
    icon: <Tags size={18} />,
    title: "Giao dịch",
    path: '/transaction'
}]