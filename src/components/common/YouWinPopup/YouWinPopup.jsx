import Portal from '../Portal';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
// import { variables } from "../../../utils/variables";

const YouWinPopup = () => {
    const isWinView = useSelector(s => s.game.isWinView);

    if (!isWinView) return;

    return (
        <Portal>
            <StyledPopup className='win'>
                <div className='win__background'/>
                <div className='win__wrapper'>
                    YOU WIN!
                </div>
            </StyledPopup>
        </Portal>
    )
};

export default YouWinPopup;

const StyledPopup = styled.div`
&.win {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
}

& .win__background {
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.4;
}

& .win__wrapper {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50% , -50%);
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    max-width: 330px;
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 46px;
    font-weight: 700;
    letter-spacing: 1.5px;
}
`