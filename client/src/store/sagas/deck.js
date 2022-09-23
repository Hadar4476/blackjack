import { put, all } from "redux-saga/effects";
import axios from "../../my-axios";

import deckSlice from "../slices/deck";

// fetch cards from http://localhost:3005/cards
export function* initDeckSaga() {
  try {
    const { data } = yield axios.get("/cards");
    yield all([yield put(deckSlice.actions.initDeckSuccess(data))]);
  } catch (error) {
    yield put(deckSlice.actions.initDeckFail(error));
  }
}
