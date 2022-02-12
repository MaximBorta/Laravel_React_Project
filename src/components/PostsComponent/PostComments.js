import React, {useEffect, useState} from 'react';
import '../../styles/Post.css'
import {Link, useHistory} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Box, Container} from "@mui/material";
import {connect} from "react-redux";
import {getCommentsAction, setCommentsAction} from "../../redux/action/commentsActionCreator";
import {CircularProgress} from "@material-ui/core";
import {PostCommentItem} from "./PostCommentItem";


const PostComments = (props) => {
    const {
        isFetching,
        getCommentsAction,
        setCommentsAction,
    } = props

    const [comment, setComment] = useState({name: '', email: '', comment: ''})
    const history = useHistory()
    useEffect(() => {
        const commentId = localStorage.getItem('showComments')
        getCommentsAction(commentId)
    }, [getCommentsAction])

    const onChangePostComment = (e) => {
        setComment({
            ...comment,
            [e.target.id]: e.target.value}
        )
    }
    const sendPostComment = (e) => {
        e.preventDefault()
        const commentId = localStorage.getItem('showComments')
        setCommentsAction(commentId, comment)
        setComment({name: "", email: "", comment: ""})
        return getCommentsAction(commentId)
    }

    return (
        <>
            <Container maxWidth={"md"}>
                <div className={"post-comment-wrapper"}>
                    <h1>Comments</h1>
                    <Box mb={4}>
                        <Link to={'/user/user-posts'}>
                            <div className={"back"}>
                                <ArrowBackIcon/>
                                Go Back
                            </div>
                        </Link>
                    </Box>
                    {
                        isFetching === true
                            ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 100}}>
                                <CircularProgress/>
                            </div>
                            : <>
                                <PostCommentItem {...props}
                                                 comment={comment}
                                                 onChangePostComment={onChangePostComment}
                                                 sendPostComment={sendPostComment}
                                />
                            </>
                    }
                </div>
            </Container>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        fetchPostComments: state.comment.fetchPostComments,
        isFetching: state.comment.isFetching,
        comments: state.comment.comments,
        successResponse: state.comment.successResponse,
        isSending: state.comment.isSending,
    }
}
export default connect(mapStateToProps, {
    getCommentsAction,
    setCommentsAction
})(PostComments)
