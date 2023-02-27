import { createSlice } from "@reduxjs/toolkit";

type gameItems = {
  id: number;
  value: number;
  done: boolean;
  win: boolean;
};

type dataItem = {
  gameBoard: gameItems[][];
  winner: number;
  roundCount: number;
  endRound: boolean;
  moveCount: number;
  playerOCount: number;
  playerXCount: number;
  statusActive: boolean;
  willRestart: boolean;
};

const initialState: dataItem = {
  gameBoard: [
    [
      { id: 0, value: 0, done: false, win: false },
      { id: 1, value: 0, done: false, win: false },
      { id: 2, value: 0, done: false, win: false },
    ],
    [
      { id: 3, value: 0, done: false, win: false },
      { id: 4, value: 0, done: false, win: false },
      { id: 5, value: 0, done: false, win: false },
    ],
    [
      { id: 6, value: 0, done: false, win: false },
      { id: 7, value: 0, done: false, win: false },
      { id: 8, value: 0, done: false, win: false },
    ],
  ],
  winner: 0,
  roundCount: 0,
  endRound: false,
  moveCount: 0,
  playerXCount: 0,
  playerOCount: 0,
  statusActive: false,
  willRestart: false,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    changeValue(state, action) {
      let item = state.gameBoard[action.payload.rowId][action.payload.id];
      if (!item.done) {
        item.value = action.payload.user ? 1 : 2;
        item.done = true;
        state.moveCount++;
      }
    },
    winCheck(state) {
      let cell = state.gameBoard;
      let vert1 = 0;
      let vert2 = 0;
      for (let i = 0; i < 3; i++) {
        vert2 = vert2 + cell[2 - i][i].value;
        vert1 = vert1 + cell[i][i].value;
        console.log(vert1);
        let hor1 = 1;
        let hor2 = 1;

        for (let j = 0; j < 3; j++) {
          hor1 = hor1 + cell[i][j].value;
          hor2 = hor2 + cell[j][i].value;
          if (hor1 === 0111) {
            cell[i][j].win = true;
          } else if (hor2 === 0111) {
            cell[j][i].win = true;
          }
        }
        if (hor1 === 0111 || hor2 === 0111) {
          state.winner = 1;
          state.roundCount++;
          state.playerOCount++;
          state.statusActive = true;
          state.endRound = true;
          break;
        } else if (hor1 === 222 || hor2 === 222) {
          state.winner = 2;
          state.roundCount++;
          state.statusActive = true;
          state.playerXCount++;
          state.endRound = true;
          break;
        }
      }
      if (vert1 === 1 || vert2 === 1) {
        state.winner = 1;
        state.roundCount++;
        state.playerOCount++;
        state.endRound = true;
        state.statusActive = true;
      } else if (vert1 === 8 || vert2 === 8) {
        state.winner = 2;
        state.roundCount++;
        state.playerXCount++;
        state.endRound = true;
        state.statusActive = true;
      }
    },
    drawChek(state) {
      if (state.moveCount === 9 && state.winner === 0) {
        state.winner = 3;
        state.endRound = true;
        state.statusActive = true;
        state.roundCount++;
        console.log("ничья");
      }
    },
    reset(state) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          state.gameBoard[i][j].value = 0;
          state.gameBoard[i][j].done = false;
          state.endRound = false;
          state.moveCount = 0;
          state.playerOCount = 0;
          state.playerXCount = 0;
          state.roundCount = 0;
          state.statusActive = false;
          state.winner = 0;
          state.willRestart = false;
        }
      }
    },
    closeActiveStatus(state) {
      state.statusActive = false;
    },
    startNewRound(state) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          state.gameBoard[i][j].value = 0;
          state.gameBoard[i][j].done = false;
        }
        state.endRound = false;
        state.moveCount = 0;
        state.statusActive = false;
        state.winner = 0;
      }
    },
    tryRestart(state) {
      state.willRestart = !state.willRestart;
      state.statusActive = !state.statusActive;
    },
  },
});

export const {
  changeValue,
  winCheck,
  reset,
  closeActiveStatus,
  startNewRound,
  drawChek,
  tryRestart,
} = dataSlice.actions;
export default dataSlice.reducer;
