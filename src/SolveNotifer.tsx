import React from "react"; 
import {GameAction, GameState} from "./setupState";
import {LevelList} from "./LevelList"

type SolveNotiferProps = {
  state: GameState
  dispatcher: React.Dispatch<GameAction>
}

export function SolveNotifer (props: SolveNotiferProps) {
  return (
    props.state.solution.solved ? 
    <div className="sokoban-notifer">
      <span className="sokoban-notifer-message">SOLVED!</span>
      <LevelList chooseFn={props.dispatcher}/>
    </div> 
    : null
  )
}
