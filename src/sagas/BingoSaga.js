import { takeLatest, put, all } from "redux-saga/effects";
import loadDB from "client/firebase/firebase";
import {LOAD_BINGOS, loadBingosFail, loadBingosSuccess} from "modules/bingo";

function* loadBingos() {
    try {
        const db = yield loadDB();
        const _games = [];
        yield db.firestore().collection("bingos").get().then(snapshot => {
            snapshot.forEach(doc => {
                _games.push(doc.data());
            })
        });

        console.log("_+games", _games);

        yield put(loadBingosSuccess(_games));
    } catch (err) {
        yield put(loadBingosFail(err.response));
    }
}

function* watchLoadBingos() {
    yield takeLatest(LOAD_BINGOS, loadBingos);
}


export default function* MainSaga() {
    yield all([
        watchLoadBingos(),
    ]);
}
