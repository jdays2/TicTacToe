import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import GameCell from "./components/GameCell";
import { RootState } from "./redux/store";

const App: React.FC = () => {
  const { gameBoard, roundCount, playerXCount, playerOCount } = useSelector(
    (state: RootState) => state.data
  );
  const [user, setUser] = useState(false);
  function player() {
    user === false ? setUser(true) : setUser(false);
  }

  return (
    <div className="App">
      <div className="container">
        <div className="display-wrapper">
          <div>
            <span>X</span>
            <span>O</span>
          </div>
          <div>TURN {user ? "O" : "X"}</div>
          <button>...</button>
        </div>
        <div className="game">
          <>
            {gameBoard[0].map((e, i) => (
              <GameCell
                rowId={0}
                key={i}
                id={i}
                user={user}
                value={e.value}
                play={() => {
                  player();
                }}
              />
            ))}
            {gameBoard[1].map((e, i) => (
              <GameCell
                rowId={1}
                key={i}
                id={i}
                user={user}
                value={e.value}
                play={() => {
                  player();
                }}
              />
            ))}
            {gameBoard[2].map((e, i) => (
              <GameCell
                rowId={2}
                key={i}
                id={i}
                user={user}
                value={e.value}
                play={() => {
                  player();
                }}
              />
            ))}
          </>
        </div>
        <div className="scoreboard">
          <div>
            <span> (YOU)</span>
            <span>{playerXCount}</span>
          </div>

          <div>
            <span>TIES</span>
            <span>{roundCount}</span>
          </div>
          <div>
            <span> (CPU)</span>
            <span>{playerOCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
