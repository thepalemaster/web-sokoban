import {Level, Direction, Cell} from "./levels";

type GameCell = {
    type: Cell,
    box: number|null,
    x: number,
    y: number
}

type FieldInfo = {        
    fieldID: number,
    width: number,
    heigth: number,
}

export type MoveResult = {
    box: null | number,
    worker: null | Direction
}

type Solution = {
    solved: boolean,
    targets: Array<number>
}

export type GameState = {
    fieldInfo: FieldInfo,
    lastMove: MoveResult,
    workerIndex: number,
    field: Array<GameCell>,
    solution: Solution

}

export type GameAction = {
    type: Direction
}

export function setupState (state: GameState, action: GameAction) {
    switch(action.type) {
        case "N":
        case "E":
        case "S":
        case "W":
            if(checkPossibleMove(state, action.type)) {
                return setupDirection(state, action.type);
            } else {
                return {...state, lastMove: {worker: null, box: null}}
            }
            break;
    }
    return state;
}

let levelID = 0;

export function initState (initalLevel: Level) {
    const state: GameState = {
        fieldInfo: {
            fieldID: ++levelID,
            width: initalLevel.field.width,
            heigth: initalLevel.field.heigth
        },
        lastMove: {worker: null, box: null},
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
            solved: false,//function???
            targets: []
        }
    }
    state.solution.targets = state.field.reduce<Array<number>>(
        (acc, item, index)=>{
            if(item.type === "X") acc.push(index);
            return acc;
        }, []);
    initalLevel.boxes.forEach ((item, index) => {
        state.field[toIndex(item.position.x, item.position.y, initalLevel.field.width)].box = index;

    })
    return state;
}

function setupDirection (state: GameState, direction: Direction): GameState{
    let newWorkerIndex = state.workerIndex;
    let newBoxIndex;
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
            newWorkerIndex -= state.fieldInfo.width;
            newBoxIndex = newWorkerIndex - state.fieldInfo.width;
            break;
        case "S":
            newWorkerIndex += state.fieldInfo.width;
            newBoxIndex = newWorkerIndex + state.fieldInfo.width;
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
        /*newField[newBoxIndex].box = newField[newWorkerIndex].box;
        newField[newWorkerIndex].box = null;*/
        if (state.solution.targets.every(item=>newField[item].box !== null)) {
            console.log("win-win");
        }
        return (
            {
                ...state,
                lastMove: {
                    worker: direction,
                    box: newField[newBoxIndex].box
                },
                workerIndex: newWorkerIndex,
                field: newField
            }
        )
    } else {
        return {
            ...state, 
            lastMove: {worker: direction, box: null},
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
            if (x > state.fieldInfo.width) return false;
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
            newIndex -= state.fieldInfo.width;
            break;
        case "S":
            y++;
            if (y > state.fieldInfo.heigth) return false;
            boxY += 2;
            newIndex += state.fieldInfo.width;
            break;
    }
    const cell = state.field[newIndex];
    if (cell.type === " ") return false;
    if (cell.box !== null) {
        if (boxX < 1 || boxX > state.fieldInfo.width ||
            boxY < 1 || boxY > state.fieldInfo.heigth) return false;

        const boxCell = state.field[toIndex(boxX, boxY, state.fieldInfo.width)];
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

export function getStateCoords(clientX: number, clientY: number, step:number, size: number){
    let lineX = getStateCoordX(clientX, clientY, step, size);
    let lineY = getStateCoordY(clientX, clientY, step, size);
    let xx = getCoordX(lineX, lineY, step, size);
    let yy = getCoordY(lineX, lineY, step, size);
    console.log(clientX, xx, clientY, yy)
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