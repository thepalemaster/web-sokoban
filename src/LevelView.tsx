import {Level} from "./levels"
import {GameAction} from "./setupState"

type LevelViewProps = {
  value: number,
  item: Level,
  status: string,
  handler: React.Dispatch<GameAction>,
}

export function LevelView (props: LevelViewProps) {
  return (
  <button value={props.value} onClick={event=>props.handler({type:"new", payload: props.value})}>
    {props.status === "1" ? "[solved]" : ""} Level #{props.value + 1} ({props.item.boxes.length === 1 ? "1 box" :
     `${props.item.boxes.length} boxes`}, size: {props.item.field.heigth} × {props.item.field.width})
  </button>
  ) 
}
