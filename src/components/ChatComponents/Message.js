import React, {Component} from 'react';
import {Avatar} from "@material-ui/core";
import SendIcon from '@mui/icons-material/Send';

class Message extends Component {
    render() {
        const {message} = this.props
        let isSent = message.sender_id
            ? ''
            : (<small style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>sent... <SendIcon /></small>);
        return (
            <>
                <div className={message.sender_id === this.props.activeUserId ? 'sender' : 'recipient'}>
                    {isSent}
                    {
                        message.recipient_id === this.props.activeUserId
                        && <div>
                            <Avatar alt={this.props.userProfile.data.name} src={`http://localhost:8000/avatars/${this.props.userProfile.data.user_avatar}`} />
                            <strong>{this.props.userProfile.data.name}</strong>
                        </div>
                    }
                    <h5>{message.body}</h5>
                    {
                        message.read !== null&&
                        <small>{message.read}</small>
                    }
                </div>
            </>
        );
    }
}

export default Message;