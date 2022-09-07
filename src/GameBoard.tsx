import React, { useMemo } from 'react';
import {Field, Cell} from './levels';
import {Highlight} from './gameObjectsHelpers'
import {toIndex} from './setupState'

type GameBoardProps = Field & {size: number, onClick: React.MouseEventHandler<HTMLDivElement>, highlight: Highlight}

export function GameBoard (props: GameBoardProps) {
    const [initalCells, boardStyle] = useMemo(()=>createInitalBoard(props), [props.cells, props.size]);
    let divCells = writeHighlitedCells(props, initalCells);
    return (
        <div className='sokoban-grid isomeric' style={boardStyle} onClick={props.onClick}>
            {divCells}
        </div>
    )
}

function writeHighlitedCells(props: GameBoardProps, initalCells: Array<JSX.Element>) {
    if(!props.highlight) return initalCells; 
    const divCells = [...initalCells];
    const {x, y} = props.highlight.entry;
    const max = Math.max(props.heigth, props.width);
    const index = toIndex(x, y, max);
    const stateIndex = toIndex(x, y, props.width)
    let i = 1;
    while (i <= props.highlight.directions.N) {
        const key = index - max * i;
        if (props.cells[stateIndex - props.width * i] === "E") {
            divCells[key] = createCell("H", -key);
        } else if (props.cells[stateIndex - props.width * i] === "X") {
            divCells[key] = createCell("Y", -key);
        }
        ++i
    }
    i = 1;
    while (i <= props.highlight.directions.S) {
        const key = index + max * i;
        if (props.cells[stateIndex + props.width * i] === "E") {
            divCells[key] = createCell("H", -key);
        } else if (props.cells[stateIndex + props.width * i] === "X") {
            divCells[key] = createCell("Y", -key);
        }
        ++i
    }
    i= 1
    while (i <= props.highlight.directions.W) {
        const key = index - i;
        if (props.cells[stateIndex - i] === "E") {
            divCells[key] = createCell("H", -key);
        } else if (props.cells[stateIndex - i] === "X") {
            divCells[key] = createCell("Y", -key);
        }
        ++i;
    }
    i = 1;
    while (i <= props.highlight.directions.E) {
        const key = index + i;
        if (props.cells[stateIndex + i] === "E") {
            divCells[key] = createCell("H", -key);
        } else if (props.cells[stateIndex + i] === "X") {
            divCells[key] = createCell("Y", -key);
        }
        ++i
    }
    return divCells;
}

function createCell (item: Cell|"H"|"Y", index:number) {
    switch(item) {
        case " ":
            return <div className='sokoban-empty' key={index}></div>;
            break;
        case "E":
            return <div className='sokoban-normalcell sokoban-cell' key={index}></div>;
            break;
        case "X":
            return <div className='sokoban-targetcell sokoban-cell' key={index}></div>;
            break;
        case "H":
            return <div className='sokoban-cell-highlight sokoban-cell' key={index}></div>;
            break;
        case "Y":
            return <div className='sokoban-targetcell-highlight sokoban-cell' key={index}></div>;
            break;
    }
}

function createInitalBoard ({cells, width, heigth, size}:GameBoardProps) {
    const maxDim = Math.max(heigth, width);
    const boardStyle = {
        gridTemplateRows: `repeat(${maxDim}, 1fr)`, 
        gridTemplateColumns: `repeat(${maxDim}, 1fr)`, 
        top: (1 / 1.41 - 1) / 2 * size, 
        left: (1.41 - 1) / 2 * size, 
        height: size, 
        width: size
    }
    let divCells: Array<JSX.Element> = [];
    if (width < heigth) {
        divCells = cells.reduce((acc, item, index)=>{
            acc.push(createCell(item, index));
            if ((index + 1) % width === 0) {
                const emptyCells = new Array(heigth - width)
                    .fill(undefined)
                    .map((itm, i)=>createCell(" ", cells.length + index + i))
                acc.push(...emptyCells);
            }        
            return acc;
        }, divCells);
    } else {
        divCells = cells.map((item, index)=>createCell(item, index));
        if (width > heigth) {
            const emptyCells = new Array((width - heigth) * width)
                .fill(undefined)
                .map((itm, i) => createCell(" ", divCells.length + i));
            divCells.push(...emptyCells);
        }
    }
    const array: [typeof divCells, typeof boardStyle] = [divCells, boardStyle];
    return array;
}