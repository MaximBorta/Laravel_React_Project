import React, {Component} from 'react';
import {Avatar, Badge} from "@mui/material";
import EventBus from "../../EventBus";
import {SET_ACTIVE_USER_ID} from "../../redux/types/actionTypes";

class Friend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            unreadMessage: 0
        }
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
                <div className={"conversation_list_body"}>
                    <Avatar alt={friend.name} src={`http://localhost:8000/avatars/${friend.user_avatar}`}/>
                    <h2>{friend.name}</h2>
                    {
                        friend.status === 'online'
                            ? <small style={{color: '#2ba71c'}}>online</small>
                            : <small style={{color: '#ee2d0b'}}>offline</small>
                    }
                </div>
                <div>
                    {
                        !this.props.lastMessages || this.props.lastMessages.read
                        || this.props.lastMessages.sender_id !== this.props.id
                            ? '' : <Badge badgeContent={1} color="secondary">
                                {this.props.lastMessages ? this.props.lastMessages.body : ''}
                            </Badge>
                    }
                    {/*<strong>{this.props.lastMessages ? this.props.lastMessages.body : ''}</strong> <br/>*/}
                    <small>{this.props.lastMessages ? this.props.lastMessages.read : ''}</small>
                </div>
            </div>
        );
    }
}

export default Friend;