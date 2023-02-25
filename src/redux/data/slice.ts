import { createSlice } from "@reduxjs/toolkit";

// type gameItems = {
//   value: number;
// };

// type dataItem = {
//   gameBoard: gameItems[];
// };

const initialState = {
  gameBoard: [
    [{ value: 0 }, { value: 0 }, { value: 0 }],
    [{ value: 0 }, { value: 0 }, { value: 0 }],
    [{ value: 0 }, { value: 0 }, { value: 0 }],
  ],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    changeValue(state, action) {
      state.gameBoard[action.payload.rowId][action.payload.id].value = action
        .payload.user
        ? 1
        : 2;
    },
    winCheck(state) {
      let cell = state.gameBoard;
      let vert1 = 1;
      let vert2 = 1;
      let win = "";

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
          win = "1!";
        } else if ((hor1 || hor2) === 8) {
          win = "2!";
        }
      }
      if ((vert1 || vert2) === 1) {
        win = "1!";
      } else if ((vert1 || vert2) === 8) {
        win = "2!";
      }
      console.log(win);
    },
  },
});

export const { changeValue, winCheck } = dataSlice.actions;
export default dataSlice.reducer;
