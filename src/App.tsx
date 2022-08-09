import './App.css';
import {levels} from './levels'
import {Sokoban} from './Sokoban';

const boardSize = Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight);// / 1.41;

export function App() {
  const level = levels[3];

  return (
  <div>
    Сторона {boardSize}
    <div style={{height: 500, backgroundColor: "cyan"}} ></div>
    <Sokoban boardSize={boardSize} {...level} />
    <div style={{height: 500, backgroundColor: "cornflowerblue"}} ></div>
  </div>
  );
}

