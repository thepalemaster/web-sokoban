import React from 'react';
import {WorkerImage} from './WorkerImage';
import {Direction} from './levels'

type ObjectPosition = {
  x: number, 
  y: number, 
  direction: Direction, 
  scale: number,
  onClick: React.MouseEventHandler<HTMLDivElement>
};
 
 export function WorkerObject ({x, y, scale, direction, onClick}: ObjectPosition) {
  const elementWidth = scale;
  const elementHeight = elementWidth * 10 / 3;
  const workerStyle = {top: y - elementHeight * 0.95, left: x - elementWidth * 0.5, height: elementHeight, width: elementWidth}
  return (
    <div className='sokoban-worker' style={workerStyle} onClick= {onClick}>
      <WorkerImage direction={direction} />
    </div>
    ) 
}

