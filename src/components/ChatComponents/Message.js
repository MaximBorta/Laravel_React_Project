import React, {Component} from 'react';

class Message extends Component {
    render() {
        const {message} = this.props
        return (
            <div className={message.recipient_id === this.props.activeUserId ? 'recipient' : 'sender'}>
                <h5>{message.body}</h5>
                <small>{message.read}</small>
            </div>
        );
    }
}

export default Message;