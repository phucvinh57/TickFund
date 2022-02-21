import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent } from 'react-pro-sidebar'
import { Link } from 'react-router-dom'
import { House, GraphUpArrow, BarChartLine, PieChart } from 'react-bootstrap-icons'

export default function Sidebar({ collapse }) {
    return <ProSidebar style={{ height: '100vh' }} collapsed={collapse}>
        <SidebarHeader>
            TickFund
        </SidebarHeader>
        <SidebarContent>
            <Menu iconShape="circle">
                {sidebarContent.map(content => visitItem(content))}
            </Menu>
        </SidebarContent>
        {/* <SidebarFooter>
            <Menu>
                
            </Menu>
        </SidebarFooter> */}
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
    icon: <GraphUpArrow size={18} />,
    title: 'Thống kê',
    children: [{
        icon: <PieChart size={18} />,
        title: 'Biểu đồ tròn',
        path: '/statistic/donut'
    }, {
        icon: <BarChartLine size={18} />,
        title: 'Biểu đồ cột',
        path: '/statistic/bar'
    }]
}]