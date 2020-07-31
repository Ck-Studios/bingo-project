import {PREFIX} from "client/constants";

const initialState = {
    games: null,
    selectedGame: null,
    counts: 0,
};

export const COMMIT_COUNTS = "bingo/COMMIT_COUNTS";
export const RESET_COUNTS = "bingo/RESET_COUNTS";
export const LOAD_BINGOS = "bingo/LOAD_BINGOS";
export const LOAD_BINGOS_SUCCESS = "bingo/LOAD_BINGOS_SUCCESS";
export const LOAD_BINGOS_FAIL = "bingo/LOAD_BINGOS_FAIL";

export const SELECT_GAME = "bingo/SELECT_GAME";

export default function bingo(state=initialState, action) {
    switch(action.type) {
        case COMMIT_COUNTS:
            return {...state, counts: action.payload.counts};

        case RESET_COUNTS:
            return {...state, counts: 0};

        case LOAD_BINGOS:
            return {...state, error: null};

        case LOAD_BINGOS_SUCCESS:
            return {...state, games: action.payload.games, error: null};

        case LOAD_BINGOS_FAIL:
            return {...state, error: action.payload.error};

        case SELECT_GAME:
            return {...state, selectedGame: action.payload.game}
        default:
            return {...state};
    }
}

export function selectBingo(game) {
    return {
        type: SELECT_GAME,
        payload: {
            game,
        }
    }
}

export function loadBingos() {
    return {
        type: LOAD_BINGOS,
    }
}

export function loadBingosSuccess(data) {
    return {
        type: LOAD_BINGOS_SUCCESS,
        payload: {
            games: data,
        }
    }
}

export function loadBingosFail(error) {
    return {
        type: LOAD_BINGOS_FAIL,
        payload: {
            error,
        }
    }
}

export function commitCounts(counts) {
    return {
        type: COMMIT_COUNTS,
        payload: {
            counts,
        }
    }
}

export function resetCounts() {
    return {
        type: RESET_COUNTS
    }
}
