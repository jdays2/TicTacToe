import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import GameCell from "./components/GameCell";
import { RootState } from "./redux/store";

const App: React.FC = () => {
  const data = useSelector((state: RootState) => state.data.gameBoard);
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
          <button>TURN</button>
          <button>/</button>
        </div>
        <div className="game">
          <>
            {/* {data.map((e, i) => (
              <GameCell
                key={i}
                id={i}
                user={user}
                value={e.value}
                play={() => {
                  player();
                }}
              />
            ))} */}
            {data[0].map((e, i) => (
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
            {data[1].map((e, i) => (
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
            {data[2].map((e, i) => (
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
            <span>0</span>
          </div>

          <div>
            <span>TIES</span>
            <span>0</span>
          </div>
          <div>
            <span>O (CPU)</span>
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
