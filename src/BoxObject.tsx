import React from 'react';
import {BoxImage} from './BoxImage'

 type ObjectPosition = {x: number, y: number, placed: boolean, scale: number, onClick: React.MouseEventHandler<HTMLDivElement>};

 export function BoxObject ({x, y, placed, scale, onClick}: ObjectPosition) {
  return (
      <div className='sokoban-box' data-boxid={1} onClick={onClick} style={{ top: y - scale * 2.82, left: x - scale * 1.64 }} >
        <BoxImage scale={scale} placed={placed} />
      </div>
    ) 
}

