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
  try {
    localStorage.setItem(itemName, newString);
  } catch (e) {
    console.log("Unable write solved levels progress")
  }
}

function currentStatus() {
  if (!solvedLevels) {
    let current;
    try {
      current = localStorage.getItem(itemName);
    } catch (e){
      current = null;
    }
    if (current === null || current.length !== levels.length) {
      current = new Array(levels.length).fill("0").join("");
      try {
        localStorage.setItem(itemName, current);
      } catch(e) {
        console.log("Unable write solved levels progress")
      }
    }
    solvedLevels = current;
  }
  return solvedLevels;
}