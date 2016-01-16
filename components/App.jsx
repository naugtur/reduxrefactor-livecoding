import React from "react"
import {connect} from "react-redux";
import { fetchList, fetchItem } from "../actions"
import AList from "./AList.jsx";
import AItem from "./AItem.jsx";

//This component includes asynchronously dispatching actions for fetching data for the screen matching route
function App(props) {
    switch (props.location.name) {
    case "root" :
        setTimeout(function(){
            props.dispatch(fetchList())
        },0)
        return <AList/>
    case "aItem" :
        setTimeout(function(){
            props.dispatch(fetchItem(props.location.options.item))
        },0)
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
