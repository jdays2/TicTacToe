import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import GameCell from "./components/GameCell";
import { reset } from "./redux/data/slice";
import { RootState, useAppDispatch } from "./redux/store";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    gameBoard,
    roundCount,
    playerXCount,
    playerOCount,
    endRound,
    winner,
  } = useSelector((state: RootState) => state.data);
  const [user, setUser] = useState(false);
  function player() {
    user === false ? setUser(true) : setUser(false);
  }

  useEffect(() => {
    if (endRound) {
      dispatch(reset());
    }
  }, [endRound]);

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
        <div
          className={
            winner === 2 ? "winner-container" : `winner-container hide`
          }
        >
          <div className="winner">
            <p>OH NO, YOU LOST…</p>
            <h1>TAKES THE ROUND</h1>
            <div>
              <button>QUIT</button>
              <button>NEXT ROUND</button>
            </div>
          </div>
        </div>
        <div
          className={
            winner === 1 ? "winner-container" : `winner-container hide`
          }
        >
          <div className="winner">
            <p>YOU WON!</p>
            <h1>TAKES THE ROUND</h1>
            <div>
              <button>QUIT</button>
              <button>NEXT ROUND</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
