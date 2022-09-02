type Expertise = "IT" | "DEE" | "ME"

export class UpdateUserInfoDto {
    public email!: string;
    public name!: string;
    public phone?: string;
    public birthday?: Date;
    public expertise!: Expertise
    public departmentId!: number

    public setEmail(email?: string) {
        if (!email || email.length === 0)
            throw new Error("Email required !")
        this.email = email
        return this
    }
    public setName(name?: string) {
        if (!name || name.length === 0)
            throw new Error("Name required !")
        this.name = name
        return this
    }
    public setPhone(phone?: string) {
        this.phone = phone
        return this
    }
    public setBirthday(birthday?: Date) {
        this.birthday = birthday
        return this
    }
    public setExpertise(expertise?: Expertise) {
        if (!expertise || expertise.length === 0)
            throw new Error("Expertise required !")
        this.expertise = expertise
        return this
    }
    public setDepartmentId(departmentId?: number) {
        if (!departmentId)
            throw new Error("Expertise required !")
        this.departmentId = departmentId
        return this
    }
}

