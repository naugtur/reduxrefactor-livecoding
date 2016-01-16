import React from "react"
import {connect} from "react-redux";
import { getList } from "../actions"
import AList from "./AList.jsx";
import AItem from "./AItem.jsx";

//This component includes asynchronously dispatching actions for fetching data for the screen matching route
function App(props) {
    switch (props.location.name) {
    case "root" :
        setTimeout(function(){
            props.dispatch(getList())
        },0)
        return <AList/>
    case "aItem" :
        //TODO: fetch item
        return <AItem itemName={props.location.options.itemName}/>
    default :
        return <div>Not implemented</div>
    }
}

export default connect(state => ({
    location: state.navigation.location || {}
}))(App);
