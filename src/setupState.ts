import {Highlight, getPathWithBox} from "./gameObjectsHelpers";
import {Level, Direction, Cell, levels} from "./levels";
import {DestinationPos, adjacentCellList, Position} from "./pathFinder";
import {HighlightObject, getPath} from './gameObjectsHelpers'

type GameCell = {
    type: Cell,
    box: number|null,
    x: number,
    y: number
}

type EffectUI = null | {
    path: DestinationPos,
    index: number,
    next: ()=> Position | null
} | Highlight

export type MoveResult = {
    box: null | number,
    status: "nomove"|"normal"|"reset"
    worker: Direction
}

type Solution = {
    solved: boolean,
    levelID: number,
    targets: Array<number>
}

export type GameState = {
    moves: number,
    pushes: number,
    effectUI: EffectUI,
    initalLevel: Level,
    lastMove: MoveResult,
    workerIndex: number,
    field: Array<GameCell>,
    solution: Solution,
    prevStates: Array<GameState>

}

export type GameAction = {
    type: Direction | "undo" | "reset" | "noeffect"
} | NewLevelAction | BoxAction | PathAction | PushAction

type NewLevelAction = {
    type: "new",
    payload: number
}

type BoxAction = {
    type: "box",
    payload: {x: number, y: number}
}

type PushAction = {
    type: "push",
    payload: {x: number, y: number}
}

type PathAction = {
    type: "path",
    payload: {x: number, y: number}
}

export function isHighlight (effect: EffectUI): effect is Highlight {
    if (!effect) return false;
    return "entry" in effect;
}

export function setupState (state: GameState, action: GameAction): GameState {
    switch(action.type) {
        case "N":
        case "E":
        case "S":
        case "W":
            if(checkPossibleMove(state, action.type)) {
                return setupDirection(state, action.type);
            } else {
                return {...state, lastMove: {box: null, status: "nomove", worker: action.type}};
            }
            break;
        case "reset":
            return createState(state.initalLevel);
            break;
        case "undo":
            const prevState = state.prevStates.pop();
            if (prevState) {
                prevState.lastMove.status = "reset";
                return prevState;
            } else {
                return state;
            }
            break;
        case "new":
            return initState(action.payload);
            break;
        case "box":
            const index = toIndex(action.payload.x, action.payload.y, state.initalLevel.field.width);
            const boxCell = state.field[index];
            if (boxCell.box === null) return state;
            const adjacentCells: HighlightObject = adjacentCellList(state, action.payload);
            return {...state, effectUI: {entry: action.payload, directions: adjacentCells}};
            break;
        case "path":
            const activePath = {
                path: getPath(state, action.payload),
                index: 1,
                next(){
                    if (this.path && this.path.length > this.index) {
                        return this.path[this.index++]
                    } else {
                        return null;
                    }
                }
            }
            return {...state, effectUI: activePath};
            break;
        case "noeffect": 
            return {...state, effectUI: null}
            break;
        case "push":
            if(isHighlight(state.effectUI)) {
                const activePath = {
                    path: getPathWithBox(state, action.payload, state.effectUI),
                    index: 1,
                    next(){
                        if (this.path && this.path.length > this.index) {
                            return this.path[this.index++]
                        } else {
                            return null;
                        }
                    }
                }
                return {...state, effectUI: activePath};
            } else {
                return state;
            }
            break;
        default:
            return state;
    }
}

export function initState (levelID: number) {
    const newState = createState(levels[levelID]);
    newState.solution.levelID = levelID
    return newState
}

function createState(initalLevel: Level) {
    const state: GameState = {
        moves: 0,
        pushes: 0,
        effectUI: null,
        initalLevel,
        lastMove: {worker: initalLevel.worker.direction, box: null, status: "reset"},
        field: initalLevel.field.cells.map((item, index)=>(
            {
                type: item,
                box: null,
                y: Math.trunc(index / initalLevel.field.width) + 1,
                x: index % initalLevel.field.width + 1
            })
        ),
        workerIndex: toIndex(initalLevel.worker.position.x, 
            initalLevel.worker.position.y, initalLevel.field.width),
        solution: {
            solved: false,
            levelID: -1,
            targets: []
        },
        prevStates: []
    }
    state.solution.targets = state.field.reduce<Array<number>>(
        (acc, item, index)=>{
            if(item.type === "X") acc.push(index);
            return acc;
        }, []);
        state.solution.solved = state.solution.targets
            .every(item=>state.field[item].box !== null);
    initalLevel.boxes.forEach ((item, index) => {
        state.field[toIndex(item.position.x, item.position.y, initalLevel.field.width)].box = index;

    })
    return state;
}

