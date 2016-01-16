import T from "../actions/ACTION_TYPES"
import ROUTES from "../ROUTES"


export function navigate() {
    return {
        type: T.NAVIGATION,
        location: ROUTES.lookup(window.location.hash.substr(1)),
    }
}



export function fetchData(reqOptions, stateKey, mapper) {
        return function (dispatch) {
            dispatch({
                type: T.REQUEST_START,
                stateKey
            })
            return fetch(reqOptions)
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
                    body = (mapper? mapper(body) : body)
                    return dispatch(receive(body, stateKey))
                })
                .catch(function failure(error){
                    return dispatch(requestError(error, stateKey))
                })
        }
    }

export function receive(data, stateKey) {
        return {
            type: T.REQUEST_END,
            data,
            stateKey,
            fetchedAt: Date.now()
        }
    }

export function requestError(error, stateKey) {
        return {
            type: T.REQUEST_ERROR,
            error,
            stateKey
        }
    }
