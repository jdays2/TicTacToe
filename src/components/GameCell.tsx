import "../App.css";
import O from "../assets/img/Oval.svg";
import X from "../assets/img/Combined Shape Copy 2.svg";
import { useState } from "react";
import { changeValue, winCheck } from "../redux/data/slice";
import { useAppDispatch } from "../redux/store";

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
  const [done, setDone] = useState(false);
  const [player, setPlayer] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const click = (id: number) => {
    if (!done) {
      dispatch(changeValue({ rowId, id, user }));
      play && play();
      setPlayer(!player);
      setDone(true);
      dispatch(winCheck());
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
