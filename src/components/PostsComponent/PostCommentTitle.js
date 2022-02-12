import React from 'react'
import {Typography} from "@mui/material";

export const PostCommentTitle = (props) => {

    const {fetchPostComments} = props
    return (
        <div className={"post-comment-title-wrapper"}>
            <div className={"post-comment-detail"}>
                <Typography variant={'h4'}>{fetchPostComments.title}</Typography>
                <Typography variant={'body1'}>{fetchPostComments.description}</Typography>
                <img className={"post-comment-detail-img"} src={`http://localhost:8000/post/${fetchPostComments.post_img}`} alt={`${fetchPostComments.title}`}/>
            </div>
        </div>
    )
}