import { shortKey } from "../utils/utils"

export const roleService = {
    getPermission: async function() {
        return mockRoles
    }
}

const mockRoles = [{
    ID: shortKey(),
    name: "Admin",
    resources: mockResources
}]

const mockResources = [{
    ID: 1,
    name: "Tài khoản",
    actions: [{
        ID: shortKey(),
        name: "Tạo tài khoản",
        permit: true
    }, {
        ID: shortKey(),
        name: "Chỉnh sửa thông tin tài khoản",
        permit: true
    }, {
        ID: shortKey(),
        name: "Vô hiệu hóa tài khoản",
        permit: false
    }, {
        ID: shortKey(),
        name: "Gán quyền cho tài khoản",
        permit: true
    }]
}, {
    ID: 2,
    name: "Nhóm quyền",
    actions: [{
        ID: shortKey(),
        name: "Tạo nhóm quyền",
        permit: true
    }, {
        ID: shortKey(),
        name: "Chỉnh sửa các nhóm quyền",
        permit: true
    }, {
        ID: shortKey(),
        name: "Xóa các nhóm quyền",
        permit: true
    }, {
        ID: shortKey(),
        name: "Xem các nhóm quyền",
        permit: true
    }]
}, {
    ID: 3,
    name: "Giao dịch",
    actions: [{
        ID: shortKey(),
        name: "Tạo giao dịch",
        permit: true
    }, {
        ID: shortKey(),
        name: "Vô hiệu hóa giao dịch",
        permit: true
    }]
}, {
    ID: 4,
    name: "Dự trù",
    actions: [{
        ID: shortKey(),
        name: "Tạo/Chỉnh sửa dự trù",
        permit: true
    }, {
        ID: shortKey(),
        name: "Xóa dự trù",
        permit: true
    }]
}]