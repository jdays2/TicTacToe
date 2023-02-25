import { createSlice } from "@reduxjs/toolkit";

type gameItems = {
  value: number;
  done: boolean;
};

type dataItem = {
  gameBoard: gameItems[][];
  winner: number;
  roundCount: number;
  endRound: boolean;
  moveCount: number;
  playerOCount: number;
  playerXCount: number;
};

const initialState: dataItem = {
  gameBoard: [
    [
      { value: 0, done: false },
      { value: 0, done: false },
      { value: 0, done: false },
    ],
    [
      { value: 0, done: false },
      { value: 0, done: false },
      { value: 0, done: false },
    ],
    [
      { value: 0, done: false },
      { value: 0, done: false },
      { value: 0, done: false },
    ],
  ],
  winner: 0,
  roundCount: 0,
  endRound: false,
  moveCount: 0,
  playerXCount: 0,
  playerOCount: 0,
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
      if (state.moveCount === 9) {
        state.endRound = true;
      }
    },
    winCheck(state) {
      let cell = state.gameBoard;
      let vert1 = 1;
      let vert2 = 1;

      for (let i = 0; i < 3; i++) {
        vert1 = vert1 * cell[i][i].value;
        vert2 = vert2 * cell[2 - i][i].value;
        let hor1 = 1;
        let hor2 = 1;
        for (let j = 0; j < 3; j++) {
          hor1 = hor1 * cell[i][j].value;
          hor2 = hor2 * cell[j][i].value;
        }
        if ((hor1 || hor2) === 1) {
          state.winner = 1;
          state.roundCount++;
          state.playerOCount++;
          state.endRound = true;
        } else if ((hor1 || hor2) === 8) {
          state.winner = 2;
          state.roundCount++;
          state.endRound = true;
          state.playerXCount++;
        }
      }
      if ((vert1 || vert2) === 1) {
        state.winner = 1;
        state.roundCount++;
        state.playerOCount++;
        state.endRound = true;
      } else if ((vert1 || vert2) === 8) {
        state.winner = 2;
        state.roundCount++;
        state.playerXCount++;
        state.endRound = true;
      }
    },
    reset(state) {
      if (state.endRound) {
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            state.gameBoard[i][j].value = 0;
            state.gameBoard[i][j].done = false;
            state.endRound = false;
            state.moveCount = 0;
          }
        }
      }
    },
  },
});

export const { changeValue, winCheck, reset } = dataSlice.actions;
export default dataSlice.reducer;
