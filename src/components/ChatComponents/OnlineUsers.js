import React, {useEffect, useState} from 'react'
import {Typography} from "@mui/material";
import echo from "../../echo";
import {OnlineUserDetails} from "./OnlineUserDetails";
import {useModalWithData} from "../../hooks/useModalWithData";
import CustomModal from "../HelpersComponent/CustomModal";
import {OnlineUsersCount} from "./OnlineUsersCount";

const OnlineUsers = () => {
    const {modalOpen,setModalState} = useModalWithData()
    const [count, setCount] = useState(0)
    const [users, setUsers] = useState([])

    useEffect(() => {
        onlineListen()
        return () => onlineListen()
    }, [])

    const onlineListen = () => {
        echo.join('counter')
            .here(users => {
                setCount(users.length)
                setUsers(users)
            })
            .joining(user => {
                setCount((count) => count + 1)
            })
            .leaving(user => {
                setCount((count) => count - 1)
            })
    }
    return (
        <>
            {
                count !== 0
                    ? <div>
                    <CustomModal
                        title={"Online Users !"}
                        isActive={modalOpen}
                        handleClose={() => setModalState(false)}
                    >
                        <OnlineUserDetails users={users}/>
                    </CustomModal>
                        <OnlineUsersCount count={count} setModalState={setModalState}/>
                    </div>
                    : <Typography color={'secondary'}>No online users...</Typography>
            }
        </>
    );
}

export default OnlineUsers