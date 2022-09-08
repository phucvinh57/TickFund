import { compare } from "bcrypt";
import { FieldPacket, RowDataPacket } from "mysql2";
import { dbQuery } from "../database";
import { LoginDto } from "../dtos";

export const validateUser = async (loginDto: LoginDto): Promise<string | null> => {
    const [queryResult]: [RowDataPacket[], FieldPacket[]] = await dbQuery(
        `SELECT ID, email, password FROM account WHERE email = ?`,
        [loginDto.email]
    );

    if (queryResult.length === 0) return null
    if (queryResult[0].password === null) return null

    if (!await compare(loginDto.password, queryResult[0].password))
        return null

    return queryResult[0].ID
}