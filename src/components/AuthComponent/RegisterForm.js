import React, {Component} from 'react';
import {Box, Button, Typography} from "@material-ui/core";
import {Field} from "redux-form";
import {renderTextField} from "../../helpers/renderTextField";
import {Link} from "react-router-dom";
import {CircularProgress} from "@mui/material";

class RegisterForm extends Component {
    render() {
        return (
            <>
                <form onSubmit={this.props.onSubmit}>
                    <Box marginTop={2} width={'100%'}>
                        {
                            this.props.authResponse.success === false
                            && <Typography color={"secondary"}>{this.props.authResponse.message.name}</Typography>
                        }
                        <Field
                            name={'name'}
                            fullWidth={true}
                            component={renderTextField}
                            label="name"
                            variant={'outlined'}
                            value={this.props.fields.name}
                            onChange={this.props.onRegisterChange}
                        />
                    </Box>
                    <Box marginTop={2} width={'100%'}>
                        {
                            this.props.authResponse.success === false
                            && <Typography color={"secondary"}>{this.props.authResponse.message.email}</Typography>
                        }
                        <Field
                            name={'email'}
                            component={renderTextField}
                            fullWidth={true}
                            type={'email'}
                            label="email"
                            variant={'outlined'}
                            value={this.props.fields.email}
                            onChange={this.props.onRegisterChange}
                        />
                    </Box>
                    <Box marginTop={2} width={'100%'}>
                        {
                            this.props.authResponse.success === false
                            && <Typography color={"secondary"}>{this.props.authResponse.message.password}</Typography>
                        }
                        <Field
                            name={'password'}
                            component={renderTextField}
                            fullWidth={true}
                            type={'password'}
                            label="password"
                            variant={'outlined'}
                            value={this.props.fields.password}
                            onChange={this.props.onRegisterChange}
                        />
                    </Box>
                    <Box marginTop={2} width={'100%'}>
                        <Field
                            name={'password_confirmation'}
                            component={renderTextField}
                            fullWidth={true}
                            type={'password'}
                            label="confirm password"
                            variant={'outlined'}
                            value={this.props.fields.password_confirmation}
                            onChange={this.props.onRegisterChange}
                        />
                    </Box>
                    <Box marginTop={2} width={'100%'}>
                        <Button fullWidth={true} variant={"outlined"} color={"primary"} type={"submit"}>
                            {
                                this.props.isAuthLoading === true
                                ? <CircularProgress color={"secondary"}/>
                                : <Typography>Registration</Typography>
                            }
                        </Button>
                    </Box>
                </form>
                <div className="register_action">
                    <Link to="/user/login">
                        Go to login
                    </Link>
                    <Link to="/home">
                        Go to home
                    </Link>
                </div>
            </>
        );
    }
}

export default RegisterForm;