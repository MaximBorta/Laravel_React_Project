import React from 'react'
import {reduxForm} from "redux-form";
import validate from "../../helpers/registerValidate";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {RegisterAction} from "../../redux/action/authActionCreator";
import Register from "./Register";

const RegisterContainer = (props) => {
    return (
        <>
            <Register {...props}/>
        </>
    )
}

const RegisterReduxForm = reduxForm({
    form: 'register',
    validate
})(RegisterContainer)

const mapStateToProps = (state) => {
    return {
        authResponse: state.authData.authResponse,
        isAuthLoading: state.authData.isAuthLoading,
    }
}

const WithRegisterRedirect = withRouter(RegisterReduxForm)

export default connect(mapStateToProps, {
    RegisterAction
})(WithRegisterRedirect);