import { ssoServiceHTTPCommon } from "./httpCommon"

export const personalService = {
    getInfoAndRole: async function () {
        return { data: mockPersonalInfoAndRole }
    },
    updateAvatar: async function (avatarUrl) {
        return ssoServiceHTTPCommon.put("/personal/avatar", { avatarUrl })
    },
    changePassword: async function (oldPass, newPass, confirmedNewPass) {
        return ssoServiceHTTPCommon.put("/personal/password", {
            oldPass, newPass, confirmedNewPass
        })
    },
    updateInfo: async function(data) {
        return ssoServiceHTTPCommon.put("/personal/info", data)
    }
}

const mockPersonalInfoAndRole = {
    "ID": "1915940",
    "username": "vinh.np",
    "email": "npvinh0507@gmail.com",
    "name": "Nguyễn Phúc Vinh",
    "avatarUrl": "http://localhost:3002/public/1w5zx9q6asd.jpg",
    "phone": "0373395726",
    "birthday": "2001-07-05",
    "expertise": "IT",
    "department": {
        "ID": 1,
        "name": "Ban phát triển dự án"
    },
    "role": {
        "ID": 1,
        "name": "Thủ quỹ",
        "resources": [
            {
                "ID": 1,
                "name": "Giao dịch",
                "actions": [
                    {
                        "ID": 1,
                        "name": "Tạo giao dịch mới",
                        "permit": true
                    }
                ]
            }
        ]
    }
}