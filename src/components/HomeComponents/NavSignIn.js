import React from 'react';
import {AppBar, Button, Toolbar, Typography} from "@material-ui/core";
import {NavLink, useHistory} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ProfileAvatar from "../ProfileComponent/ProfileAvatar";


const NavSignIn = (props) => {
    const history = useHistory()
    const token = localStorage.getItem('user-token')

    const logout = () => {
        props.LogoutAction()
        if (props.authResponse !== '' && props.authResponse.success === true) {
            localStorage.removeItem('user-token')
        }
        history.push('/user/login')
    }

    return (
        <>
            <AppBar>
                <Toolbar className="nav-wrapper">
                    <NavLink className="navLink" activeClassName='selected' to="/">
                        <Typography variant={'h5'}>
                            <HomeIcon color="warning" fontSize={'large'}/>
                        </Typography>
                    </NavLink>
                    {
                        token !== null && token !== ''
                            ? <div className="nav-sign-up">
                                <NavLink activeClassName='selected' className="navLink" to="/user/user-chat">
                                    <Typography variant={'h5'}>
                                        Chat
                                    </Typography>
                                </NavLink>
                                <NavLink activeClassName='selected' className="navLink" to="/user/user-posts">
                                    <Typography variant={'h5'}>
                                        Post
                                    </Typography>
                                </NavLink>
                                <NavLink activeClassName='selected' className="navLink" to="/user/view-profile">
                                    <Typography variant={'h5'}>
                                        Profile
                                    </Typography>
                                </NavLink>
                                <ProfileAvatar {...props}/>
                                <Button size={"small"}  color={"secondary"} onClick={logout}>
                                    <Typography variant={'h5'}>
                                        Logout
                                    </Typography>
                                </Button>
                            </div>
                            : <div className="nav-sign-in">
                                <NavLink activeClassName='selected' className="navLink" to="/user/login">
                                    <Typography variant={'h5'}>
                                        Login
                                    </Typography>
                                </NavLink>
                                <NavLink activeClassName='selected' className="navLink" to="/user/register">
                                    <Typography variant={'h5'}>
                                        Register
                                    </Typography>
                                </NavLink>
                            </div>
                    }
                </Toolbar>
            </AppBar>
        </>
    );
}


export default NavSignIn