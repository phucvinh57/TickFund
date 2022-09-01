import { useState } from "react"
import { useEffect } from "react"
import authService from "./services/auth.service"
import { useDispatch, useSelector } from "react-redux"
import { userService } from "./services/user.service"
import { initUser } from "./redux/slice/user"
import { useMemo } from "react"

export default function Protector({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const isLoading = useMemo(() => !user || !isLoggedIn, [user, isLoggedIn])

    useEffect(() => {
        authService.checkIfLoggedIn(window.location.href).then(response => {
            userService.getInfoAndRole().then(response => {
                dispatch(initUser(response.data))
            })
            if (response.data.code) setIsLoggedIn(true)
        }).catch(err => {
            const redirectURL = err.response.data.redirect_url
            if (redirectURL) {
                window.location.href = redirectURL
                return
            }
        })
    }, [])
    return <div>
        {isLoading ? <div>Is loading ...</div> : children}
    </div>
}