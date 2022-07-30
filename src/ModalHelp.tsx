import React, { useEffect } from "react";

type ModalHelpProps = {
  visible: boolean,
  onClose: ()=>void
}


export function ModalHelp (props: ModalHelpProps) {
  const closeOnEscape = (event: KeyboardEvent)=> {
    if (event.key === "Escape") {
      props.onClose()
    }
  }
  const modalClose = (event: Event)=>{props.onClose();}

  useEffect (()=>{
    if (props.visible) {
      document.body.addEventListener("keydown", closeOnEscape);
      window.addEventListener("scroll", modalClose);
    } else {
      return;
    }
    return () =>{
      window.removeEventListener("keydown", closeOnEscape);
      document.body.removeEventListener("scroll", modalClose);
    }
  }, [props.visible])
  return (
    <div className={`sokoban-modal ${props.visible ? `show` : ``}`} onClick={(event)=>{event.stopPropagation(); props.onClose();}}>
      <div className="sokoban-help" onClick={(event)=>event.stopPropagation()}>
        <div className="sokoban-help-text">
          <h2>Rules</h2>
          Push all the boxes on to the storage locations (green areas).
          Boxes can only be moved if there is a free space beyond it.
          <h2>Controls</h2>
          <h3>Direct control</h3>
          You can move the player by using the arrow keys or by using direction buttons in right bottom corner.<br/>
          Undo last move: button<br/>
	  Reset level: button<br/>
	  Get this help: button<br/>
          <h3>Playing by mouse (or touch)</h3>
          You can move the player by just clicking at the position the player should move to. If it's impossible for the player to move to the clicked position the player simply doesn't move at all.
          To push a box to a certain position, you have to click on it to select it first. Game indicates which positions the box can be pushed to. After selecting a box simply click on the target position.
        </div>
        <div className="sokoban-modal-footer">
          <button onClick = {props.onClose} className="sokoban-command-button">Закрыть</button>
        </div>
      </div>

    </div>
  )
}
