import { useState } from "react"
import { useEffect } from "react"
import authService from "./services/auth.service"

export default function Protector({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        authService.checkIfLoggedIn(window.location.href).then(response => {
            // If TFService response a redirect
            if(response.data.code) setIsLoggedIn(true)
        }).catch(err => {
            const redirectURL = err.response.data.redirect_url
            // alert(redirectURL)
            if(redirectURL) {
                window.location.href = redirectURL
                return
            }
        })
    }, [])
    return <div>
        {isLoggedIn && children}
    </div>
}