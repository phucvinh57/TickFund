import { useState } from "react"
import { useEffect } from "react"
import authService from "./services/auth.service"
import { useDispatch, useSelector } from "react-redux"
import { personalService } from "./services/personal.service"
import { initPersonal } from "./redux/slice/personal"
import { useMemo } from "react"
import { initUsers } from "./redux/slice/users"

export default function Protector({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const user = useSelector(state => state.personal)
  const dispatch = useDispatch()

  const isLoading = useMemo(() => !user || !isLoggedIn, [user, isLoggedIn])

  useEffect(() => {
    authService.checkIfLoggedIn(window.location.href).then(response => {
      personalService.getInfoAndRole().then(response => {
        dispatch(initPersonal(response.data))
        dispatch(initUsers(fakeUsers))
      })
      if (response.data.code) setIsLoggedIn(true)
    }).catch(err => {
      const redirectURL = err.response.data.redirect_url
      if (redirectURL) {
        window.location.href = redirectURL
        return
      }
    })
  }, [dispatch])
  return <div>
    {isLoading ? <div>Is loading ...</div> : children}
  </div>
}

const fakeUsers = [
    {
        "ID": "1915940",
        "name": "Nguyễn Phúc Vinh",
        "username": "vinh.np",
        "avatarUrl": "https://scontent-sin6-3.xx.fbcdn.net/",
        "expertise": "IT",
        "role": {
            "ID": 1,
            "name": "admin"
        },
        "active": true,
        "department": {
            "ID": 2,
            "name": "Ban Nghiên cứu Khoa học"
        }
    },
    {
        "ID": "nhancdt",
        "name": "Cu Do Thanh Nhan",
        "username": "cudothanhnhan",
        "avatarUrl": null,
        "expertise": "IT",
        "role": {
            "ID": 1,
            "name": "admin"
        },
        "active": true,
        "department": {
            "ID": 2,
            "name": "Ban Nghiên cứu Khoa học"
        }
    }
]