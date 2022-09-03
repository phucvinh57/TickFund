import { shortKey } from "../utils/utils"

export const roleService = {
    getPermission: async function () {
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
        name: "CREATE"
    }, {
        ID: shortKey(),
        name: "UPDATE"
    }, {
        ID: shortKey(),
        name: "DISABLE"
    }]
}, {
    ID: 2,
    name: "Nhóm quyền",
    actions: [{
        ID: shortKey(),
        name: "CREATE"
    }, {
        ID: shortKey(),
        name: "UPDATE"
    }, {
        ID: shortKey(),
        name: "DELETE"
    }, {
        ID: shortKey(),
        name: "READ"
    }]
}, {
    ID: 3,
    name: "Giao dịch",
    actions: [{
        ID: shortKey(),
        name: "CREATE"
    }, {
        ID: shortKey(),
        name: "DISABLE"
    }]
}, {
    ID: 4,
    name: "Dự trù",
    actions: [{
        ID: shortKey(),
        name: "CREATE"
    }, {
        ID: shortKey(),
        name: "UPDATE"
    }, {
        ID: shortKey(),
        name: "DELETE"
    }]
}]