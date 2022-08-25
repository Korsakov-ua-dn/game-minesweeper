import { useMemo } from "react";
import { useEffect, useRef } from "react";
import {Howl, Howler} from 'howler';

export const useTick = () => {

  const tick = useMemo(() => new Howl({
    src: ["tick.mp3"],
    // volume: 1,
    loop: true,
    // html5: true,
  }), [])

  const boom = useMemo(() => new Howl({
    src: ["boom.mp3"],
    // volume: 1,
    // loop: true,
    // html5: true,
  }), [])

  return { tick, boom }
};

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

// export const useTick = () => {
    
//   const tick = useMemo(() => {
//     const audio = new Audio();
//     audio.src = "/tick.mp3";
//     // audio.muted = true;
//     audio.loop = true;
//     // audio.playbackRate = 1.13;
//     return audio;
//   }, []);

//   const boom = useMemo(() => {
//     const audio = new Audio();
//     audio.src = "/boom.mp3";
//     return audio;
//   }, []);

//   return { tick, boom }
// };
