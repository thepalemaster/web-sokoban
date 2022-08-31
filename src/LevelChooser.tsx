import React from "react";
import {LevelList} from "./LevelList";
import {GameAction} from "./setupState";

type LevelChooserProps = {
  chooseFn: React.Dispatch<GameAction>
}

export function LevelChooser (props: LevelChooserProps) {
  return (
  <div className="sokoban-chooser">
    <LevelList chooseFn={props.chooseFn} />
  </div>
  );
} 
