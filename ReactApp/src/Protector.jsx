import { useState } from "react"
import { useEffect } from "react"
import authService from "./services/auth.service"

export default function Protector({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    useEffect(() => {
        authService.checkIfLoggedIn().then(response => {
            if(response.data.redirect) {
                window.location.href = response.data.redirect
                return
            }
            setIsLoggedIn(true)
        }).catch(err => {
            console.log(err.response)
        })
    }, [])
    return <div>
        {isLoggedIn && children}
    </div>
}