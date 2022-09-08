import { useState } from "react"
import { useEffect } from "react"
import authService from "./services/auth.service"
import { useDispatch, useSelector } from "react-redux"
import { personalService } from "./services/personal.service"
import { initPersonal } from "./redux/slice/personal"
import { toast } from "react-toastify"
import { LoadingPage } from "./pages/loading"

const LOADING = "LOADING"
const FULFILLED = "FULFILLED"
const REJECTED = "REJECTED"

export default function Protector({ children }) {
  const dispatch = useDispatch()
  const [applicationState, setApplicationState] = useState(LOADING)

  useEffect(() => {
    authService.checkIfLoggedIn(window.location.href).then(response => {
      personalService.getInfoAndRole().then(response => {
        dispatch(initPersonal(response.data))
        setTimeout(() => setApplicationState(FULFILLED), 2000) 
      }).catch(err => {
        toast.error("Error occurs !")
        setApplicationState(REJECTED)
      })
    }).catch(err => {
      setApplicationState(REJECTED)
      const redirectURL = err.response.data.redirect_url
      if (redirectURL) {
        window.location.href = redirectURL
        return
      }
    })
  }, [dispatch])
  return <div>
    {applicationState === LOADING && <LoadingPage />}
    {applicationState === FULFILLED && children}
    {applicationState === REJECTED && <div>Cannot connect to server</div>}
  </div>
}