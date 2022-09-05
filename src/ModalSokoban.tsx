import React, {useEffect} from "react";

type ModalSokobanProps = {
  visible: boolean,
  onClose: ()=>void,
  children: React.ReactNode
}

export function ModalSokoban (props: ModalSokobanProps) {
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
    <div
      className={`sokoban-modal ${props.visible ? `show` : ``}`}
      onClick={(event) => {
        event.stopPropagation();
        props.onClose();
      }}
    >
      {props.children}
    </div>
  );
}