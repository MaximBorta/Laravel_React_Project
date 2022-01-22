import React from 'react'
import {reduxForm} from "redux-form";
import validate from "../../helpers/registerValidate";
import {connect} from "react-redux";
import {LoginAction} from "../../redux/action/authActionCreator";
import Login from "./Login";

const LoginContainer = (props) => {
    return (
        <>
            <Login {...props}/>
        </>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login',
    validate
})(LoginContainer)


const mapStateToProps = (state) => {
    return {
        authResponse: state.authData.authResponse,
        authError: state.authData.authError,
        isAuthLoading: state.authData.isAuthLoading,
    }
}

export default connect(mapStateToProps, {
    LoginAction,
})(LoginReduxForm);