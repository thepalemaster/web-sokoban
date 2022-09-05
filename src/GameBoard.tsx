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
    const stateIndex = toIndex (x, y, props.width)
    let i = 1;
    while (i <= props.highlight.directions.N) {
        if (props.cells[stateIndex - props.width * i] === "E") {
            divCells[index - max * i] = createCell("H");
        } else if (props.cells[stateIndex - props.width * i] === "X") {
            divCells[index - max * i] = createCell("Y");
        }
        ++i
    }
    i = 1;
    while (i <= props.highlight.directions.S) {
        if (props.cells[stateIndex + props.width * i] === "E") {
            divCells[index + max * i] = createCell("H");
        } else if (props.cells[stateIndex + props.width * i] === "X") {
            divCells[index + max * i] = createCell("Y");
        }
        ++i
    }
    i= 1
    while (i <= props.highlight.directions.W) {
        if (props.cells[stateIndex - i] === "E") {
            divCells[index - i] = createCell("H");
        } else if (props.cells[stateIndex - i] === "X") {
            divCells[index - i] = createCell("Y");
        }
        ++i;
    }
    i = 1;
    while (i <= props.highlight.directions.E) {
        if (props.cells[stateIndex + i] === "E") {
            divCells[index + i] = createCell("H");
        } else if (props.cells[stateIndex + i] === "X") {
            divCells[index + i] = createCell("Y");
        }
        ++i
    }
    return divCells;
}

function createCell (item: Cell|"H"|"Y") {
    switch(item) {
        case " ":
            return <div className='sokoban-empty'></div>;
            break;
        case "E":
            return <div className='sokoban-normalcell sokoban-cell'></div>;
            break;
        case "X":
            return <div className='sokoban-targetcell sokoban-cell'></div>;
            break;
        case "H":
            return <div className='sokoban-cell-highlight sokoban-cell'></div>;
            break;
        case "Y":
            return <div className='sokoban-targetcell-highlight sokoban-cell'></div>;
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
            acc.push(createCell(item));
            if ((index + 1) % width === 0) {
                const emptyCells = new Array(heigth - width)
                    .fill(createCell(" "));
                acc.push(...emptyCells);
            }            
            return acc;
        }, divCells);
    } else {
        divCells = cells.map(item=>createCell(item));
        if (width > heigth) {
            const emptyCells = new Array((width - heigth) * width)
                .fill(createCell(" "));
            divCells.push(...emptyCells);
        }
    }
    const array: [typeof divCells, typeof boardStyle] = [divCells, boardStyle];
    return array;
}