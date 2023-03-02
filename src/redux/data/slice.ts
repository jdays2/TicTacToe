import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type gameItems = {
  value: number;
  done: boolean;
  win: boolean;
};

type setActivePlayer = {
  payload?: boolean | undefined;
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
  restart: boolean;
  activePlayer: boolean;
  vsBotGame: boolean;
  botM: boolean;
  playerOneX: boolean;
};

const initialState: dataItem = {
  gameBoard: [
    [
      { value: 0, done: false, win: false },
      { value: 0, done: false, win: false },
      { value: 0, done: false, win: false },
    ],
    [
      { value: 0, done: false, win: false },
      { value: 0, done: false, win: false },
      { value: 0, done: false, win: false },
    ],
    [
      { value: 0, done: false, win: false },
      { value: 0, done: false, win: false },
      { value: 0, done: false, win: false },
    ],
  ],
  winner: 0,
  roundCount: 0,
  endRound: false,
  moveCount: 0,
  playerXCount: 0,
  playerOCount: 0,
  statusActive: false,
  restart: false,
  activePlayer: false,
  vsBotGame: false,
  botM: false,
  playerOneX: true,
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
      if (state.vsBotGame) {
        state.botM = true;
      }
    },
    winCheck(state) {
      let cell = state.gameBoard;
      let vert1 = 1;
      let vert2 = 1;
      for (let i = 0; i < 3; i++) {
        vert2 = vert2 * cell[2 - i][i].value;
        vert1 = vert1 * cell[i][i].value;
        let hor1 = 1;
        let hor2 = 1;
        for (let j = 0; j < 3; j++) {
          hor1 = hor1 * cell[i][j].value;
          hor2 = hor2 * cell[j][i].value;
        }
        if (hor1 === 1 || hor2 === 1) {
          state.winner = 1;
          state.roundCount++;
          state.playerOCount++;
          state.statusActive = true;
          state.endRound = true;
          break;
        } else if (hor1 === 8 || hor2 === 8) {
          state.winner = 2;
          state.roundCount++;
          state.statusActive = true;
          state.playerXCount++;
          state.endRound = true;
          break;
        }
      }
      if (!state.winner) {
        if (vert1 === 1 || vert2 === 1) {
          state.winner = 1;
          state.roundCount++;
          state.playerOCount++;
          state.endRound = true;
          state.statusActive = true;
          return;
        } else if (vert1 === 8 || vert2 === 8) {
          state.winner = 2;
          state.roundCount++;
          state.playerXCount++;
          state.endRound = true;
          state.statusActive = true;

          return;
        }
      }
      if (state.moveCount === 9 && state.winner === 0) {
        state.winner = 3;
        state.endRound = true;
        state.statusActive = true;
        state.roundCount++;
        state.activePlayer = false;
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
          state.restart = false;
          state.activePlayer = false;
          state.vsBotGame = false;
          state.botM = false;
          state.playerOneX = false;
        }
      }
    },
    onActiveStatus(state) {
      state.statusActive = true;
    },
    offActiveStatus(state) {
      state.statusActive = false;
    },
    startNewRound(state) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          state.gameBoard[i][j].value = 0;
          state.gameBoard[i][j].done = false;
        }
      }
      state.endRound = false;
      state.moveCount = 0;
      state.statusActive = false;
      state.winner = 0;
      state.activePlayer = false;
      if (state.vsBotGame && !state.playerOneX) {
        state.botM = true;
      }
    },
    willRestart(state) {
      state.restart = !state.restart;
    },
    botMove(state) {
      if (state.vsBotGame && state.botM)
        for (let i = 0; i < 3; i++) {
          let item =
            state.gameBoard[i][
              Math.floor(Math.random() * state.gameBoard[i].length)
            ];
          let item2 =
            state.gameBoard[
              Math.floor(Math.random() * state.gameBoard[i].length)
            ][i];

          if (item.value === 0) {
            item.value = state.playerOneX ? 1 : 2;
            item.done = true;
            state.moveCount++;
            state.activePlayer = !state.activePlayer;
            state.botM = false;
            break;
          } else if (item2.value === 0) {
            item2.value = state.playerOneX ? 1 : 2;
            item2.done = true;
            state.moveCount++;
            state.activePlayer = !state.activePlayer;
            state.botM = false;
            break;
          }
        }
    },
    setActivePlayer(state, action: PayloadAction<boolean>) {
      if (action.payload !== undefined) {
        if (action.payload) {
          state.activePlayer = true;
        } else {
          state.activePlayer = false;
        }
      }
    },
    nextMove(state) {
      state.activePlayer = !state.activePlayer;
    },
    setBotActive(state, action: PayloadAction<boolean>) {
      state.vsBotGame = action.payload;
      if (!state.playerOneX) {
        state.botM = true;
      }
    },
    setFirstPlayer(state, action: PayloadAction<boolean>) {
      state.playerOneX = action.payload;
    },
  },
});

export const {
  changeValue,
  winCheck,
  reset,
  onActiveStatus,
  offActiveStatus,
  startNewRound,
  botMove,
  setActivePlayer,
  willRestart,
  setBotActive,
  nextMove,
  setFirstPlayer,
} = dataSlice.actions;
export default dataSlice.reducer;
