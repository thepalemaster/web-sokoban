import React, {useState} from "react";
import {GameAction} from "./setupState";
import {ModalHelp} from "./ModalHelp"

type CommandButtonsProps = {
  size: number;
  dispatcher: React.Dispatch<GameAction>;
};

export function CommandButtons(props: CommandButtonsProps) {
  const [helpVisibility, setHelpVisibility] = useState(false);
  const buttonsStyle = {
    width: props.size / 2,
    height: props.size * 1.5,
  };
  return (
    <div style={buttonsStyle} className="sokoban-commands">
      <button className="sokoban-button"
        onClick={() => {setHelpVisibility(true)}}
      >
        <svg
          viewBox="6 4 13 13"
          fill="currentColor">
            <path d="M 8.567,8.813 A 3.501,3.501 0 1 1 12,13 h -1 v -2 h 1 A 1.5,1.5 0 1 0 10.529,9.206 Z" />
            <path d="m 11,14 h 2 v 2 h -2 z" />
        </svg>
      </button>
      <button className="sokoban-button"
        onClick={() => {
          props.dispatcher({ type: "reset" });
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor">
            <path d="M4.625 8.897a8.001 8.001 0 0 0 11.345 10.05l.992 1.737A9.996 9.996 0 0 1 7 20.66C2.51 18.068.79 12.518 2.883 7.89L1.54 7.117l4.165-2.214.165 4.714-1.246-.719ZM19.375 15.103A8.001 8.001 0 0 0 8.03 5.053l-.992-1.737A9.996 9.996 0 0 1 17 3.34c4.49 2.592 6.21 8.142 4.117 12.77l1.342.774-4.165 2.214-.165-4.714z"/>
        </svg>
      </button>
      <button className="sokoban-button"
        onClick={() => {
          props.dispatcher({ type: "undo" });
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor">
            <path d="M5.828 7l2.536 2.536L6.95 10.95 2 6l4.95-4.95 1.414 1.414L5.828 5H13a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H5.828z"/>
        </svg>
      </button>
      <ModalHelp visible = {helpVisibility} onClose = {() => {setHelpVisibility(false)}} />
    </div>
  )
}