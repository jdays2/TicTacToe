import O from "../../../assets/img/Oval.svg";
import X from "../../../assets/img/Combined Shape Copy 2.svg";
import { botMove, changeValue, nextMove } from "../../../redux/data/slice";
import { RootState, useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux/es/exports";

type gameCellProps = {
  user: boolean;
  id: number;
  rowId: number;
  value: number;
};

const GameCell: React.FC<gameCellProps> = ({ user, id, value, rowId }) => {
  const dispatch = useAppDispatch();

  const { done, win } = useSelector(
    (state: RootState) => state.data.gameBoard[rowId][id]
  );
  const { statusActive, vsBotGame } = useSelector(
    (state: RootState) => state.data
  );

  const click = (id: number) => {
    if (done === false && !statusActive) {
      dispatch(changeValue({ rowId, id, user }));
      dispatch(nextMove());
      if (vsBotGame && botMove) {
        dispatch(botMove());
      }
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
