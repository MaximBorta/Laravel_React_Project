import React, {Component} from 'react';
import '../../styles/Nav.css'
import {CssBaseline, Toolbar} from "@material-ui/core";
import {connect} from "react-redux";
import {LogoutAction} from "../../redux/action/authActionCreator";
import NavSignIn from "../HomeComponents/NavSignIn";
import {ProfileAction} from "../../redux/action/ProfileActionCreator";

class Nav extends Component {

    render() {
        return (
            <>
                <CssBaseline />
                <NavSignIn {...this.props}/>
                <Toolbar id="back-to-top-anchor" />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authResponse: state.authData.authResponse,
        userProfile: state.profileData.userProfile,
        isProfileLoading: state.profileData.isProfileLoading,
    }
}

export default  connect(mapStateToProps, {
    LogoutAction,
    ProfileAction
})(Nav);