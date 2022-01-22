import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

import PrivateRoute from "./PrivateRoute";
import {Guard} from "./Guards";

import Nav from '../NavComponents/Nav'
import HomeCardInfo from "../HomeComponents/HomeCardInfo";
import HomeCardUpdate from "../HomeComponents/HomeCardUpdate";
import {NotFoundPage} from "../NotFound/NotFoundPage";
import HomeContainer from "../HomeComponents/HomeContainer";
import LoginContainer from "../AuthComponent/LoginContainer";
import RegisterContainer from "../AuthComponent/RegisterContainer";

const Routes = () => {
    return (
        <>
            <Nav/>
            <Switch>
                <Route exact path='/' render={props => (
                    <Redirect to={{pathname: '/home'}}/>
                )}/>

                <Route path={'/home'} component={HomeContainer}/>
                <Route path={'/user/register'} component={RegisterContainer}/>
                <Route path={'/user/login'} component={LoginContainer}/>
                <Route path={'/card/show/:id'} exact component={HomeCardInfo}/>
                <Route path={'/card/update/:id'} exact component={HomeCardUpdate}/>

                <Guard path={'/user'} token="user-token" routeRedirect={"/user/login"} component={PrivateRoute}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </>
    )
}

export default Routes
