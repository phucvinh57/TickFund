export default class LoginDto {
    public email: string
    public password: string

    constructor(email: string | undefined, password: string | undefined) {
        if(!email || !password || email.length === 0 || password.length === 0) {
            throw new Error("Missing email or password")
        }

        this.email = email
        this.password = password
    }
}