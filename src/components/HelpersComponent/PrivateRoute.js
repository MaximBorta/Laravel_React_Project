import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import Profile from '../ProfileComponent/Profile';
import Post from "../PostsComponent/Post";
import CreatePost from "../PostsComponent/CreatePost";
import PostCardInfo from "../PostsComponent/PostCardInfo";
import UpdatePost from "../PostsComponent/UpdatePost";
import Chat from "../ChatComponents/Chat";
export default function PrivateRoute(props) {
    return (
        <div>
            {/*<Header/>*/}
            <Switch>
                <Route exact path={`${props.match.path}/view-profile`} component={Profile}/>
                <Route exact path={`${props.match.path}/user-posts`} component={Post}/>
                <Route exact path={`${props.match.path}/user-chat`} component={Chat}/>
                <Route exact path={`${props.match.path}/user-posts/create`} component={CreatePost}/>
                <Route path={`${props.match.path}/post/card/show/:id`} exact component={PostCardInfo}/>
                <Route path={`${props.match.path}/post/card/update/:id`} exact component={UpdatePost}/>
                <Route exact path={props.match.path} render={props=> (
                    <Redirect to={{ pathname: `${props.match.path}/view-profile` }} />
                )} />
            </Switch>
        </div>
    );
}