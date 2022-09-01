import React from "react";
import {levels} from "./levels";
import {GameAction} from "./setupState";
import {getSolvedLevels} from "./solutions";

type LevelListProps = {
  chooseFn: React.Dispatch<GameAction>
}

export function LevelList (props: LevelListProps) {
  const status = getSolvedLevels();
  return (
    <>
      {levels.map((item, index)=>
        <label key={index} >
          <input value={index} name="level" onChange={event=>props.chooseFn({type:"new", payload: parseInt(event.target.value)})} type="radio"/>
          <div className={status[index]==="1" ? "solved" : ""}>Уровень №{index + 1}</div>
        </label>)}
    </>
    )
} 