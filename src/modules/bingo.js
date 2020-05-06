import {PREFIX} from "client/constants";

const initialState = {
    gameObjects: {
        board: `${PREFIX}/static/images/bingo/grandma/g1_board.png`,
        result1: `${PREFIX}/static/images/bingo/grandma/g1_result1.png`,
        result2: `${PREFIX}/static/images/bingo/grandma/g1_result2.png`,
        result3: `${PREFIX}/static/images/bingo/grandma/g1_result3.png`,
        result4: `${PREFIX}/static/images/bingo/grandma/g1_result4.png`,
        ring: `${PREFIX}/static/images/bingo/grandma/g1_ring.svg`,
        thumbnail: `${PREFIX}/static/images/bingo/grandma/g1_thumbnail.png`,
        title: "할매 입맛 빙고",
        subtitle: "나의 할매력은 얼마일까?"
    },
    counts: 0,
};

export const COMMIT_COUNTS = "bingo/COMMIT_COUNTS";

export default function bingo(state=initialState, action) {
    switch(action.type) {
        case COMMIT_COUNTS:
            return {...state, counts: action.payload.counts};
        default:
            return {...state};
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
