import React  from "react";
import PopupNoBG from "../common/PopupNoBG";
import styled from "styled-components";
import Boom from "../../assets/img/boom.webp";

const BoomPopup = () => {

    return (
        <PopupNoBG>
            <StyledContent className='boom'>
                <img src={Boom} alt="boom" />
            </StyledContent>
        </PopupNoBG>
    )
};

export default React.memo(BoomPopup);

const StyledContent = styled.div`

&.boom {
    max-width: 330px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
`