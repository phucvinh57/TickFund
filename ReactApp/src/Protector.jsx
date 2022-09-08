import { useState } from "react"
import { useEffect } from "react"
import authService from "./services/auth.service"
import { useDispatch, useSelector } from "react-redux"
import { personalService } from "./services/personal.service"
import { initPersonal } from "./redux/slice/personal"
import { useMemo } from "react"

export default function Protector({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const user = useSelector(state => state.personal)
  const dispatch = useDispatch()

  const isLoading = useMemo(() => !user || !isLoggedIn, [user, isLoggedIn])

  useEffect(() => {
    authService.checkIfLoggedIn(window.location.href).then(response => {
      personalService.getInfoAndRole().then(response => {
        dispatch(initPersonal(response.data))
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