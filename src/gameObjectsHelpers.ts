
import {GameState} from './setupState';
import {Direction} from './levels';

import {Position, pathFinder} from './pathFinder';

export type HighlightObject = {
  [K in Direction]: number
}


export type Highlight = {entry: Position, directions: HighlightObject}|null;

export function checkHighlighte(target: Position, highlight: Highlight){
  if (!highlight) return false;
  if (target.x === highlight.entry.x) {
      let delta = target.y - highlight.entry.y;
      if (delta <= highlight.directions.S 
          || -delta <= highlight.directions.N) return true;
  }
  if (target.y === highlight.entry.y) {
      let delta = target.x - highlight.entry.x;
      if (delta <= highlight.directions.E 
          || -delta <= highlight.directions.W) return true;
  }
  return false;
}

export function getPath(state: GameState, target: Position) {
  const {x: startX, y: startY} = state.field[state.workerIndex];
  return pathFinder(state, {x: target.x, y: target.y}, [{x: startX, y: startY}]);
}

export function getPathWithBox(state: GameState, target: Position, highlight: Highlight) {
  if (!highlight) return null;
  let boxMove: Array<Position> = [];
  const pushPosition = highlight.entry;
  if (target.x === highlight.entry.x) {
      let delta = target.y - highlight.entry.y;
      if (delta > 0) {
          for (let i = 0; i < delta; i++) {
              boxMove.push({...highlight.entry, y: highlight.entry.y + i});
          }
          pushPosition.y--;
      } else if (delta < 0) {
          for (let i = 0; i > delta; i--) {
              boxMove.push({...highlight.entry, y: highlight.entry.y + i});
          }
          pushPosition.y++;
      }
  } else if (target.y === highlight.entry.y) {
      let delta = target.x - highlight.entry.x;
      if (delta > 0) {
          for (let i = 0; i < delta; i++) {
              boxMove.push({...highlight.entry, x: highlight.entry.x + i});
          }
          pushPosition.x--;
      } else if (delta < 0) {
          for (let i = 0; i > delta; i--) {
              boxMove.push({...highlight.entry, x: highlight.entry.x + i});
          }
          pushPosition.x++;
      }
  }
  const result = getPath(state, pushPosition);
  result?.push(...boxMove);
  console.log(result);
  console.log(boxMove);
  return result;
}