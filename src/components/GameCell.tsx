import "../App.css";
import O from "../assets/img/Oval.svg";
import X from "../assets/img/Combined Shape Copy 2.svg";
import { useState } from "react";
import { changeValue, reset, winCheck } from "../redux/data/slice";
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

  const done = useSelector(
    (state: RootState) => state.data.gameBoard[rowId][id].done
  );

  const click = (id: number) => {
    if (done === false) {
      dispatch(changeValue({ rowId, id, user }));
      play && play();
      setPlayer(!player);
      dispatch(winCheck());
      dispatch(reset());
    }
  };

  return (
    <div
      onClick={() => {
        click(id);
      }}
      className="game__cell"
    >
      <img
        src={(value === 0 && "") || (value === 1 && O) || (value === 2 && X)}
      />
    </div>
  );
};

export default GameCell;
function useAddDispatch() {
  throw new Error("Function not implemented.");
}
