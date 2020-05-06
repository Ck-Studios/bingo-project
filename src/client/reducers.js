import { combineReducers } from "redux";
import main from "modules/main";
import bingo from "modules/bingo";

export default combineReducers({
    main,
    bingo
});
