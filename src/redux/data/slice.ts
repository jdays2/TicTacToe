import { createSlice } from "@reduxjs/toolkit";

type gameItems = {
  value: number;
  done: boolean;
};

type dataItem = {
  gameBoard: gameItems[][];
  lastWinner: number;
  roundCount: number;
  endRound: boolean;
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
  lastWinner: 0,
  roundCount: 0,
  endRound: false,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    changeValue(state, action) {
      let item = state.gameBoard[action.payload.rowId][action.payload.id];
      if (!item.done) item.value = action.payload.user ? 1 : 2;
      item.done = true;
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
          state.lastWinner = 1;
          state.roundCount++;
          state.endRound = true;
        } else if ((hor1 || hor2) === 8) {
          state.lastWinner = 2;
          state.roundCount++;
          state.endRound = true;
        }
      }
      if ((vert1 || vert2) === 1) {
        state.lastWinner = 1;
        state.roundCount++;
        state.endRound = true;
      } else if ((vert1 || vert2) === 8) {
        state.lastWinner = 2;
        state.roundCount++;
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
          }
        }
      }
    },
  },
});

export const { changeValue, winCheck, reset } = dataSlice.actions;
export default dataSlice.reducer;
