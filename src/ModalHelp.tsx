import React from "react";
import {ModalSokoban} from "./ModalSokoban";

type ModalHelpProps = {
  visible: boolean,
  onClose: ()=>void
}

export function ModalHelp (props: ModalHelpProps) {
  return (
    <ModalSokoban visible={props.visible} onClose={props.onClose}>
      <div
        className="sokoban-modal-window"
        onClick={(event) => event.stopPropagation()}
      >
        <div>
          <h2>Rules</h2>
          <span>
            Push all the boxes on to the storage locations (green areas). Boxes
            can only be moved if there is a free space beyond it.
          </span>
          <h2>Controls</h2>
          <h3>Direct control</h3>
          <span>
            You can move the player by using the arrow keys or by using
            direction buttons in right bottom corner.
          </span>
          <h3>Playing by mouse (or touch)</h3>
          <span>
            You can move the player by just clicking at the position the player
            should move to. If it's impossible for the player to move to the
            clicked position the player simply doesn't move at all. To push a
            box to a certain position, you have to click on it to select it
            first. Game indicates which positions the box can be pushed to.
            After selecting a box simply click on the target position.
          </span>
        </div>
        <div className="sokoban-modal-footer">
          <button onClick={props.onClose} className="sokoban-command-button">
            Close
          </button>
        </div>
      </div>
    </ModalSokoban>
  );
}
