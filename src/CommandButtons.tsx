import React, { useCallback, useState } from "react";
import { GameAction } from "./setupState";
import {ModalHelp} from "./ModalHelp"

type CommandButtonsProps = {
  size: number;
  dispatcher: React.Dispatch<GameAction>;
};

export function CommandButtons(props: CommandButtonsProps) {
  const [helpVisibility, setHelpVisibility] = useState(false);
  const closeModal = useCallback (() => {setHelpVisibility(false)}, []);
  const buttonsStyle = {
    width: props.size,
    height: props.size,
  };
  return (
    <div style={buttonsStyle} className="sokoban-commands">
      <button className="sokoban-command-button"
        onClick={() => {setHelpVisibility(true)}}
      >
        Справка
      </button>
      <button className="sokoban-command-button"
        onClick={() => {
          props.dispatcher({ type: "reset" });
        }}
      >Сброс</button>
      <button className="sokoban-command-button"
        onClick={() => {
          props.dispatcher({ type: "undo" });
        }}
      >Отмена</button>
      <ModalHelp visible = {helpVisibility} onClose = {() => {setHelpVisibility(false)}} />
    </div>
  )
}