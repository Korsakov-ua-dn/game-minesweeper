import {useEffect, useRef} from "react";

export const useTick = () => {
    const tick = useRef();
    tick.current = new Audio()
    tick.current.src = "/tick.mp3"

    const IntervalRef = useRef();

   useEffect(() => {
        IntervalRef.current = setInterval(() => {
            tick.current.play()
        }, 1000)
        return () => clearInterval(IntervalRef.current)
    },[])

    return () => clearInterval(IntervalRef.current)
}