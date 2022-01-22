import React, {Component} from 'react';
import {Box, Button, Typography} from "@material-ui/core";
import {Field} from "redux-form";
import {renderTextField} from "../../helpers/renderTextField";
import {CircularProgress} from "@mui/material";
import {Link} from "react-router-dom";

class LoginForm extends Component {
    render() {
        return (
            <>
                <form onSubmit={this.props.onSubmit}>
                    <Box marginTop={2} width={'100%'}>
                        {
                            this.props.authError.success === false
                            && <Typography color={"secondary"}>{this.props.authError.message.email}</Typography>
                        }
                        <Field
                            name={'email'}
                            component={renderTextField}
                            fullWidth={true}
                            label="email"
                            type={'email'}
                            variant={'outlined'}
                            value={this.props.fields.email}
                            onChange={this.props.onLoginChange}
                        />
                    </Box>
                    <Box marginTop={2} width={'100%'}>
                        {
                            this.props.authError.success === false
                            && <Typography color={"secondary"}>{this.props.authError.message.password}</Typography>
                        }
                        <Field
                            name={'password'}
                            component={renderTextField}
                            fullWidth={true}
                            type={'password'}
                            label="password"
                            variant={'outlined'}
                            value={this.props.fields.password}
                            onChange={this.props.onLoginChange}
                        />
                    </Box>
                    <Box marginTop={2} width={'100%'}>
                        <Button fullWidth={true} variant={"outlined"} color={"primary"} type={"submit"}>
                            {
                                this.props.isAuthLoading === true
                                    ? <CircularProgress color={"secondary"}/>
                                    : <Typography>Login</Typography>
                            }
                        </Button>
                    </Box>
                </form>
                <div className="register_action">
                    <Link to="/user/register">
                        Go to register
                    </Link>
                    <Link to="/home">
                        Go to home
                    </Link>
                </div>
            </>
        );
    }
}

export default LoginForm;