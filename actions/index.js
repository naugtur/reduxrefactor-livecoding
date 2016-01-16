import T from "../actions/ACTION_TYPES"
import ROUTES from "../ROUTES"


export function navigate() {
    return {
        type: T.NAVIGATION,
        location: ROUTES.lookup(window.location.hash.substr(1)),
    }
}



export function fetchList() {
    return function (dispatch) {
        dispatch({
            type: T.LIST_REQUEST_START
        })
        return fetch("/api/list")
            .then(function(response){
                    if(response.status !== 200){
                        return response.text().then(function(message){
                            var error = Error(message)
                            error.status = response.status
                            throw error
                        })
                    }
                    return response
                })
            .then(response => response.json())
            .then(function success(body){
                return dispatch(receiveList(body))
            })
            .catch(function failure(error){
                return dispatch(listError(error))
            })
    }
}

export function receiveList(data) {
    return {
        type: T.LIST_REQUEST_END,
        data,
        fetchedAt: Date.now()
    }
}

export function listError(error, stateKey) {
    return {
        type: T.LIST_REQUEST_ERROR,
        error
    }
}



export function fetchItem(itemName) {
    return function (dispatch) {
        dispatch({
            type: T.ITEM_REQUEST_START
        })
        return fetch(`/api/item/${itemName}`)
            .then(function(response){
                    if(response.status !== 200){
                        return response.text().then(function(message){
                            var error = Error(message)
                            error.status = response.status
                            throw error
                        })
                    }
                    return response
                })
            .then(response => response.json())
            .then(function success(body){
                return dispatch(receiveItem({ [itemName]: body }))
            })
            .catch(function failure(error){
                return dispatch(itemError(error, stateKey))
            })
    }
}

export function receiveItem(data) {
    return {
        type: T.ITEM_REQUEST_END,
        data,
        fetchedAt: Date.now()
    }
}

export function requestError(error) {
    return {
        type: T.ITEM_REQUEST_ERROR,
        error
    }
}
