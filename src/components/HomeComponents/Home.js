import React, {Component} from 'react';
import {connect} from "react-redux";
import {getHomeCardAction, getHomeHeaderAction} from "../../redux/action/homeActionCreator";
import {CircularProgress} from "@material-ui/core";
import HomeHeader from "./HomeHeader";
import HomeCards from "./HomeCards";

class Home extends Component {
    componentDidMount() {
        this.props.getHomeHeaderAction()
        this.props.getHomeCardAction()
    }

    render() {
        return (
            <div>
                {
                    this.props.isLoading === true
                    ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 100}}>
                            <CircularProgress/>
                        </div>
                    : <div>
                        <div>
                            <HomeHeader {...this.props}/>
                            <HomeCards {...this.props}/>
                        </div>
                    </div>
                }
            </div>
        );
    }
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
})(Home);