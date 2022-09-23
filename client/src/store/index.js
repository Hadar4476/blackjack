import { configureStore } from "@reduxjs/toolkit";

// import all slices
import deckSlice from "./slices/deck";
import gameSlice from "./slices/game";

// import redux-saga to seperate async code from the reducers
import createSagaMiddleware from "redux-saga";
import { watchInitDeck } from "./sagas";

// create a saga middleware to make a usage of redux-saga
const saga = createSagaMiddleware();

// init the global store
const store = configureStore({
  reducer: {
    deck: deckSlice.reducer,
    game: gameSlice.reducer,
  },
  middleware: [saga],
});

// run the watcher in the background
saga.run(watchInitDeck);

// export a global object for actions
export const globalActions = {
  deck: deckSlice.actions,
  game: gameSlice.actions,
};

export default store;
