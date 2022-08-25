const MIN_CODE = 100000
const MAX_CODE = 999999

class AuthCodeManager {
    private static authCodes: { [key: number]: string } = {}
    private static CODE_EXPIRES_IN = 500000

    public generateCode(userId: string): number {
        let code: number

        // Handle duplicate code
        do {
            code = Math.floor(Math.random() * (MAX_CODE - MIN_CODE + 1) + MIN_CODE)
        } while (AuthCodeManager.authCodes.hasOwnProperty(code))

        AuthCodeManager.authCodes[code] = userId
        setTimeout(() => {
            delete AuthCodeManager.authCodes[code]
        }, AuthCodeManager.CODE_EXPIRES_IN)

        return code
    }
    public validateCode(code: number): string | undefined {
        return AuthCodeManager.authCodes[code]
    }

    public setCodeExpiresIn(time: number) {
        AuthCodeManager.CODE_EXPIRES_IN = time
    }
}

export const authCodeManager = new AuthCodeManager()

// For testing only
// const code = authCodeManager.generateCode("1915940")
// console.log(code)

// setInterval(() => {
//     console.log(authCodeManager.validateCode(code))
// }, 900)