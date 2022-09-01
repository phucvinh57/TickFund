import { compare } from "bcrypt";
import { FieldPacket, RowDataPacket } from "mysql2";
import { dbQuery } from "../database";
import UserDto from "../dtos/user.dto";

export const validateUser = async (loginDto: UserDto): Promise<string | null> => {
    const [queryResult]: [RowDataPacket[], FieldPacket[]] = await dbQuery(
        `SELECT ID, email, password FROM account WHERE email = ?`,
        [loginDto.email]
    )

    if (queryResult.length === 0) return null

    if (!await compare(loginDto.password, queryResult[0].password))
        return null
        
    return queryResult[0].ID
}