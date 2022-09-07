import {levels} from "./levels";

const itemName = "sokobanSolvesLevels";
let solvedLevels: string;

export function getSolvedLevels() {
  return currentStatus();
}

export function setSolved(levelId: number) {
  const status = currentStatus();
  if(status.length <= levelId) return;
  const newString = status.substring(0, levelId) + "1" + status.substring(levelId + 1);
  solvedLevels = newString;
  localStorage.setItem(itemName, newString);
}

function currentStatus() {
  if (!solvedLevels) {
    let current = localStorage.getItem(itemName);
    if (current === null) {
      current = new Array(levels.length).fill("0").join("");
    }
    solvedLevels = current;
  }
  return solvedLevels;
}