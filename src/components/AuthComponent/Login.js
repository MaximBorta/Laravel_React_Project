import React, {useState} from 'react';
import PropTypes from 'prop-types'
import LoginForm from "./LoginForm";
import {Box, Container, Grid, Typography} from "@material-ui/core";
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
        let {LoginAction} = props
        e.preventDefault()
        LoginAction(fields, history)
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
                                    && <AlertComponent authResponse={props.authResponse.message}/>
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

Login.propTypes = {
    authResponse: PropTypes.object,
    authError: PropTypes.object,
    isAuthLoading: PropTypes.bool,
}

export default Login
