import React, {useEffect, useRef} from 'react';
import {useState, useReducer} from 'react';
import {levels, Level} from './levels';
import {GameObjects} from './GameObjects';
import {setupState, initState, getStateCoordX, getStateCoordY, toIndex} from './setupState';
import {GameBoard} from './GameBoard'
import {MoveButtons} from './MoveButtons';
import {CommandButtons} from './CommandButtons';
import {offsetBoxToBase} from './BoxImage';
import {DestinationPos, getDirection, adjacentCellList} from './pathFinder';
import {Highlight, HighlightObject, checkHighlighte, getPathWithBox, getPath} from './gameObjectsHelpers';

import {updateUI, initStateUI} from './sokobanReducer';
import { LevelChooser } from './LevelChooser';

export type SokobanProps = {boardSize: number};

export function Sokoban(props: SokobanProps) {
    const [levelIndex, setLevelIndex] = useState(2);
    const currentLevel = levels[levelIndex];
    const step = props.boardSize / 1.41 / (2 * Math.max(currentLevel.field.heigth, currentLevel.field.width));
    const [state, dispatch] = useReducer(setupState, levels[2], initState);
    const [stateUI, handlerFn] = useReducer(updateUI, state, initStateUI);
    const [target, setTarget] = useState<DestinationPos>(null);
    const [highlightedCell, setHighlightedCell] = useState<Highlight>(null);
    const [index, setIndex] = useState(0);
    const mainBox = useRef<HTMLDivElement>(null);
    const maxBoardSize= Math.max(state.initalLevel.field.heigth, state.initalLevel.field.width);

    useEffect(()=>{
        const {x, y} = state.field[state.workerIndex];
        if(target === null || 
            x !== target[index]?.x || y !== target[index].y) {
            return;
        }
        const timeoutID = setTimeout(()=>{
            if (target.length <= index + 1) {
                setIndex(0);
                setTarget(null);
                return;
            }
            dispatch({type: getDirection(target[index], target[index + 1])});
            setIndex(i=>i+1);
        }, 300);
        return ()=> {
            clearTimeout(timeoutID);
        };
    });

    const keyArrowHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        switch(event.code) {
            case "ArrowUp":
                dispatch({type:"N"});
                break;
            case "ArrowDown":
                dispatch({type:"S"});
                break;
            case "ArrowLeft":
                dispatch({type:"W"});
                break;
            case "ArrowRight":
                dispatch({type:"E"});
                break;
            default:
                return;
        }
        event.preventDefault();
        clearPath();
    }

    const clearPath = () => {
        setHighlightedCell(null);
        setTarget(null);
        setIndex(0);
    }

    const mouseHandler = (event: React.MouseEvent) => {
        event.stopPropagation()
        event.preventDefault()
        const rect = mainBox.current?.getBoundingClientRect();
        let x = event.clientX;
        let y = event.clientY;   
        if (rect) {
            x -= rect.x;
            y -= rect.y;
        } 
        const targetX = getStateCoordX(x, y, step, maxBoardSize);
        const targetY = getStateCoordY(x, y, step, maxBoardSize);
        console.log(targetX, targetY);
        console.log("coords", x, y)
        if (checkHighlighte({x: targetX, y: targetY}, highlightedCell)) {
            setTarget(getPathWithBox(state,{x:targetX, y:targetY}, highlightedCell));
        } else {
            setTarget(getPath(state, {x:targetX, y:targetY}));           
        }
        setHighlightedCell(null);
        setIndex (0);
    }

    const mouseBoxHandler = (event: React.MouseEvent) => {
        const tag = (event.target as HTMLElement).tagName.toLowerCase();
        if (tag === "svg") {
            return mouseHandler(event);
        }
        event.stopPropagation()
        event.preventDefault()
        const rect = mainBox.current?.getBoundingClientRect();
        let x = event.clientX;
        let y = event.clientY;   
        if (rect) {
            x -= rect.x;
            y -= rect.y;
        } 
        let [offsetBoxX, offsetBoxY] = offsetBoxToBase(step);
        x = x - event.nativeEvent.offsetX + offsetBoxX;
        y = y - event.nativeEvent.offsetY + offsetBoxY;
        const targetX = getStateCoordX(x, y, step, maxBoardSize);
        const targetY = getStateCoordY(x, y, step, maxBoardSize);
        console.log(targetX, targetY);
        const boxCell = state.field[toIndex(targetX, targetY, state.initalLevel.field.width)];
        if (boxCell.box === null) return;
        const adjacentCells: HighlightObject = adjacentCellList(state, {x: targetX, y: targetY});
        setHighlightedCell({entry: {x: targetX, y: targetY}, directions: adjacentCells});
        setTarget(null);
        setIndex(0);    
    }

    const mouseWorkerHandler = (event: React.MouseEvent) => {
        const tag = (event.target as HTMLElement).tagName.toLowerCase();
        if (tag === "svg") {
            return mouseHandler(event);
        }
        event.stopPropagation()
        event.preventDefault()
        clearPath();
    }

    const chooseHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type:"new", payload: levels[+event.target.value]})
        setLevelIndex(+event.target.value);
    }
    const stl = {height: props.boardSize / 1.41, width: props.boardSize * 1.41}
    return (
        <div className="sokoban-main" style={stl} ref={mainBox} tabIndex={0} onKeyDown={keyArrowHandler}>
            <LevelChooser levels={levels} chooseFn={chooseHandler} size={step}/>
            <GameBoard size={props.boardSize} highlight={highlightedCell} {...currentLevel.field} onClick={mouseHandler} />
            <GameObjects levelID={levelIndex} workerHandler={mouseWorkerHandler} boxHandler={mouseBoxHandler} state={state} step={step} />
            <MoveButtons dispatcher={dispatch} size={step * 4} additionalAction={clearPath}/>
            <CommandButtons dispatcher={dispatch} size={step * 2}/>
        </div>
    )
}