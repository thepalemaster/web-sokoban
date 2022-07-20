import React from 'react';
import {Field, Cell} from './levels';
import {Highlight} from './gameObjectsHelpers'
import {toIndex} from './setupState'

type GameBoardProps = Field & {size: number, onClick: React.MouseEventHandler<HTMLDivElement>, highlight: Highlight}

export function GameBoard (props: GameBoardProps) {
    let divCells: Array<JSX.Element> = [];
    if (props.width < props.heigth) {
        divCells = props.cells.reduce((acc, item, index)=>{
            acc.push(createCell(item));
            if ((index + 1) % props.width === 0) {
                const emptyCells = new Array(props.heigth - props.width)
                    .fill(createCell(" "));
                acc.push(...emptyCells);
            }            
            return acc;
        }, divCells);
    } else {
        divCells = props.cells.map(item=>createCell(item));
        if (props.width > props.heigth) {
            const emptyCells = new Array((props.width - props.heigth) * props.width)
                .fill(createCell(" "));
            divCells.push(...emptyCells);
        }
    }
    writeHighlitedCells(props, divCells);
    const maxDim = Math.max(props.heigth, props.width);
    const boardStyle = {
        gridTemplateRows: `repeat(${maxDim}, 1fr)`, 
        gridTemplateColumns: `repeat(${maxDim}, 1fr)`, 
        top: (1 / 1.41 - 1) / 2 * props.size, 
        left: (1.41 - 1) / 2 * props.size, 
        height: props.size, 
        width: props.size
    }
    return (
        <div className='sokoban-grid' style={boardStyle} onClick={props.onClick}>
            {divCells}
        </div>
    )
}

function writeHighlitedCells(props: GameBoardProps, divCells: Array<JSX.Element>) {
    if(!props.highlight) return;
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

}

function createCell (item: Cell|"H"|"Y") {
    switch(item) {
        case " ":
            return <div className='sokoban-empty'></div>;
            break;
        case "E":
            return <div className='sokoban-cell'></div>;
            break;
        case "X":
            return <div className='sokoban-targetcell'></div>;
            break;
        case "H":
            return <div className='sokoban-cell-highlight'></div>;
            break;
        case "Y":
            return <div className='sokoban-targetcell-highlight'></div>;
            break;
    }
}