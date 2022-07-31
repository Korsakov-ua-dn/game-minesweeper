import React  from "react";
import styled from 'styled-components';
import { variables } from "../../utils/variables";

const Header = () =>  (
    <StyledHeader className='header'>
        <span className="header__line"/>
        <div className="header__title">САПЕР</div>
        <span className="header__line"/>
    </StyledHeader>
)

export default React.memo(Header);

const StyledHeader = styled.header`
&.header {
    display: grid;
    grid-template-columns: 1fr 300px 1fr;
    align-items: center;
    margin-top: 24px;

    @media (max-width: 767px) {
        margin-top: 15px;
        }
}

& .header__line {
    height: 4px;
    border-radius: 4px;
    background-color: ${variables.blueColor};
}

& .header__title {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background-color: ${variables.accentColor};
    font-size: 18px;
    letter-spacing: 4px;
    font-weight: 700;
    color: #ffffff;
}
`