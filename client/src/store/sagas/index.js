import { takeLatest } from "redux-saga/effects";

import { initDeckSaga } from "./deck";

// create a watcher for "initDeck" action
export function* watchInitDeck() {
  yield takeLatest("deck/initDeck", initDeckSaga);
}
