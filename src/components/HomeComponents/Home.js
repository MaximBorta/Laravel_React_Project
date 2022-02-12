import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {CircularProgress} from "@material-ui/core";
import HomeHeader from "./HomeHeader";
import HomeCards from "./HomeCards";
import withSearchFilter from "../../HOC/withSearchFilter";

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
Home.propTypes = {
    isLoading: PropTypes.bool,
    response: PropTypes.array,
    getCards: PropTypes.array,
    getHomeHeaderAction: PropTypes.func.isRequired,
    getHomeCardAction: PropTypes.func.isRequired,
}

export default withSearchFilter(Home)