import {GameState} from "./setupState";

type StateUI = {
  state: "state"
}

type ActionUI = {
  type: string
}

export function initStateUI (gameState: GameState): StateUI {
  return {state: "state"};
};


export function updateUI (state: StateUI, action: ActionUI) {
  return state;
}