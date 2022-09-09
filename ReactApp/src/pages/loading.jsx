import { useEffect } from "react"
import { useState } from "react"

export function LoadingPage() {
    const [numberOfDots, setNumberOfDots] = useState(1)
    useEffect(() => {
        let timeoutId
        if (numberOfDots === 3)
            timeoutId = setTimeout(() => setNumberOfDots(1), 800)
        else
            timeoutId = setTimeout(() => setNumberOfDots(numberOfDots + 1), 500)
        return () => clearTimeout(timeoutId)
    }, [numberOfDots])

    return <div className="d-flex flex-column align-items-center justify-content-between position-absolute top-50 start-50 translate-middle mb-5">
        <img src="/logoTL.png" alt="Loading image" width={350} className="zoom-in-zoom-out" />
        <h3 className="text-secondary">Loading data {".".repeat(numberOfDots)}</h3>
    </div>
}