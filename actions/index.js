import T from "../actions/ACTION_TYPES"
import ROUTES from "../ROUTES"

// Superagent
import request from "superagent"


export function navigate() {
    return {
        type: T.NAVIGATION,
        location: ROUTES.lookup(window.location.hash.substr(1)),
    }
}

export function getAList() {
    return{
      type: T.GET_LIST,
      request: request.get('/api/list')
    }
}


export function getAItem(itemName) {
    return{
      type: T.GET_ITEM,
      request: request.get(`/api/item/${itemName}`)
    }
}
