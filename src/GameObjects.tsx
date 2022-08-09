import React, {useRef, useState} from "react";
import { GameState, MoveResult, getCoordX, getCoordY } from "./setupState";
import { Direction } from "./levels";
import { BoxObject } from "./BoxObject";
import { WorkerObject } from "./WorkerObject";

type GameObjectsProps = {
  state: GameState;
  step: number;
  levelID: number;
  boxHandler: React.MouseEventHandler<HTMLDivElement>;
  workerHandler: React.MouseEventHandler<HTMLDivElement>;
};

type WorkerItem = {
  type: "worker";
  x: number;
  y: number;
  id: -1;
  direction: Direction;
};

type BoxItem = {
  type: "box";
  x: number;
  y: number;
  id: number;
  placed: boolean;
};

type ObjectItem = WorkerItem | BoxItem;

type ViewState = {
  orderByID: Array<ObjectItem>;
  viewOrder: Array<ObjectItem>;
  viewWorkerIndex: number;
  previousStateIndex: number;
};

type MoveStep = -1 | 1;

export function GameObjects(props: GameObjectsProps) {
  const prevProps = useRef({level: props.levelID, step: props.step, index: props.state.workerIndex});
  const viewState = useRef(initViewState(props));
  if (prevProps.current.step !== props.step || prevProps.current.level !== props.levelID) { 
    viewState.current = initViewState(props);
    prevProps.current.step = props.step;
    prevProps.current.level = props.levelID;
  } else {
    switch (props.state.lastMove.status) {
      case "nomove":
        const worker = viewState.current.viewOrder[
          viewState.current.viewWorkerIndex
        ] as WorkerItem;
        worker.direction = props.state.lastMove.worker;
        break;
      case "normal":
        if(prevProps.current.index !== props.state.workerIndex) {
         applyChanges(props, viewState.current);
        }
        break;
      case "reset":
        viewState.current = initViewState(props);
        break;
    }
  }
  prevProps.current.index = props.state.workerIndex;
  return (
    <div className="sokoban-objects">
      {viewState.current.viewOrder.map((item) => {
        switch (item.type) {
          case "box":
            return (
              <BoxObject
                key={item.id}
                x={item.x}
                y={item.y}
                placed={item.placed}
                scale={props.step}
                onClick={props.boxHandler}
              />
            );
            break;
          case "worker":
            return (
              <WorkerObject
                key={-1}
                x={item.x}
                y={item.y}
                direction={item.direction}
                scale={props.step}
                onClick={props.workerHandler}
              />
            );
            break;
        }
      })}
    </div>
  );
}





export function GameObjects1(props: GameObjectsProps) {
  const [prevProps, updateProps] = useState({level: props.levelID, step: props.step});
  const [state, setState] = useState(initViewState(props))
  if (prevProps.step !== props.step || prevProps.level !== props.levelID) {
    setState(initViewState(props));
    updateProps({level: props.levelID, step: props.step});
  } else {
    switch (props.state.lastMove.status) {
      case "nomove":
        const worker = { ...state.viewOrder[
          state.viewWorkerIndex
        ] as WorkerItem, direction: props.state.lastMove.worker};
        const viewOrder = [...state.viewOrder];
        viewOrder[state.viewWorkerIndex] = worker;
        setState({...state, viewOrder})
        break;
      case "normal":
        setState(getStateWithChanges(props, state));
        break;
      case "reset":
        setState(initViewState(props));
        break;
    }
  }
  return (
    <div className="sokoban-objects">
      {state.viewOrder.map((item) => {
        switch (item.type) {
          case "box":
            return (
              <BoxObject
                key={item.id}
                x={item.x}
                y={item.y}
                placed={item.placed}
                scale={props.step}
                onClick={props.boxHandler}
              />
            );
            break;
          case "worker":
            return (
              <WorkerObject
                key={-1}
                x={item.x}
                y={item.y}
                direction={item.direction}
                scale={props.step}
                onClick={props.workerHandler}
              />
            );
            break;
        }
      })}
    </div>
  );
}



