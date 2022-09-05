import React, {useState} from "react";
import {levels} from "./levels";
import {GameAction} from "./setupState";
import {getSolvedLevels} from "./solutions";
import {LevelView} from "./LevelView"

type LevelListProps = {
  chooseFn: React.Dispatch<GameAction>,
}

export function LevelList (props: LevelListProps) {
  const status = getSolvedLevels();
  return (
    <div className="sokoban-level-list">
      {levels.map((item, index)=>
        <LevelView key={index} item={item} value={index} status={status[index]} handler={props.chooseFn}/>
      )}
    </div>
    )
} 