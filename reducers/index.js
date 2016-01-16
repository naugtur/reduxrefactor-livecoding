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

const listReducer = handleActions({
    [T.LIST_REQUEST_START]: (state) => {
        return Object.assign({}, state, {
            isFetching: true
        })
    },
    [T.LIST_REQUEST_END]: (state, {data}) => ({
            isFetching: false,
            data: Object.assign({}, state.data, data)
    }),
    [T.LIST_REQUEST_ERROR]: (state, {error}) => {
        return Object.assign({}, state, {
            isFetching: false,
            error
        })
    }
}, {
    isFetching: false,
    data: {}
});


const itemReducer = handleActions({
    [T.ITEM_REQUEST_START]: (state) => {
        return Object.assign({}, state, {
            isFetching: true
        })
    },
    [T.ITEM_REQUEST_END]: (state, {data}) => ({
            isFetching: false,
            data: Object.assign({}, state.data, data)
    }),
    [T.ITEM_REQUEST_ERROR]: (state, {error}) => {
        return Object.assign({}, state, {
            isFetching: false,
            error
        })
    }
}, {
    isFetching: false,
    data: {}
});




export default combineReducers({
    navigation: navigationReducer,
    aList: listReducer,
    aItems: itemReducer
});
