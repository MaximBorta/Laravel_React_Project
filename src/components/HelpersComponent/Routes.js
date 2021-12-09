import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

import Home from '../HomeComponents/Home'
import Login from '../AuthComponent/Login'
import Register from '../AuthComponent/Register'

import PrivateRoute from "./PrivateRoute";
import {Guard} from "./Guards";

import Nav from '../NavComponents/Nav'
import HomeCardInfo from "../HomeComponents/HomeCardInfo";
import HomeCardUpdate from "../HomeComponents/HomeCardUpdate";

const Routes = () => {
    return (
        <>
            <Nav/>
            <Switch>
                <Route exact path='/' render={props => (
                    <Redirect to={{pathname: '/home'}}/>
                )}/>
                <Route path={'/home'} component={Home}/>
                <Route path={'/user/register'} component={Register}/>
                <Route path={'/user/login'} component={Login}/>
                <Route path={'/card/show/:id'} exact component={HomeCardInfo}/>
                <Route path={'/card/update/:id'} exact component={HomeCardUpdate}/>

                <Guard path={'/user'} token="user-token" routeRedirect={"/user/login"} component={PrivateRoute}/>
            </Switch>
        </>
    )
}

export default Routes
