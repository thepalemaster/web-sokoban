import React from "react";
import {GameAction} from "./setupState";
import midpoint from './midpoint2.svg';

type MoveButtonsProps = {
  size: number;
  dispatcher: React.Dispatch<GameAction>;
};

export function MoveButtons(props: MoveButtonsProps) {
  const moveButtonsStyle = {
    width: props.size,
    height: props.size,
  };
  return (
    <div style={moveButtonsStyle} className="sokoban-movepad">
      <button
        onClick={() => {props.dispatcher({ type: "N" });}} 
        className="sokoban-movebutton sokoban-button-up"
      > 
        {arrows[1]}
      </button>
      <button 
        onClick={() => {props.dispatcher({ type: "S" });}}
        className="sokoban-movebutton sokoban-button-down"
      >
        {arrows[2]}
      </button>
      <button 
        onClick={() => {props.dispatcher({ type: "E" });}}
        className="sokoban-movebutton sokoban-button-right"
      >
        {arrows[0]}
      </button>
      <button
        onClick={() => {props.dispatcher({ type: "W" });}}
        className="sokoban-movebutton sokoban-button-left"
      >
        {arrows[3]}
      </button>
      <div className="sokoban-movebutton sokoban-button-midpoint">
        {midpoint1}
      </div>
    </div>
  );
}

const arrows = ["", "scale(-1, 1)", "scale(1, -1)", "scale(-1, -1)"].map(
  item => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    transform={item}
  >
    <polygon points="3 11 22 2 13 21 11 13 3 11" />
  </svg>
  )
)

const midpoint1 = (
  <svg
     fill="currentColor"
     stroke="currentColor"
     viewBox="0 0 410 410"
     stroke-width="1"
  >
    <path
       d="M 307.63729,205 350.14995,123.95808 205,147.69427 59.850052,123.95808 102.36271,205 59.850052,286.04192 205,262.30573 350.14995,286.04192 Z m -120.3385,9.88316 c -9.76045,-5.44958 -9.76045,-14.31674 0,-19.76632 9.76044,-5.44958 25.64198,-5.44958 35.40242,0 9.76045,5.44958 9.76045,14.31674 0,19.76632 -9.76044,5.44958 -25.64198,5.44958 -35.40242,0 z"
    />
  </svg>
  
)