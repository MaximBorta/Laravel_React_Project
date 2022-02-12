import React from 'react'
import {Typography} from "@mui/material";

export const FetchPostComments = (props) => {
    const {comments} = props
    return (
        <div>
            {
                comments.length !== 0
                    ? (
                        <div className={"send-post-comment-wrapper"}>
                            {
                                comments.map((el, idx) => (
                                    <div key={idx} className={"post-comment"}>
                                        <strong>{el.name}</strong>
                                        <br/>
                                        <small>{el.email}</small>
                                        <Typography style={{color: '#494848'}}>{el.comment}</Typography>
                                        <small className={"post-comment-date"}>{(new Date(el.created_at)).toUTCString()}</small>
                                    </div>
                                ))
                            }
                        </div>
                    )
                    : (
                        <Typography variant={'h4'} color={'secondary'}>
                            No comments...
                        </Typography>
                    )
            }
        </div>
    )
}