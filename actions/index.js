import T from "../actions/ACTION_TYPES"
import ROUTES from "../ROUTES"


export function navigate() {
    return {
        type: T.NAVIGATION,
        location: ROUTES.lookup(window.location.hash.substr(1)),
    }
}



export function getList() {
    return {
        type: T.GET_LIST,
        data: {
            list:["foo","bar","baz"]
        }
    }
}
