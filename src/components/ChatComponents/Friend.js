import React, {Component} from 'react';
import {Avatar} from "@mui/material";
import EventBus from "../../EventBus";
import {SET_ACTIVE_USER_ID} from "../../redux/types/actionTypes";

class Friend extends Component {
    constructor(props) {
        super(props);

        this.setActiveUser = this.setActiveUser.bind(this)
    }

    setActiveUser() {
        this.props.setActiveUserId(this.props.id).then(() => {
            EventBus.emit(SET_ACTIVE_USER_ID)
        })
    }

    render() {
        const {friend} = this.props
        let classNames = 'friend_card ' + (this.props.active ? 'active' : '')
        return (
            <div className={`conversation_list ${classNames}`} onClick={this.setActiveUser}>
                {
                    !this.props.lastMessages || this.props.lastMessages.read
                    || this.props.lastMessages.sender_id !== this.props.id
                    ? '' : <span className="new badge" data-badge-caption="unread"></span>
                }
                <Avatar alt={friend.name} src={`http://localhost:8000/avatars/${friend.user_avatar}`}/>
                <div className={"conversation_list_body"}>
                    <h2>{friend.name}</h2>
                    <span>{this.props.lastMessages ? this.props.lastMessages.body : ''}</span> <br/>
                    <span>{this.props.lastMessages ? this.props.lastMessages.read : ''}</span>
                </div>
            </div>
        );
    }
}

export default Friend;