import React from "react";
import {levels} from "./levels";
import {GameAction} from "./setupState";

type LevelListProps = {
  chooseFn: React.Dispatch<GameAction>
}

export function LevelList (props: LevelListProps) {
  return (
    <>
      {levels.map((item, index)=>
        <label key={index}>
          <input value={index} name="level" onChange={event=>props.chooseFn({type:"new", payload: parseInt(event.target.value)})} type="radio"/>
          <div>Уровень №{index + 1}</div>
        </label>)}
    </>
    )
} 