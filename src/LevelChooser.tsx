import React from "react";
import {LevelList} from "./LevelList";
import { ModalSokoban } from "./ModalSokoban";
import {GameAction} from "./setupState";

type LevelChooserProps = {
  chooseFn: React.Dispatch<GameAction>,
  visible: boolean,
  onClose: ()=>void,
}

export function LevelChooser (props: LevelChooserProps) {
  return (
      <ModalSokoban visible={props.visible} onClose={props.onClose}>
        <div className="sokoban-modal-window">
          <h3>Choose level:</h3>
          <LevelList chooseFn={props.chooseFn}/>
          <div className="sokoban-modal-footer">
          <button onClick={props.onClose} className="sokoban-command-button">
            Close
          </button>
          </div>
        </div>
    </ModalSokoban>
  )
}