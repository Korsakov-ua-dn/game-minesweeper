import React  from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { pressStartTC, setLevel } from "../../store/reducers/game-reducer";
import { variables } from "../../utils/variables";
import Popup from "../common/Popup";

const StartGamePopup = () => {
    const dispatch = useDispatch();
    const isOpenStart = useSelector(s => s.game.isOpenStart);
    const level = useSelector(s => s.game.level);

    if (!isOpenStart) return;

    const fieldSelectionHandler = (e) => {
        dispatch(setLevel(e.currentTarget.getAttribute("data-level")))
    }

    return (
        <Popup>
            <StyledContent className="start">
                <p className='start__description'>
                    <i>Игра "САПЕР".</i>
                    <i>Тебе предстоит разминировать 8 минных полей.</i>
                    <i>Для этого необходимо указать все числа не кратные номеру мины.</i>
                </p>
                <div className='start__settings list'>
                    <div data-level="easy" onClick={fieldSelectionHandler} className='list__item'>
                        <input type="radio" name="settings" checked={level === 'easy'} readOnly />
                        <label htmlFor="date">Easy</label>
                    </div>
                    <div data-level="medium" onClick={fieldSelectionHandler} className='list__item'>
                        <input type="radio" name="settings" checked={level === 'medium'} readOnly />
                        <label htmlFor="name">Medium</label>
                    </div>
                    <div data-level="hard" onClick={fieldSelectionHandler} className='list__item'>
                        <input type="radio" name="settings" checked={level === 'hard'} readOnly />
                        <label htmlFor="amount">Hard</label>
                    </div>
                    <div data-level="extra hard" onClick={fieldSelectionHandler} className='list__item'>
                        <input type="radio" name="settings" checked={level === 'extra hard'} readOnly />
                        <label htmlFor="amount">Extra Hard</label>
                    </div>
                </div>
                <button onClick={() => dispatch(pressStartTC())} className='start__btn'>СТАРТ</button>
            </StyledContent>
        </Popup>
    )
};

export default React.memo(StartGamePopup);

const StyledContent = styled.div`
&.start {
    display: flex;
    flex-direction: column;
}

& .start__description {
    display: flex;
    flex-direction: column;

    & i:not(:last-child) {
        margin-bottom: px;
    }
}

& .start__settings {
    margin: 10px 0;
}

& .list__item {
    display: flex;
    align-items: center;
    height: 40px;

    & input {
        width: 20px;
        height: 20px;
    }

    & label {
        margin-left: 10px;
    }
}

& .start__btn {
    margin: 0 auto;
    padding: 10px;
    width: 100px;
    background-color: ${variables.blueColor};
    color: #ffffff;
    border-radius: 4px;
    font-size: 18px;
    letter-spacing: 4px;
    font-weight: 700;

    &:hover {
        background-color: #0066df;
    }
}
`