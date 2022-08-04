
import React  from "react";
import Popup from "../common/Popup";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { variables } from "../../utils/variables";
import { nextRound } from "../../store/reducers/game-reducer";

const YouWinPopup = () => {
    const dispatch = useDispatch();
    const isWinView = useSelector(s => s.game.isWinView);

    if (!isWinView) return;

    const nextRoundHandler = () => dispatch(nextRound())

    return (
        <Popup>
            <StyledContent className='win'>
                 <span className="win__title">Ты победил!</span>
                 <button onClick={nextRoundHandler} className="win__btn">Следующий уровень</button>
            </StyledContent>
        </Popup>
    )
};

export default React.memo(YouWinPopup);

const StyledContent = styled.div`

&.win {
    max-width: 330px;
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    
}

& .win__title {
    font-size: 36px;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: ${variables.blueColor}
}

& .win__btn {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: ${variables.blueColor}
}
`