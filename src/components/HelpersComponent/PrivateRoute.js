import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import CreatePost from "../PostsComponent/CreatePost";
import PostCardInfo from "../PostsComponent/PostCardInfo";
import UpdatePost from "../PostsComponent/UpdatePost";
import {NotFoundPage} from "../NotFound/NotFoundPage";
import ChatContainer from "../ChatComponents/ChatContainer";
import PostContainer from "../PostsComponent/PostContainer";
import ProfileContainer from "../ProfileComponent/ProfileContainer";
import PostComments from "../PostsComponent/PostComments";

export default function PrivateRoute(props) {
    return (
        <div>
            {/*<Header/>*/}
            <Switch>
                <Route exact path={`${props.match.path}/view-profile`} component={ProfileContainer}/>
                <Route exact path={`${props.match.path}/user-posts`} component={PostContainer}/>
                <Route exact path={`${props.match.path}/user-chat`} component={ChatContainer}/>
                <Route exact path={`${props.match.path}/user-posts/create`} component={CreatePost}/>
                <Route path={`${props.match.path}/post/card/show/:id`} exact component={PostCardInfo}/>
                <Route path={`${props.match.path}/post/card/update/:id`} exact component={UpdatePost}/>
                <Route path={`${props.match.path}/post/comments/show/:id`} exact component={PostComments}/>

                <Route exact path={props.match.path} render={props=> (
                    <Redirect to={{ pathname: `${props.match.path}/view-profile` }} />
                )} />
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    );
}