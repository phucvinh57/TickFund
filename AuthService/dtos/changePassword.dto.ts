export class ChangePasswordDto {
    public readonly oldPass: string;
    public readonly newPass: string;
    public readonly confirmNewPass: string;

    constructor(oldPass: string |undefined, newPass: string |undefined, confirmNewPass: string |undefined) {
        if (!oldPass || !newPass || !confirmNewPass) {
            throw new Error("Missing some required fields !")
        }
        if (oldPass.length === 0 || newPass.length === 0 || confirmNewPass.length === 0) {
            throw new Error("Missing some required fields !")
        }
        if(confirmNewPass !== newPass) {
            throw new Error("Wrong password confirmation !")
        }
        this.oldPass = oldPass
        this.newPass = newPass
        this.confirmNewPass = confirmNewPass
    }
}