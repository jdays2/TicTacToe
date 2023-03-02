import O from "../../assets/img/Oval.svg";
import X from "../../assets/img/Combined Shape Copy 2.svg";
import xSelection from "../../assets/img/x-selection-hover.svg";
import xSelectionGray from "../../assets/img/x-gray.svg";
import oSelection from "../../assets/img/o-selection-hover.svg";
import oSelectionGray from "../../assets/img/0-gray.svg";
import { useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { setBotActive, setFirstPlayer } from "../../redux/data/slice";
import { Link } from "react-router-dom";

const Headstarter: React.FC = () => {
  const [stateX, setStateX] = useState(true);
  const [stateO, setStateO] = useState(false);
  const dispatch = useAppDispatch();

  const toggleSelections = (x: boolean) => {
    if (x) {
      setStateX(true);
      setStateO(false);
      dispatch(setFirstPlayer(true));
    } else {
      setStateX(false);
      setStateO(true);
      dispatch(setFirstPlayer(false));
    }
  };

  const modeSelection = (x: boolean) => {
    if (x) {
      dispatch(setBotActive(true));
    } else {
      dispatch(setBotActive(false));
    }
  };

  return (
    <div className="headstarter">
      <div className="headstarter__icons">
        <img className="icons__x" src={X} />
        <img className="icons__o" src={O} />
      </div>
      <div className="headstarter__body">
        <p className="body__title">PICK PLAYER 1’S MARK</p>
        <div className="body__selection-wrapper">
          <div className="body__selection">
            <div
              onClick={() => {
                toggleSelections(true);
              }}
              className={`selection__item ${
                stateX ? `selection__item-active` : ``
              }`}
            >
              <img
                src={stateX ? xSelection : xSelectionGray}
                className="selection__item-img"
              />
            </div>
            <div
              onClick={() => {
                toggleSelections(false);
              }}
              className={`selection__item ${
                stateO ? `selection__item-active` : ``
              }`}
            >
              <img
                src={stateO ? oSelection : oSelectionGray}
                className="selection__item-img"
              />
            </div>
          </div>
        </div>
        <p className="body__reminder">REMEMBER : X GOES FIRST</p>
      </div>
      <div className="headstarter__buttons">
        <Link
          to="/game"
          className="buttons__vs-cpu"
          onClick={() => {
            modeSelection(true);
          }}
        >
          NEW GAME (VS CPU)
        </Link>

        <Link
          to="/game"
          className="buttons__vs-player"
          onClick={() => {
            modeSelection(false);
          }}
        >
          NEW GAME (VS PLAYER)
        </Link>
      </div>
    </div>
  );
};

export default Headstarter;
