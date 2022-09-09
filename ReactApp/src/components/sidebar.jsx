import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar'
import { Link } from 'react-router-dom'
import { Speedometer2, BarChartLine, PieChart, List, GraphUp, JournalText, Coin, PiggyBank, InfoCircle, People, BoxArrowRight, ShieldCheck } from 'react-bootstrap-icons'
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
        <SidebarFooter>
            <Menu><SubMenu icon={<InfoCircle size={18} />} title={"Tài khoản"}>
                <MenuItem icon={<People size={18} />}>
                    <Link to={"/personal"}>Thông tin cá nhân</Link>
                </MenuItem>
                <MenuItem icon={<BoxArrowRight size={18} />}>
                    <a href={"https://facebook.com"}>Đăng xuất</a>
                </MenuItem>
            </SubMenu></Menu>
        </SidebarFooter>
    </ProSidebar>;
}

function visitItem(node) {
    return node.children ? <SubMenu icon={node.icon} title={node.title} key={node.title}>{
        node.children.map(child => visitItem(child))
    }</SubMenu>
        : <MenuItem icon={node.icon} key={node.title}>
            <Link to={node.path}>{node.title}</Link>
        </MenuItem>
}

const sidebarContent = [
    {
        icon: <Speedometer2 size={18} />,
        title: 'Thống kê',
        children: [{
            icon: <PieChart size={18} />,
            title: 'Biểu đồ tròn',
            path: '/stat/donut'
        }, 
        // {
        //     icon: <BarChartLine size={18} />,
        //     title: 'Biểu đồ cột',
        //     path: '/stat/bar'
        // }, 
        {
            icon: <GraphUp size={18} />,
            title: 'Biểu đồ đường',
            path: '/stat/line'
        }]
    }, {
        icon: <Coin size={18} />,
        title: "Giao dịch",
        path: '/transactions'
    }, {
        icon: <PiggyBank size={18} />,
        title: "Dự trù",
        path: '/plannings'
    }, {
        icon: <ShieldCheck size={18} />,
        title: 'Quản lý tài khoản',
        path: '/manager'
    }, {
        icon: <JournalText size={18} />,
        title: 'Nhật ký hệ thống',
        path: '/log'
    }
]