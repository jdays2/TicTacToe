import "./App.css";
import Game from "./components/Game/Game";
import Headstarter from "./components/Headstarter/Headstarter";
import { useAppDispatch } from "./redux/store";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="App">
      <div className="container">
        {/* <Game /> */}
        <Headstarter />
      </div>
    </div>
  );
};

export default App;