function initViewState(props: GameObjectsProps) {
  const maxSize = Math.max(
    props.state.initalLevel.field.heigth,
    props.state.initalLevel.field.width
  );
  let workerIndex = 0;
  const view = props.state.field.reduce(
    (acc: Array<ObjectItem>, item, index) => {
      if (props.state.workerIndex === index) {
        acc.push({
          direction: props.state.lastMove.worker,
          type: "worker",
          x: getCoordX(item.x, item.y, props.step, maxSize),
          y: getCoordY(item.x, item.y, props.step, maxSize),
          id: -1,
        });
      }
      if (item.box !== null) {
        acc.push({
          id: item.box,
          placed: item.type === "X" ? true : false,
          type: "box",
          x: getCoordX(item.x, item.y, props.step, maxSize),
          y: getCoordY(item.x, item.y, props.step, maxSize),
        });
      }
      return acc;
    },
    []
  );
  view.sort(viewOrderComparator);
  const byID = new Array(view.length - 1);
  view.forEach((item, index) => {
    if (item.type === "box") {
      byID[item.id] = item;
    } else {
      workerIndex = index;
    }
  });
  return {
    orderByID: byID,
    viewOrder: view,
    viewWorkerIndex: workerIndex,
    previousStateIndex: props.state.workerIndex,
  };
}

function applyChanges(props: GameObjectsProps, viewState: ViewState) {
  viewState.previousStateIndex = props.state.workerIndex;
  const worker = viewState.viewOrder[viewState.viewWorkerIndex];
  if (worker.type === "worker") {
    worker.direction = props.state.lastMove.worker;
  }
  [worker.x, worker.y] = newCoordinates(
    props.state.lastMove.worker,
    props.step,
    worker
  );
  if (props.state.lastMove.box !== null) {
    const box = viewState.orderByID[props.state.lastMove.box];
    [box.x, box.y] = newCoordinates(
      props.state.lastMove.worker,
      props.step,
      box
    );
  }
  applyViewOrder(props, viewState);
}

function getStateWithChanges(props: GameObjectsProps, viewState: ViewState) {
  const newState = {...viewState, reviousStateIndex: props.state.workerIndex};
  const worker = {...viewState.viewOrder[viewState.viewWorkerIndex] as WorkerItem,
    direction: props.state.lastMove.worker};
  [worker.x, worker.y] = newCoordinates(
    props.state.lastMove.worker,
    props.step,
    worker
  );
  if (props.state.lastMove.box !== null) {
    const box = {...viewState.orderByID[props.state.lastMove.box]};
    [box.x, box.y] = newCoordinates(
      props.state.lastMove.worker,
      props.step,
      box
    );
  }
  applyViewOrder(props, newState);
  return newState;
}

function applyViewOrder(props: GameObjectsProps, viewState: ViewState) {
  switch (props.state.lastMove.worker) {
    case "N":
      moveObjects(props.state.lastMove, viewState, -1);
      break;
    case "S":
      moveObjects(props.state.lastMove, viewState, 1);
      break;
    case "E":
      moveObjects(props.state.lastMove, viewState, -1);
      break;
    case "W":
      moveObjects(props.state.lastMove, viewState, 1);
      break;
    default:
      return;
  }
}

function moveObjects(
  lastMove: MoveResult,
  viewState: ViewState,
  step: MoveStep
) {
  const lastIndex = step > 0 ? viewState.viewOrder.length - 1 : 0;
  if (lastIndex === viewState.viewWorkerIndex) return;
  if (lastMove.box !== null) {
    let boxIndex = viewState.viewWorkerIndex + step;
    while (
      boxIndex !== lastIndex &&
      viewState.viewOrder[boxIndex].id !== lastMove.box
    )
      boxIndex += step;
    localSort(viewState.viewOrder, boxIndex, step);
  }
  viewState.viewWorkerIndex = localSort(
    viewState.viewOrder,
    viewState.viewWorkerIndex,
    step
  );
}

function localSort(arr: ObjectItem[], start: number, step: MoveStep) {
  const stop = step > 0 ? arr.length - 1 : 0;
  while (
    start !== stop &&
    step * viewOrderComparator(arr[start], arr[start + step]) > 0
  ) {
    const tmp = arr[start + step];
    arr[start + step] = arr[start];
    arr[start] = tmp;
    start += step;
  }
  return start;
}

function newCoordinates(
  direction: Direction,
  step: number,
  object: ObjectItem
) {
  const stepX = step * 2;
  let x = object.x;
  let y = object.y;
  switch (direction) {
    case "N":
      x -= stepX;
      y -= step;
      break;
    case "S":
      x += stepX;
      y += step;
      break;
    case "E":
      x += stepX;
      y -= step;
      break;
    case "W":
      x -= stepX;
      y += step;
      break;
  }
  return [x, y];
}

function viewOrderComparator(a: ObjectItem, b: ObjectItem) {
  const result = a.y - b.y;
  if (result < 0.1 && result > -0.1) return a.x - b.x;
  return result;
}
