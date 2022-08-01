import styled from "styled-components";
import Header from "./components/Header/Header";
import PlaygroundContainer from "./components/Playground/PlaygroundContainer";
import { useSelector } from "react-redux";
import StartGamePopup from "./components/StartGame/StartGamePopup";
import YouWinPopup from "./components/YouWin/YouWinPopup";
import YouLosePopup from "./components/YouLose/YouLosePopup";
import Timer from "./components/Timer/Timer";

const App = () => {
  const bid = useSelector(s => s.game.bid); // генерируется после клика старт

   // пути картинок для предварительной импорта (браузер закэширует и другие компоненты их получат моментально из кэша)
   const imagesPath = [
    './assets/img/mine.webp',
  ]

  return (
    <StyledApp className="App">

      { bid && <div className="container">
          <Header/>
          <Timer/>
          <PlaygroundContainer/>
        </div>
      }
      
      {imagesPath.map((el, i) => <NotViewImg key={i} imgComponent={require(`${el}`)}/> )}

      <StartGamePopup/>
      <YouWinPopup/>
      <YouLosePopup/>

    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  &.App {
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (max-width: 767px) {
      padding: 0 15px;
    }
  }

  & .container {
    max-width: 1024px;
    width: 100%;
  }
  
`
const NotViewImg = styled.div`
    position: absolute;
    background-image: url(${props => props.imgComponent});
    opacity: 0;
`

