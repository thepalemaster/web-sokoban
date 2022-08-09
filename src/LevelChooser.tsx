import React from "react";
import { Level } from "./levels";

type LevelChooserProps = {
  levels: Array<Level>,
  size: number,
  chooseFn: (event: React.ChangeEvent<HTMLInputElement>)=>void
}

export function LevelChooser (props: LevelChooserProps) {
  const levelList = props.levels.map((item, index)=>
    <div key={index}>
      <label>
        <input value={index} name="level" onChange={props.chooseFn} type="radio"/>
        Уровень №{index + 1}
      </label>
    </div>
  );
  const style = {width: props.size *4, height: props.size * 2,}
  return (
  <div className="sokoban-chooser" style={style}>
    {levelList}
  </div>
  );
} 
