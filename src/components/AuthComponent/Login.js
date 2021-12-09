import React, {useState} from 'react';
import LoginForm from "./LoginForm";
import {Box, Container, Grid, Typography} from "@material-ui/core";
import {connect} from "react-redux";
import {LoginAction} from "../../redux/action/authActionCreator";
import validate from "../../helpers/registerValidate";
import {reduxForm} from "redux-form";
import {useHistory} from "react-router-dom";
import AlertComponent from "../../helpers/AlertComponent";

const Login = (props) => {
    const history = useHistory()
    const [fields, setFields] = useState({
        email: '',
        password: '',
    })

    const onLoginChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const onLoginSubmit = (e) => {
        e.preventDefault()
        props.LoginAction(fields, history)
    }

    return (
        <div>
            <Box marginTop={10}>
                <Container maxWidth={'sm'}>
                    <Grid container wrap="nowrap">
                        <Grid item xs={12}>
                            <div className="auth-container">
                                {
                                    props.authResponse.success === true
                                    &&  <AlertComponent authResponse={props.authResponse.message}/>
                                }
                                {
                                    props.authError.success === false
                                    && <AlertComponent authResponse={props.authError.error}/>
                                }
                                <Typography variant={'h3'}>Login</Typography>
                                <Box width={'100%'}>
                                    <LoginForm
                                        {...props}
                                        onSubmit={onLoginSubmit}
                                        onLoginChange={onLoginChange}
                                        fields={fields}
                                    />
                                </Box>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    );
}

const LoginReduxForm = reduxForm({
    form: 'login',
    validate
})(Login)


const mapStateToProps = (state) => {
    return {
        authResponse: state.authData.authResponse,
        authError: state.authData.authError,
        isAuthLoading: state.authData.isAuthLoading,
    }
}

export default connect(mapStateToProps, {
    LoginAction
})(LoginReduxForm);