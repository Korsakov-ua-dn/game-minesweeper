import React, { useEffect, useRef, useState }  from "react";
import styled from "styled-components";
import { variables } from "../../utils/variables";
import { useSelector, useDispatch } from "react-redux";
import { viewLoseTC } from "../../store/reducers/game-reducer";
import Bid from "./Bid";

const Timer = () => {
    const dispatch = useDispatch();
    const timer = useSelector(s => s.game.gameParams.timer);
    const endTime = useRef(new Date().getTime() + timer*1000*60) // конвертирую минуты в ms

    const [minutes, setMinutes] = useState(Math.floor(timer));
    const [seconds, setSeconds] = useState(Math.floor(timer*60 % 60));
    
    useEffect(() => {
        const t = endTime.current - new Date().getTime()

        const minutes = Math.floor( t/1000/60 );
        const seconds = Math.floor( t/1000 % 60 ); // получаю остаток от деления
       
        if (minutes + seconds < 0) dispatch(viewLoseTC())
        else setTimeout(() => {
            setMinutes(minutes)
            setSeconds(seconds)
        }, 1000)

    }, [minutes, seconds, dispatch])

    const classN = `${minutes === 0 && seconds < 31 ? "dangerous" : ""}`

    return (
        <StyledTimer className="timer">
            <span>{minutes > 9 ? minutes : `0${minutes}`}</span>
            <Bid/>
            <span className={classN}>{seconds > 9 ? seconds : `0${seconds}`}</span>
        </StyledTimer>
    )
}

export default React.memo(Timer);

const StyledTimer = styled.div`
&.timer {
    max-width: calc(500 * 100vh / 868);
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    & span {
        font-size: 36px;
        font-weight: 700;
    }

    & .dangerous {
        color: ${variables.accentColor}
    }
}
`