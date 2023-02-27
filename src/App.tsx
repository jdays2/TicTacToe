import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import GameCell from "./components/GameCell";
import { reset, endGame, closeActiveStatus } from "./redux/data/slice";
import { RootState, useAppDispatch } from "./redux/store";
import rest from "./assets/img/Redo.svg";
import X from "./assets/img/Combined Shape Copy 2.svg";
import xGray from "./assets/img/x-gray.svg";
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

  useEffect(() => {
    const restart = () => {
      if (endRound) {
        dispatch(reset());
        setUser(false);
      }
    };
    restart();
  }, [endRound]);

  return (
    <div className="App">
      <div className="container">
        <div className="display-wrapper">
          <div className="display__players">
            <img src={X} className="display__players-img" />
            <img src={O} className="display__players-img" />
          </div>
          <div className="display__status">
            <div className="display__status-content">
              <img src={user ? O : xGray} className="display__status-img" />
              <div>TURN</div>
            </div>
          </div>
          <button
            onClick={() => dispatch(endGame())}
            className="button__restart"
          >
            <img src={rest} className="button__restart-img" />
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
          <div className="display display-blue ">
            <span>X (YOU)</span>
            <span className="display__value">{playerXCount}</span>
          </div>

          <div className="display display-grey">
            <span>TIES</span>
            <span className="display__value">{roundCount}</span>
          </div>
          <div className="display display-orange">
            <span>O (CPU)</span>
            <span className="display__value">{playerOCount}</span>
          </div>
        </div>
        {winner === 1 && (
          <div
            className={
              statusActive
                ? `winner-container-background`
                : `winner-container-background hide`
            }
          >
            <div className="winner-container-wrapper">
              <div className="winner-container">
                <p className="winner-container__status">OH NO, YOU LOST…</p>
                <div className="winner-container__subject">
                  <img src={O} className="winner-container__subject-img" />
                  <h1 className="winner-container__subject-title">
                    TAKES THE ROUND
                  </h1>
                </div>
                <div className="winner-container__buttons">
                  <button className="button__winner-gray ">QUIT</button>
                  <button
                    className="button__winner-orange"
                    onClick={() => dispatch(closeActiveStatus())}
                  >
                    NEXT ROUND
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* {winner === 2 && (
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
        )} */}
      </div>
    </div>
  );
};

export default App;
