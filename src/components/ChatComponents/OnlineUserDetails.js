import React from 'react'
import {Typography} from "@mui/material";

export const OnlineUserDetails = (props) => {
    const {users} = props
    return (
        <div>
            {
                users.map((user, idx) => (
                    <div key={idx}>
                        <Typography variant={'h4'} color={'primary'}>{user.name}</Typography>
                    </div>
                ))
            }
        </div>
    )
}