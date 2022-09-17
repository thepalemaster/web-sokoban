import {GameState, toIndex, invalidCell} from './setupState';
import {Direction} from './levels';

export type Position = {x:number, y:number};
export type DestinationPos = Array<Position>|null;

export function adjacentCellList (state: GameState, position: Position) {
    const result = {
        "N": 0,
        "S": 0,
        "W": 0,
        "E": 0
    }
    const index = toIndex(position.x, position.y, state.initalLevel.field.width);
    const cell = state.field[state.workerIndex];
    let stop = Math.trunc(index / state.initalLevel.field.width);
    if (position.y > 1 && checkPath(state, {...position, y: position.y + 1}, [{ x: cell.x, y: cell.y }])) {
        for (let i = 1; i <= stop && !invalidCell(state.field[index - state.initalLevel.field.width * i]); i++) {
            result.N++;
        }
    }
    stop = state.initalLevel.field.heigth - stop - 1;
    if (position.y < state.initalLevel.field.heigth && checkPath(state, { ...position, y: position.y - 1 }, [{ x: cell.x, y: cell.y }])) {
        for (let i = 1; i <= stop && !invalidCell(state.field[index + state.initalLevel.field.width * i]); i++) {
            result.S++;
        }
    }
    stop = (index) % state.initalLevel.field.width;
    if (position.x > 1 && checkPath(state, { ...position, x: position.x + 1 }, [{ x: cell.x, y: cell.y }])) {
        for (let i = 1; i <= stop && !invalidCell(state.field[index - i]); i++) {
            result.W++;
        }
    }
    stop = state.initalLevel.field.width - stop - 1;
    if (position.x < state.initalLevel.field.width && checkPath(state, { ...position, x: position.x - 1 }, [{ x: cell.x, y: cell.y }])) {
        for (let i = 1; i <= stop && !invalidCell(state.field[index + i]); i++) {
            result.E++;
        }
    }
    return result;
}

export function checkPath (state: GameState, target: Position, path: Array<Position>): boolean  {
    const current = path.at(-1);
    if(!current) return false;
    if (equalPositions(current, target)) return true;
    const possible = getPossibleMoves(state, target, current, path);
    for (const cell of possible) {
        if (checkPath(state, target, [...path, cell])) {
            return true;
        } 
    }
    return false;   
}

export function pathFinder(state: GameState, target: Position, path: Array<Position>): Array<Position>|null {
    const current = path.at(-1);
    if(!current) return null;
    if (equalPositions(current, target)) return path;
    const possible = getPossibleMoves(state, target, current, path);
    let index = 0;
    while (index < possible.length) {
        const result = pathFinder(state, target, [...path, possible[index]]);
        if (result !== null) {
                let pos = -1;
                for (let currentIndex = index; currentIndex < possible.length; currentIndex++) {
                    const i = result.findIndex(item=>equalPositions(possible[currentIndex], item));
                    pos = i > pos ? i : pos;
                }
            return pos > 0 ? path.concat(result.slice(pos)) : result
        } else {
            index++;
        }
    }
    return null;    
}

function getPossibleMoves (state: GameState, target: Position, current: Position, path:Array<Position>) {
    const possibleMoves: Array<Position> = [];
    const deltaX = current.x - target.x;
    const deltaY = current.y - target.y;
    const stepX = deltaX > 0 ? -1 : 1;
    const stepY = deltaY > 0 ? -1 : 1;
    if(Math.abs(deltaX) > Math.abs(deltaY)) {
        addNewMove({x: current.x + stepX, y: current.y});
        addNewMove({x: current.x, y: current.y + stepY});
    } else {
        addNewMove({x: current.x, y: current.y + stepY});
        addNewMove({x: current.x + stepX, y: current.y});
    }
    addNewMove({x: current.x, y: current.y - stepY});
    addNewMove({x: current.x - stepX, y: current.y});
    return possibleMoves;

    function addNewMove (newMove: Position) {
        if (newMove.x < 1 || newMove.x > state.initalLevel.field.width || 
            newMove.y < 1 || newMove.y > state.initalLevel.field.heigth) return;
        const index = toIndex(newMove.x, newMove.y, state.initalLevel.field.width);
        const cell = state.field[index];
        if (invalidCell(cell)) return;
        if(path.some(item => equalPositions(item, cell))) return;
        possibleMoves.push(newMove);    
    }
}

function equalPositions(a:Position, b: Position) {
    return a.x === b.x && a.y === b.y;
}

export function getDirection(start:Position, stop: Position):Direction {
    if (stop.x === start.x) {
        if (stop.y > start.y) {
            return "S"
        } else return "N";
    } else if (stop.x > start.x) {
        return "E";
    } else return "W";
}