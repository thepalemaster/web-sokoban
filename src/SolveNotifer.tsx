import React from "react"; 
import {GameAction, GameState} from "./setupState";
import {LevelList} from "./LevelList"
import {setSolved} from "./solutions"

type SolveNotiferProps = {
  state: GameState
  dispatcher: React.Dispatch<GameAction>
}

export function SolveNotifer(props: SolveNotiferProps) {
  if (props.state.solution.solved) {
    setSolved(props.state.solution.levelID);
    return (
      <div className="sokoban-notifer">
        <h2 className="sokoban-notifer-message">SOLVED!</h2><p>Choose another level:</p>
        <LevelList chooseFn={props.dispatcher} />
      </div>
    );
  } else {
    return null;
  }
}
