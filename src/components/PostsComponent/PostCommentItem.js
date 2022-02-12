import React from 'react'
import {PostCommentTitle} from "./PostCommentTitle";
import {FetchPostComments} from "./FetchPostComments";
import CustomModal from "../HelpersComponent/CustomModal";
import {Button} from "@mui/material";
import {WritePostComment} from "./WritePostComment";
import {useModalWithData} from "../../hooks/useModalWithData";

export const PostCommentItem = (props) => {
    const {fetchPostComments, comments} = props
    const {modalOpen, setModalState} = useModalWithData()
    return (
        <div>
            <PostCommentTitle fetchPostComments={fetchPostComments}/>
            <FetchPostComments comments={comments}/>
            <Button
                variant={"contained"}
                color={"primary"}
                fullWidth={true}
                onClick={() => setModalState(true)}
            >
                Add Comment
            </Button>
            <CustomModal
                isActive={modalOpen}
                title={"Add Comment"}
                handleClose={() => setModalState(false)}
            >
                <WritePostComment
                    successResponse={props.successResponse}
                    isSending={props.isSending}
                    onChangePostComment={props.onChangePostComment}
                    sendPostComment={props.sendPostComment}
                    comment={props.comment}
                />
            </CustomModal>
        </div>
    )
}