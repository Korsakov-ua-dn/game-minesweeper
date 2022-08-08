import React, { useCallback }  from "react";
import styled from "styled-components";
import { variables } from "../../utils/variables";
import { useDispatch, useSelector } from "react-redux";
import { toggleActiveCeil } from "../../store/reducers/game-reducer";

const Playground = () => {
    const dispatch = useDispatch();
    const aspectRatio = useSelector(s => s.game.gameParams.aspectRatio);
    const listOfSteps = useSelector(s => s.game.listOfSteps);
    const activeCeilsList = useSelector(s => s.game.activeCeilsList);
    // console.log("listOfSteps: ", listOfSteps);
  

// вещаем один обработчик для всех ячеек
    const clickCeilHandler = useCallback((e) => {
        if (e.target.tagName === 'STRONG') {

            let id = Number(e.target.id)
            dispatch(toggleActiveCeil(id));
        }
    }, [dispatch])

    return (
        <StyledTable
            aspectRatio={aspectRatio}
            onClick={clickCeilHandler} 
            className={` table`}>
        
            {  
                listOfSteps.map(number => <Ceil 
                    number={number}
                    active={activeCeilsList.find(id => id === number)}
                    key={number}/>)
            }
            
        </StyledTable>
    )
}

export default React.memo(Playground);

const Ceil = React.memo(({ number, active }) => {
    const classN = `${active ? 'active' : ''} table__ceil`

    return (
        <span className={classN} >
            <strong id={number} className="table__number">{number}</strong>
        </span>
    )
});

const StyledTable = styled.main`
&.table {
    display: grid;
    grid-template-columns: repeat(${props => props.aspectRatio}, 1fr);
    gap: 20px;
    max-width: calc(500 * 100vh / 868);
    margin: 20px auto;
}

& .table__ceil {
    position: relative;
    padding-bottom: 100%;
    width: 100%;
    background-color: ${variables.backgroundColor};

    &.active {
        background-color: ${variables.backgroundBlueColor};
    }
}

& .table__number {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
}
`