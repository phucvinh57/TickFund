import { useSelector } from "react-redux"
import { Form } from "react-bootstrap"
import { useState } from "react"
import { useEffect } from "react"
import { ChangeUserPasswordForm } from "../components/user/changeUserPasswordForm"
import { UserInfoForm } from "../components/user/userInfoForm"
import { UserAvatarImage } from "../components/user/userAvatarImage"

export default function User() {
  const user = useSelector(state => state.user)

  const [formInfoData, setFormInfoData] = useState({
    email: "npvinh0507@gmail.com",
    name: "Nguyễn Phúc Vinh",
    avatarUrl: "http://localhost:3002/public/1w5zx9q6asd.jpg",
    phone: "0373395726",
    birthday: "2001-07-05",
    expertise: "IT",
    departmentId: 1
  })

  useEffect(() => {
    setFormInfoData({
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      phone: user.phone,
      birthday: user.birthday,
      expertise: user.expertise,
      departmentId: user.department.ID
    })
  }, [user])

  return <div className="container row">
    <div className="col-4">
      <UserAvatarImage />
    </div>
    <div className="col-8">
      <UserInfoForm />
      <hr />
      <ChangeUserPasswordForm />
    </div>
  </div>
}