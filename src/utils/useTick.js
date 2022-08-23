import { useMemo } from "react";
import { useEffect, useRef } from "react";

// export const useTick = () => {
//     const tick = useRef();
//     tick.current = new Audio()
//     tick.current.src = "/tick.mp3"

//     const IntervalRef = useRef();

//    useEffect(() => {
//         IntervalRef.current = setInterval(() => {
//             tick.current.play()
//         }, 1000)
//         return () => clearInterval(IntervalRef.current)
//     },[])

//     return () => clearInterval(IntervalRef.current)
// }

export const useTick = () => {
    
  const tick = useMemo(() => {
    const audio = new Audio();
    audio.src = "/tick.mp3";
    audio.loop = true;
    audio.playbackRate = 1.1;
    return audio;
  }, []);

  const boom = useMemo(() => {
    const audio = new Audio();
    audio.src = "/boom.mp3";
    return audio;
  }, []);

  return { tick, boom }
};
