import React, {Component} from 'react';
import Message from "./Message";

class ChatMessages extends Component {
    render() {
        return (
            <div>
                {
                    this.props.conversation.length !== 0
                    && this.props.conversation.map(message => (
                      <Message
                          key={message.id}
                          message={message}
                          activeUserId={this.props.activeUserId}
                      />
                    ))
                }
            </div>
        );
    }
}

export default ChatMessages;