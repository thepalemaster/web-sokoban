import React from "react";
import { Level } from "./levels";
import { GameAction } from "./setupState";

type LevelChooserProps = {
  levels: Array<Level>,
  chooseFn: React.Dispatch<GameAction>
}

export function LevelChooser (props: LevelChooserProps) {
  const levelList = props.levels.map((item, index)=>
      <label key={index}>
        <input value={index} name="level" onChange={event=>props.chooseFn({type:"new", payload: parseInt(event.target.value)})} type="radio"/>
        <div>Уровень №{index + 1}</div>
      </label>
  );
  return (
  <div className="sokoban-chooser">
    {levelList}
  </div>
  );
} 
