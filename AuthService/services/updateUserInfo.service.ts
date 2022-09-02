import { dbQuery } from "../database"
import { UpdateUserInfoDto } from "../dtos"

export const updateUserInfo = async function (dto: UpdateUserInfoDto, userId: string) {
    return dbQuery(`UPDATE account SET
            email = ?,
            name = ?,
            phone = ?,
            expertise = ?,
            department_id = ?,
            birthday = ?
        WHERE ID = ?
    `, [dto.email, dto.name, dto.phone, dto.expertise, dto.departmentId, dto.birthday, userId])
}