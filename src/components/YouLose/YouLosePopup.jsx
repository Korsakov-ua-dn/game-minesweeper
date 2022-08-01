
import React  from "react";
import Popup from "../common/Popup";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { variables } from "../../utils/variables";

const YouLosePopup = () => {
    const isLoseView = useSelector(s => s.game.isLoseView);

    if (!isLoseView) return;

    return (
        <Popup>
            <StyledContent className='win'>
                You lose, try again.
            </StyledContent>
        </Popup>
    )
};

export default React.memo(YouLosePopup);

const StyledContent = styled.div`

&.win {
    max-width: 330px;
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26px;
    font-weight: 700;
    letter-spacing: 1.5px;
    color: ${variables.accentColor}
}
`