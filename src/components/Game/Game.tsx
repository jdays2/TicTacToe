import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  botMove,
  offActiveStatus,
  onActiveStatus,
  reset,
  startNewRound,
  willRestart,
  winCheck,
} from "../../redux/data/slice";
import { RootState, useAppDispatch } from "../../redux/store";

import rest from "./../../assets/img/Redo.svg";
import X from "./../../assets/img/Combined Shape Copy 2.svg";
import xGray from "./../../assets/img/x-gray.svg";
import O from "./../../assets/img/Oval.svg";
import oGray from "./../../assets/img/0-gray.svg";
import GameCell from "./GameCell/GameCell";
import { Link } from "react-router-dom";

const Game: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    gameBoard,
    roundCount,
    playerXCount,
    playerOCount,
    winner,
    statusActive,
    restart,
    activePlayer,
    moveCount,
    vsBotGame,
    playerOneX,
  } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    dispatch(winCheck());
    if (vsBotGame && botMove) {
      dispatch(botMove());
    }
  }, [moveCount]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <>
      <div className="display-wrapper">
        <div className="display__players">
          <img src={X} className="display__players-img" />
          <img src={O} className="display__players-img" />
        </div>
        <div className="display__status">
          <div className="display__status-content">
            <img
              src={!activePlayer ? xGray : oGray}
              className="display__status-img"
            />
            <div>TURN</div>
          </div>
        </div>
        <button
          onClick={() => {
            dispatch(onActiveStatus());
            dispatch(willRestart());
          }}
          className="display__button_restart"
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
              user={activePlayer}
              value={e.value}
            />
          ))}
          {gameBoard[1].map((e, i) => (
            <GameCell
              rowId={1}
              key={i}
              id={i}
              user={activePlayer}
              value={e.value}
            />
          ))}
          {gameBoard[2].map((e, i) => (
            <GameCell
              rowId={2}
              key={i}
              id={i}
              user={activePlayer}
              value={e.value}
            />
          ))}
        </>
      </div>
      <div className="scoreboard">
        <div className="display display-blue ">
          {vsBotGame ? (
            <span>X ({playerOneX ? "YOU" : "CPU"})</span>
          ) : (
            <span>X ({playerOneX ? "P1" : "P2"})</span>
          )}
          <span className="display__value">{playerXCount}</span>
        </div>

        <div className="display display-grey">
          <span>TIES</span>
          <span className="display__value">{roundCount}</span>
        </div>
        <div className="display display-orange">
          {vsBotGame ? (
            <span>O ({!playerOneX ? "YOU" : "CPU"})</span>
          ) : (
            <span>O ({!playerOneX ? "P1" : "P2"})</span>
          )}

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
              <p className="winner-container__status">
                {(vsBotGame &&
                  (playerOneX ? "OH NO, YOU LOST…" : "YOU WON!")) ||
                  (!vsBotGame && !playerOneX
                    ? "PLAYER 1 WINS!"
                    : "PLAYER 2 WINS!")}
              </p>
              <div className="winner-container__subject">
                <img src={O} className="winner-container__subject-img" />
                <h1 className="winner-container__subject-title">
                  TAKES THE ROUND
                </h1>
              </div>
              <div className="winner-container__buttons">
                <Link
                  to="/"
                  className="button__winner-gray"
                  onClick={() => dispatch(reset())}
                >
                  QUIT
                </Link>
                <button
                  className="button__winner-orange"
                  onClick={() => dispatch(startNewRound())}
                >
                  NEXT ROUND
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {winner === 2 && (
        <div
          className={
            statusActive
              ? `winner-container-background`
              : `winner-container-background hide`
          }
        >
          <div className="winner-container-wrapper">
            <div className="winner-container">
              <p className="winner-container__status">
                {(vsBotGame &&
                  (playerOneX ? "YOU WON!" : "OH NO, YOU LOST…")) ||
                  (!vsBotGame && !playerOneX
                    ? "PLAYER 2 WINS!"
                    : "PLAYER 1 WINS!")}
              </p>
              <div className="winner-container__subject">
                <img src={X} className="winner-container__subject-img" />
                <h1 className="winner-container__subject-title winner-container__subject-title-blue">
                  TAKES THE ROUND
                </h1>
              </div>
              <div className="winner-container__buttons">
                <Link
                  to="/"
                  className="button__winner-gray"
                  onClick={() => dispatch(reset())}
                >
                  QUIT
                </Link>
                <button
                  className="button__winner-orange"
                  onClick={() => dispatch(startNewRound())}
                >
                  NEXT ROUND
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {winner === 3 && (
        <div
          className={
            statusActive
              ? `winner-container-background`
              : `winner-container-background hide`
          }
        >
          <div className="winner-container-wrapper">
            <div className="winner-container winner-container-tied">
              <h1 className="winner-container__subject-title subject-title-tied">
                ROUND TIED
              </h1>

              <div className="winner-container__buttons">
                <button
                  className="button__winner-gray"
                  onClick={() => dispatch(reset())}
                >
                  QUIT
                </button>
                <button
                  className="button__winner-orange"
                  onClick={() => {
                    dispatch(startNewRound());
                  }}
                >
                  NEXT ROUND
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {restart ? (
        <div
          className={
            statusActive
              ? `winner-container-background`
              : `winner-container-background hide`
          }
        >
          <div className="winner-container-wrapper">
            <div className="winner-container winner-container-restart">
              <h1 className="winner-container__subject-title subject-title-restart">
                RESTART GAME?
              </h1>

              <div className="winner-container__buttons winner-container__buttons__restart">
                <button
                  className="button__winner-gray button__restart"
                  onClick={() => {
                    dispatch(willRestart());
                    dispatch(offActiveStatus());
                  }}
                >
                  NO, CANCEL
                </button>
                <Link
                  to="/"
                  className="button__winner-orange button__restart"
                  onClick={() => {
                    dispatch(reset());
                    dispatch(offActiveStatus());
                  }}
                >
                  YES, RESTART
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Game;
