import { useEffect } from "react"
import { useState } from "react"

export function LoadingPage() {
    const [numberOfDots, setNumberOfDots] = useState(1)
    useEffect(() => {
        if(numberOfDots === 3) 
            setTimeout(() => setNumberOfDots(1), 800)
        else
            setTimeout(() => setNumberOfDots(numberOfDots + 1), 500)
        console.log(numberOfDots)
    }, [numberOfDots])

    return <div className="d-flex flex-column align-items-center justify-content-between position-absolute top-50 start-50 translate-middle mb-5">
        <img src="/logoTL.png" alt="Loading image" width={350} className="zoom-in-zoom-out"/>
        <h3 className="text-gray">Loading data {".".repeat(numberOfDots)}</h3>
    </div>
}