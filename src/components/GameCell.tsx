import "../App.css";
import O from "../assets/img/Oval.svg";
import X from "../assets/img/Combined Shape Copy 2.svg";
import { useState } from "react";
import {
  botMove,
  changeValue,
  drawChek,
  setActivePlayer,
  winCheck,
} from "../redux/data/slice";
import { RootState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux/es/exports";

type gameCellProps = {
  play?: () => void;
  user: boolean;
  id: number;
  rowId: number;
  value: number;
};

const GameCell: React.FC<gameCellProps> = ({
  play,
  user,
  id,
  value,
  rowId,
}) => {
  const [player, setPlayer] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { done, win } = useSelector(
    (state: RootState) => state.data.gameBoard[rowId][id]
  );
  const { statusActive } = useSelector((state: RootState) => state.data);

  const click = (id: number) => {
    if (done === false && !statusActive) {
      dispatch(changeValue({ rowId, id, user }));
      play && play();
      dispatch(setActivePlayer());
      dispatch(botMove());
      dispatch(winCheck());
      dispatch(drawChek());
    }
  };

  return (
    <div
      onClick={() => {
        click(id);
      }}
      className={`game__cell ${
        value === 0 ? (user ? `game__cell__O` : `game__cell__X`) : ""
      } ${win ? `game_cell__win` : ""} `}
    >
      <img
        src={(value === 0 && "") || (value === 1 && O) || (value === 2 && X)}
      />
    </div>
  );
};

export default GameCell;
