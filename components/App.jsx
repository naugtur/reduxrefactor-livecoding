import React from "react"
import {connect} from "react-redux";
import { fetchData } from "../actions"
import AList from "./AList.jsx";
import AItem from "./AItem.jsx";

//This component includes asynchronously dispatching actions for fetching data for the screen matching route
function App(props) {
    switch (props.location.name) {
    case "root" :
        asyncCall(props.dispatch,fetchData,
            "/api/list",
            "aList"
        )
        return <AList/>
    case "aItem" :
        asyncCall(props.dispatch,fetchData,
            `/api/item/${props.location.options.item}`,
            "aItems",
            (data) => ({ [props.location.options.item]: data })
        )
        return <AItem itemName={props.location.options.item}/>
    default :
        return <div>Not implemented</div>
    }
}


function asyncCall(dispatch, action, ...args){
    setTimeout(function(){
        dispatch(action(...args))
    },0)
}


export default connect(state => ({
    location: state.navigation.location || {}
}))(App);
