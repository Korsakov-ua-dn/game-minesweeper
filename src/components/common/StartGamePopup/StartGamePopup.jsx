import Portal from '../Portal';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { pressStartTC, setLevel } from '../../../store/reducers/game-reducer';
import { variables } from "../../../utils/variables";

const StartGamePopup = () => {
    const dispatch = useDispatch();
    const isOpenStart = useSelector(s => s.game.isOpenStart);
    const level = useSelector(s => s.game.level);

    if (!isOpenStart) return;

    const fieldSelectionHandler = (e) => {
        dispatch(setLevel(e.currentTarget.getAttribute("data-level")))
    }

    return (
        <Portal>
            <StyledPopup className='popup'>
                <div className='popup__background'/>
                <div className='popup__wrapper'>
                    <p className='game-description'>
                        <i>Игра "САПЕР".</i>
                        <i>Тебе предстоит разминировать 8 минных полей.</i>
                        <i>Для этого необходимо указать все числа не кратные номеру мины.</i>
                    </p>
                    <div className='settings-list'>
                        <div data-level="easy" onClick={fieldSelectionHandler} className='settings-list__item'>
                            <input type="radio" name="settings" checked={level === 'easy'} readOnly />
                            <label htmlFor="date">Easy</label>
                        </div>
                        <div data-level="medium" onClick={fieldSelectionHandler} className='settings-list__item'>
                            <input type="radio" name="settings" checked={level === 'medium'} readOnly />
                            <label htmlFor="name">Medium</label>
                        </div>
                        <div data-level="hard" onClick={fieldSelectionHandler} className='settings-list__item'>
                            <input type="radio" name="settings" checked={level === 'hard'} readOnly />
                            <label htmlFor="amount">Hard</label>
                        </div>
                        <div data-level="extra hard" onClick={fieldSelectionHandler} className='settings-list__item'>
                            <input type="radio" name="settings" checked={level === 'extra hard'} readOnly />
                            <label htmlFor="amount">Extra Hard</label>
                        </div>
                    </div>
                    <button onClick={() => dispatch(pressStartTC())} className='popup__btn'>СТАРТ</button>
                </div>
            </StyledPopup>
        </Portal>
    )
};

export default StartGamePopup;

const StyledPopup = styled.div`
&.popup {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
}

& .popup__background {
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.4;
}

& .popup__wrapper {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50% , -50%);
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    z-index: 99;
    max-width: 330px;
    width: 100%;
    padding: 15px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border-radius: 4px;
}

& .settings-list {
    margin: 10px 0;
}

& .settings-list__item {
    display: flex;
    align-items: center;
    height: 40px;

    // &:not(:last-child) {
    //     margin-bottom: 10px;
    // }

    & input {
        width: 20px;
        height: 20px;
    }

    & label {
        margin-left: 10px;
    }
}

& .popup__btn {
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


& .game-description {
    display: flex;
    flex-direction: column;

    & i:not(:last-child) {
        margin-bottom: px;
    }
}
`