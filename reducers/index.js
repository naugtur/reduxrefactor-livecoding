import { combineReducers } from "redux";

import T from "../actions/ACTION_TYPES"
import {handleActions} from "redux-actions"

const navigationReducer = handleActions({
    [T.NAVIGATION]: (state, {location}) => ({ location })
}, { location: null });



function createReducerFunction(stateKey, reducers) {
    return function (state, action) {
        if (reducers[action.type] && stateKey === action.stateKey) {
            return reducers[action.type](state, action)
        } else {
            return (state || {
                isFetching: false,
                data: {}
            })
        }
    }

}

const requestReducerSetup = {
    [T.REQUEST_START]: (state) => {
        return Object.assign({}, state, {
            isFetching: true
        })
    },
    [T.REQUEST_END]: (state, {data}) => ({
            isFetching: false,
            data: Object.assign({}, state.data, data)
    }),
    [T.REQUEST_ERROR]: (state, {error}) => {
        return Object.assign({}, state, {
            isFetching: false,
            error
        })
    }
}

export default combineReducers({
    navigation: navigationReducer,
    aList: createReducerFunction("aList", requestReducerSetup),
    aItems: createReducerFunction("aItems", requestReducerSetup)
});
