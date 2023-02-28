import O from "../../assets/img/Oval.svg";
import X from "../../assets/img/Combined Shape Copy 2.svg";
import xSelection from "../../assets/img/x-selection-hover.svg";
import oSelection from "../../assets/img/o-selection-hover.svg";

const Headstarter: React.FC = () => {
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
            <div className="selection__item selection__item-active">
              <img src={xSelection} />
            </div>
            <div className="selection__item">
              <img src={oSelection} />
            </div>
          </div>
        </div>
        <p className="body__reminder">REMEMBER : X GOES FIRST</p>
      </div>
      <div className="headstarter__buttons">
        <button className="buttons__vs-cpu">NEW GAME (VS CPU)</button>
        <button className="buttons__vs-player">NEW GAME (VS PLAYER)</button>
      </div>
    </div>
  );
};

export default Headstarter;
