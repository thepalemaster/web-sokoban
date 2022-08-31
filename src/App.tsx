import './App.css';
import {levels} from './levels'
import {Sokoban} from './Sokoban';


export function App() {

  const boardSize = Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight);
  return (
  <div>
    Сторона {boardSize}
    <div style={{height: 500, backgroundColor: "cyan"}} ></div>
    <Sokoban boardSize={boardSize} width={document.documentElement.clientWidth} height={document.documentElement.clientHeight} onSolved={()=>{}}/>
    <div style={{height: 500, backgroundColor: "cornflowerblue"}} ></div>
  </div>
  );
}