function setupDirection(state: GameState, direction: Direction): GameState{
    let newWorkerIndex = state.workerIndex;
    let newBoxIndex;
    if (state.solution.solved) {
        return state;
    }
    state.prevStates.push(state);
    switch (direction) {
        case "E":
            newWorkerIndex++;
            newBoxIndex = newWorkerIndex + 1;
            break;
        case "W":
            newWorkerIndex--;
            newBoxIndex = newWorkerIndex - 1;
            break;
        case "N":
            newWorkerIndex -= state.initalLevel.field.width;
            newBoxIndex = newWorkerIndex - state.initalLevel.field.width;
            break;
        case "S":
            newWorkerIndex += state.initalLevel.field.width;
            newBoxIndex = newWorkerIndex + state.initalLevel.field.width;
            break;
    }
    if (state.field[newWorkerIndex].box !== null) {
        const newField = [...state.field];
        const cell = {...newField[newWorkerIndex]};
        const boxCell = {...newField[newBoxIndex]};
        boxCell.box = cell.box;
        cell.box = null;
        newField[newWorkerIndex] = cell;
        newField[newBoxIndex] = boxCell;
        return (
            {
                ...state,
                moves: state.moves + 1,
                pushes: state.pushes + 1,
                solution: {
                    ...state.solution,
                    solved: state.solution.targets.every(item=>newField[item].box !== null)
                },
                lastMove: {
                    worker: direction,
                    status: "normal",
                    box: newField[newBoxIndex].box
                },
                workerIndex: newWorkerIndex,
                field: newField
            }
        )
    } else {
        return {
            ...state,
            moves: state.moves + 1,
            lastMove: {worker: direction, status: "normal", box: null},
            workerIndex:  newWorkerIndex
        }
    }
}

function checkPossibleMove(state: GameState, direction: Direction) {
    let {x, y} = state.field[state.workerIndex];

    let boxX = x;
    let boxY = y;
    let newIndex = state.workerIndex;
    switch (direction) {
        case "E":
            x++;
            if (x > state.initalLevel.field.width) return false;
            boxX += 2;
            newIndex++;
            break;
        case "W":
            if (x === 1) return false;
            x--;
            boxX -= 2;
            newIndex--;
            break;
        case "N":
            if (y === 1) return false;
            y--;
            boxY -= 2;
            newIndex -= state.initalLevel.field.width;
            break;
        case "S":
            y++;
            if (y > state.initalLevel.field.heigth) return false;
            boxY += 2;
            newIndex += state.initalLevel.field.width;
            break;
    }
    const cell = state.field[newIndex];
    if (cell.type === " ") return false;
    if (cell.box !== null) {
        if (boxX < 1 || boxX > state.initalLevel.field.width ||
            boxY < 1 || boxY > state.initalLevel.field.heigth) return false;
        const boxCell = state.field[toIndex(boxX, boxY, state.initalLevel.field.width)];
        if (invalidCell(boxCell)) return false;
    }
    return true;
}

export function getCoordX (posX: number, posY: number, step:number, size: number) {
    return (posX - 1 + posY) * step * 2;
}

export function getCoordY (posX: number, posY: number, step:number, size: number) {
    return (posY + size - posX) * step;
}

export function getStateCoordY(clientX: number, clientY: number, step:number, size: number){
    return Math.trunc((1 -  size + (clientX + 2 * clientY) / (2 * step)) / 2 + 0.5 );
}

export function getStateCoordX(clientX: number, clientY: number, step:number, size: number){
    return Math.trunc((size + (clientX - 2 * clientY) / (2 * step)) / 2 + 1);

}

export function invalidCell (cell: GameCell) {
    return cell.type === " " || cell.box !== null
}

export function toIndex(x: number, y: number, width: number) {
    return (y - 1)* width + x - 1;
}

export function fromIndex(index: number, width: number) {
    return {x: index % width + 1, y: Math.trunc(index / width) + 1}
}
