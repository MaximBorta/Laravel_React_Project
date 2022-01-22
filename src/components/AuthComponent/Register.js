import React, {Component} from 'react';
import PropTypes from 'prop-types'
import '../../styles/Auth.css'
import {Box, Container, Grid, Typography} from "@material-ui/core";
import RegisterForm from "./RegisterForm";
import AlertComponent from "../../helpers/AlertComponent";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        }
        this.onRegisterChange = this.onRegisterChange.bind(this)
        this.onRegisterSubmit = this.onRegisterSubmit.bind(this)
    }

    onRegisterChange(e) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    onRegisterSubmit(e) {
        e.preventDefault()
        this.props.RegisterAction(this.state, this.props.history)
    }

    render() {
        return (
            <div>
                <Box marginTop={10}>
                    <Container maxWidth={'sm'}>
                        <Grid container wrap="nowrap">
                            <Grid item xs={12}>
                                <div className="auth-container">
                                    {
                                        this.props.authResponse.success === true
                                        && <AlertComponent authResponse={this.props.authResponse.message}/>
                                    }
                                    <Typography variant={'h3'}>Registration</Typography>
                                    <Box width={'100%'}>
                                        <RegisterForm {...this.props}
                                                      onSubmit={this.onRegisterSubmit}
                                                      onRegisterChange={this.onRegisterChange}
                                                      fields={this.state}
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
}

Register.propTypes = {
    authResponse: PropTypes.object,
    isAuthLoading: PropTypes.bool,
    RegisterAction: PropTypes.func,
}

export default Register