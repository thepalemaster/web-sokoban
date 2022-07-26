import React from "react";
import { Direction } from "./levels";
import { GameAction } from "./setupState";

type MoveButtonsProps = {
  size: number,
  dispatcher: React.Dispatch<GameAction>,
};

export function MoveButtons(props: MoveButtonsProps) {
  const clickHandler = (action: Direction) => {
    props.dispatcher({ type: action });
    props.dispatcher({type: "noeffect"});
  }
  return (
    <div className="sokoban-movepad isomeric">
      <button
        onClick={()=>{clickHandler("N")}}
        className="sokoban-button sokoban-button-up"
      >
        {arrow}
      </button>
      <button
        onClick={()=>{clickHandler("S")}}
        className="sokoban-button sokoban-button-down"
      >
        {arrow}
      </button>
      <button
        onClick={()=>{clickHandler("W")}}
        className="sokoban-button sokoban-button-right"
      >
        {arrow}
      </button>
      <button
        onClick={() => {clickHandler("E")}}
        className="sokoban-button sokoban-button-left"
      >
        {arrow}
      </button>
    </div>
  );
}

const arrow = 
  (
    <svg
      fill="currentColor"
      viewBox="0 0 1000 1000"
    >
      <path d="M511.1,858.1l465.5-333c8.4-6,13.4-15.8,13.4-26.1c0-0.1,0-0.1,0-0.1c0-10.4-5.1-20.1-13.5-26.2L511,141.8c-9.8-7-22.7-7.9-33.4-2.3c-10.7,5.4-17.4,16.5-17.4,28.6v155.7l-418.1,0c-17.8,0-32.1,14.4-32.1,32.2L10,644c0,17.8,14.4,32.1,32.2,32.2h418V832c0,12,6.8,23,17.5,28.6C488.4,866.1,501.3,865.1,511.1,858.1z"/>
    </svg>
  );