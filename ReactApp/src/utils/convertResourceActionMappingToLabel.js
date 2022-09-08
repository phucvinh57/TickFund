const CREATE = "CREATE"
const DISABLE = "DISABLE"
const READ = "READ"
const UPDATE = "UPDATE"
const DELETE = "DELETE"
const translateActionName = {
    [CREATE]: "Tạo",
    [DISABLE]: "Vô hiệu hóa",
    [DELETE]: "Xóa",
    [READ]: "Xem",
    [UPDATE]: "Chỉnh sửa"
}

export const convertResourceActionMappingToLabel = function(resourceName, actionName) {
    return translateActionName[actionName] + 
        " " + resourceName.charAt(0).toLowerCase() + resourceName.slice(1);
}

