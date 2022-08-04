import React  from "react";
import Portal from "./Portal";
import styled from "styled-components";

const PopupNoBG = ({ children }) => (
    <Portal>
        <StyledPopup className='popup'>
            <div className='popup__content'>
                { children }
            </div>
        </StyledPopup>
    </Portal>
)

export default React.memo(PopupNoBG);

const StyledPopup = styled.div`
&.popup {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
}

& .popup__content {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50% , -50%);
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    z-index: 1;
    width: 100%;
    padding: 15px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border-radius: 4px;
}
`