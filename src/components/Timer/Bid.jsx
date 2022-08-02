import React  from "react";
import styled from 'styled-components';
// import { variables } from "../../utils/variables";
import mineImg from "../../assets/img/mine.webp"
import { useSelector } from "react-redux";

const Bid = () => {
    const bid = useSelector(s => s.game.bid);
    return (
        <StyledBid className='mine'>
            <img 
                width={150}
                height={120}
                src={mineImg}
                className='mine__img'
                alt={`mine with number ${bid}`}/>
            <span className="mine__number">{bid}</span>
        </StyledBid>
    )
} 

export default React.memo(Bid);

const StyledBid = styled.div`
&.mine {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

& .mine__img {
    max-height: 120px;
    transform: translateX(28px);

    // @media (max-width: 767px) {
    //     font-size: 40px;
    //   }
}

& .mine__number {
    position: absolute;
    left: 50%;
    transform: translateX(calc(-50% - 4px));
    bottom: 14px;
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    font-weight: 700;
    border-radius: 50%;
    background-color: #fff;
}
`