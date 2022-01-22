import React from 'react'
import Post from "./Post";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {deletePostAction, getPostsAction} from "../../redux/action/postActionCreator";

const PostContainer = (props) => {
    return (
        <>
            <Post {...props}/>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.postData.isLoading,
        isDestroying: state.postData.isDestroying,
        postResponse: state.postData.postResponse,
        deletedPostResponse: state.postData.deletedPostResponse,
    }
}

const withRouterPostContainer = withRouter(PostContainer)

export default connect(mapStateToProps, {
    getPostsAction,
    deletePostAction
})(withRouterPostContainer);