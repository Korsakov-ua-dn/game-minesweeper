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
                // width={100}
                // height={100}
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
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
}

& .mine__img {
    max-height: 150px;
    transform: translateX(39px);

    // @media (max-width: 767px) {
    //     font-size: 40px;
    //   }
}

& .mine__number {
    position: absolute;
    bottom: 24px;
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