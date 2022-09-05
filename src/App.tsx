import './App.css';
import {Sokoban} from './Sokoban';


export function App() {
  const boardSize = Math.min(document.documentElement.clientWidth / 1.41, document.documentElement.clientHeight);
  const mode = document.documentElement.clientWidth > document.documentElement.clientHeight ? "landscape" : "portrait"
  return (
  <div>
    Сторона {boardSize}
    <Sokoban boardSize={boardSize} mode={mode} />
  </div>
  );
}

