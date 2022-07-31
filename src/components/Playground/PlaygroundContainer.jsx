import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewWinTC } from "../../store/reducers/game-reducer";
import Playground from "./Playground";

const PlaygroundContainer = () => {
    const dispatch = useDispatch();
    const activeCeilsList = useSelector(s => s.game.activeCeilsList);
    const correctAnswerList = useSelector(s => s.game.correctAnswerList);
    // console.log("activeCeilsList: ", activeCeilsList);
    console.log("correctAnswerList: ", correctAnswerList);
  
    useEffect(() => {
        if (JSON.stringify(correctAnswerList.sort()) === JSON.stringify(activeCeilsList.sort())) {
            dispatch(viewWinTC())
        }
    }, [correctAnswerList, activeCeilsList, dispatch])
    
    return <Playground/>
}

export default PlaygroundContainer