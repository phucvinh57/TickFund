export const userService = {
    getInfoAndRole: async function () {
        return { data: mockUserInfoAndRole }
    }
}

const mockUserInfoAndRole = {
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