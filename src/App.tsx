import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import GameCell from "./components/GameCell";
import { reset, endGame, closeActiveStatus } from "./redux/data/slice";
import { RootState, useAppDispatch } from "./redux/store";
import rest from "./assets/img/Redo.svg";
import X from "./assets/img/Combined Shape Copy 2.svg";
import O from "./assets/img/Oval.svg";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    gameBoard,
    roundCount,
    playerXCount,
    playerOCount,
    endRound,
    winner,
    statusActive,
  } = useSelector((state: RootState) => state.data);
  const [user, setUser] = useState(false);
  function player() {
    user === false ? setUser(true) : setUser(false);
  }

  const restart = () => {
    if (endRound) {
      dispatch(reset());
      setUser(false);
    }
  };
  restart();

  return (
    <div className="App">
      <div className="container">
        <div className="display-wrapper">
          <div>
            <img src={X} />
            <img src={O} />
          </div>
          <div>
            <img src={user ? O : X} />
            <span>TURN</span>
          </div>
          <button onClick={() => dispatch(endGame())}>
            <img src={rest} />
          </button>
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
            <span>X (YOU)</span>
            <span>{playerXCount}</span>
          </div>

          <div>
            <span>TIES</span>
            <span>{roundCount}</span>
          </div>
          <div>
            <span>O (CPU)</span>
            <span>{playerOCount}</span>
          </div>
        </div>
        {winner === 1 && (
          <div
            className={
              statusActive ? "winner-container" : `winner-container hide`
            }
          >
            <div className="winner">
              <p>OH NO, O Win…</p>
              <h1>TAKES THE ROUND</h1>
              <div>
                <button>QUIT</button>
                <button onClick={() => dispatch(closeActiveStatus())}>
                  NEXT ROUND
                </button>
              </div>
            </div>
          </div>
        )}
        {winner === 2 && (
          <div
            className={
              statusActive ? "winner-container" : `winner-container hide`
            }
          >
            <div className="winner">
              <p>X WON!</p>
              <h1>TAKES THE ROUND</h1>
              <div>
                <button>QUIT</button>
                <button onClick={() => dispatch(closeActiveStatus())}>
                  NEXT ROUND
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
