import { combineReducers } from "redux";

import T from "../actions/ACTION_TYPES"
import {handleActions} from "redux-actions"

const navigationReducer = handleActions({
    [T.NAVIGATION]: (state, {location}) => ({ location })
}, { location: null });


export default combineReducers({
    navigation: navigationReducer,
    aList: function (state, action) {
        if (action.type === T.GET_LIST) {
            return {
                isFetching: false,
                data: Object.assign({}, state.data, action.data)
            }
        } else {
            return (state || {
                isFetching: false,
                data: {}
            })
        }
    }
});
