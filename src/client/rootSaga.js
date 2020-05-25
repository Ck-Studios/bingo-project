import { all, takeEvery } from "redux-saga/effects";
import es6promise from "es6-promise";
import MainSaga from "sagas/MainSaga";
import BingoSaga from "sagas/BingoSaga";

es6promise.polyfill();

export default function* rootSaga() {
    yield all([
        MainSaga(),
        BingoSaga(),
    ]);
}
