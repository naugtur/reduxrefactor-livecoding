import { combineReducers } from "redux";

import T from "../actions/ACTION_TYPES"
import {handleActions} from "redux-actions"

const navigationReducer = handleActions({
    [T.NAVIGATION]: (state, {location}) => ({ location })
}, { location: null });

const aListReducer = handleActions({
    [T.GET_LIST+"_START"]: (state, data) => {
        return Object.assign({},state,{
            isFetching: true
        })
    },
    [T.GET_LIST+"_SUCCESS"]: (state, data) => ({
        isFetching: false,
        data: data.res.body
    })
}, {
    isFetching: false,
    data: {}
});

const aItemReducer = handleActions({
    [T.GET_ITEM+"_START"]: (state, data) => {
        return Object.assign({},state,{
            isFetching: true
        })
    },
    [T.GET_ITEM+"_SUCCESS"]: (state, data) =>  ({
        isFetching: false,
        data: Object.assign({}, state.data, {
            //OK, and what if I don't get that from the server??
            [data.res.body.name]: data.res.body
        })
    })
}, {
    isFetching: false,
    data: {}
});


export default combineReducers({
    navigation: navigationReducer,
    aList: aListReducer,
    aItems: aItemReducer
});
