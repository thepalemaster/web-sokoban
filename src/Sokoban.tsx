import React, {useEffect, useRef, useState, useReducer} from 'react';
import {levels, Level} from './levels';
import {GameObjects} from './GameObjects';
import {setupState, initState, getStateCoordX, getStateCoordY, isHighlight ,toIndex, GameState} from './setupState';
import {GameBoard} from './GameBoard'
import {MoveButtons} from './MoveButtons';
import {CommandButtons} from './CommandButtons';
import {offsetBoxToBase} from './BoxImage';
import {DestinationPos, getDirection, adjacentCellList} from './pathFinder';
import {Highlight, HighlightObject, checkHighlighte, getPathWithBox, getPath} from './gameObjectsHelpers';

import { LevelChooser } from './LevelChooser';

export type SokobanProps = {boardSize: number, height: number, width: number};

export function Sokoban(props: SokobanProps) {
    const [state, dispatch] = useReducer(setupState, 0, initState);
    const maxBoardSize= Math.max(state.initalLevel.field.heigth, state.initalLevel.field.width);
    const step = props.boardSize / 1.41 / (2 * Math.max(state.initalLevel.field.heigth, state.initalLevel.field.width));
    const mainBox = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        const {x, y} = state.field[state.workerIndex];
        if(!state.effectUI || !("path" in state.effectUI)) {
            return;
        }
        const target = state.effectUI
        const timeoutID = setTimeout(()=>{
            const pos = target.next()
            if (!pos) {
                return;
            }
            dispatch({type: getDirection({x, y}, pos)});
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
        event.stopPropagation();
        dispatch({type: "noeffect"});
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
        const target = {x: targetX, y: targetY};
        if (isHighlight(state.effectUI) && checkHighlighte(target, state.effectUI)) {
            console.log("HIGH!!", state)
            dispatch({type: "push", payload: target})            
        } else {
            dispatch({type:"path", payload: target})
        }
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
        dispatch({type: "box", payload: {x: targetX, y: targetY}}) 
    }

    const mouseWorkerHandler = (event: React.MouseEvent) => {
        const tag = (event.target as HTMLElement).tagName.toLowerCase();
        if (tag === "svg") {
            return mouseHandler(event);
        }
        event.stopPropagation()
        event.preventDefault()
    }

    const stl = getSizeBox(props.width, props.height);
    const highlight = isHighlight(state.effectUI) ? state.effectUI : null;
    return (
        <div className="sokoban-main" style={stl} ref={mainBox} tabIndex={0} onKeyDown={keyArrowHandler}>
            <LevelChooser levels={levels} chooseFn={dispatch}/>
            <GameBoard size={props.boardSize} highlight={highlight} {...state.initalLevel.field} onClick={mouseHandler} />
            <GameObjects workerHandler={mouseWorkerHandler} boxHandler={mouseBoxHandler} state={state} step={step} />
            <MoveButtons dispatcher={dispatch} size={step * 4}/>
            <CommandButtons dispatcher={dispatch} size={step * 2}/>
        </div>
    )
}


function getSizeBox (width: number, height: number) {
    if (width > height) {
        return {
            height: height / 1.41,
            width: height * 1.41
        }
    } else {
        return {
            height: width / 2,
            width: width / 1.41
        }
    }
}

