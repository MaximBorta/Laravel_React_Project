import React from 'react'
import {Button, TextField, Typography} from "@mui/material";
import Box from "@mui/material/Box";


export const WritePostComment = (props) => {
    const {comment, onChangePostComment, sendPostComment, isSending, successResponse} = props
    return (
        <div>
            {
                successResponse !== null
                && <Typography color={'secondary'}>Success</Typography>
            }
            <form onSubmit={sendPostComment}>
                <Box mt={2}>
                    <TextField
                        onChange={onChangePostComment}
                        id={"name"}
                        label={'name'}
                        fullWidth={true}
                        value={comment.name}
                    />
                </Box>
                <Box mt={2}>
                    <TextField
                        onChange={onChangePostComment}
                        id={"email"}
                        label={'email'}
                        fullWidth={true}
                        value={comment.email}
                    />
                </Box>
                <Box mt={2}>
                    <TextField
                        onChange={onChangePostComment}
                        id={"comment"}
                        label={'comment'}
                        fullWidth={true}
                        value={comment.comment}
                    />
                </Box>
                <Box mt={2}>
                    <Button
                        fullWidth={true}
                        variant={"contained"}
                        color={'primary'}
                        type={'submit'}
                        disabled={comment.comment === '' ? true : false}
                    >
                        {
                            isSending === true
                                ? <Typography>Sending...</Typography>
                                : <Typography> Add</Typography>
                        }
                    </Button>
                </Box>
            </form>
        </div>
    )
}