import React from 'react'
import {Typography} from "@mui/material";


export const OnlineUsersCount = (props) => {
    const {count, setModalState} = props
    return (
        <div onClick={() => setModalState(true)}>
            <Typography style={{cursor: 'pointer'}} color={'primary'} >
                Online users: {count}
            </Typography>
        </div>
    )
}