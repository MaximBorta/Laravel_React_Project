import React from 'react'
import Home from "./Home";
import {connect} from "react-redux";
import {getHomeCardAction, getHomeHeaderAction} from "../../redux/action/homeActionCreator";

const HomeContainer = (props) => {
    return (
        <>
            <Home {...props}/>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.homeData.isLoading,
        response: state.homeData.response,
        getCards: state.homeData.getCards,
    }
}

export default connect(mapStateToProps, {
    getHomeHeaderAction,
    getHomeCardAction,
})(HomeContainer);