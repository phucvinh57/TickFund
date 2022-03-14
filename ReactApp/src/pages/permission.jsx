import { Container } from "react-bootstrap";
import PermissionCheckCard from "../components/permission/permissionCheckCard";
const init = [
    {
        resource: 'Tài khoản',
        actions: [
            {name: 'Tạo tài khoản', valid: true},
            {name: 'Chỉnh sửa thông tin tài khoản', valid: false},
            {name: 'Vô hiệu hóa tài khoản', valid: true}
        ] 
    },
    {
        resource: 'Nhóm quyền',
        actions: [
            {name: 'Chỉnh sửa các nhóm quyền', valid: true},
            {name: 'Thêm gỡ các tài khoản vào nhóm quyền', valid: true},
        ] 
    },
    {
        resource: 'Giao dịch',
        actions: [
            {name: 'Tạo giao dịch', valid: true},
            {name: 'Vô hiệu hóa giao dịch', valid: true},
            {name: 'Chỉnh sửa ghi chú', valid: true},
            {name: 'Xem thống kê quỹ', valid: true},
            {name: 'Xem thông tin tất cả các giao dịch', valid: true}
        ] 
    },
    {
        resource: 'Dự trù',
        actions: [
            {name: 'Tạo dự trù', valid: true},
            {name: 'Vô hiệu hóa dự trù', valid: true},
            {name: 'Giải quyết dự trù', valid: true},
            {name: 'Xem thông tin tất cả dự trù', valid: true}
        ] 
    },
    {
        resource: 'Yêu cầu giải ngân/đóng góp',
        actions: [
            {name: 'Tạo yêu cầu giải ngân/đóng góp', valid: true},
            {name: 'Vô hiệu hóa yêu cầu giải ngân/đóng góp', valid: true},
            {name: 'Xét duyệt yêu cầu giải ngân/đóng góp', valid: true},
            {name: 'Xem thông tin tất cả các yêu cầu giải ngân đóng góp', valid: true}
        ] 
    }
]
export default function Permission(){
    return(
        <Container>
            <h4>Chỉnh sửa quyền truy cập</h4>
            <PermissionCheckCard init={init} role={'Quản trị viên'}/>
            <PermissionCheckCard init={init} role={'Thành viên'}/>
        </Container>
    )
}