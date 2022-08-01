
import React  from "react";
import Popup from "../common/Popup";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { variables } from "../../utils/variables";

const YouWinPopup = () => {
    const isWinView = useSelector(s => s.game.isWinView);

    if (!isWinView) return;

    return (
        <Popup>
            <StyledContent className='win'>
                YOU WIN!
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
    font-size: 46px;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: ${variables.blueColor}
}
`