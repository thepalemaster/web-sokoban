import {useEffect, useState} from 'react';
import './App.css';
import {Sokoban} from './Sokoban';


export function App() {
  const [boardSize, setSize] = useState(calculateSize());
  const mode = document.documentElement.clientWidth > document.documentElement.clientHeight ? "landscape" : "portrait"
  useEffect(() => {
    const resizeListener = () => {
      setSize(calculateSize())
    }
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  }, []
  )
  return (
  <div>
    <Sokoban boardSize={boardSize} mode={mode} />
  </div>
  );
}

function calculateSize() {
  return Math.min(document.documentElement.clientWidth / 1.41, document.documentElement.clientHeight);
}

