import React, {Component} from 'react';
import Message from "./Message";
import {Fab} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

class ChatMessages extends Component {
    render() {
        return (
            <div>
                {
                    this.props.conversation.map((message, idx) => (
                        <Message
                            key={idx}
                            message={message}
                            userProfile={this.props.userProfile}
                            activeUserId={this.props.activeUserId}
                        />
                    ))
                }
                {
                    this.props.conversation.length !== 0
                    &&  <div className={this.props.isVisible   ? "scroll-to-bottom": 'hide'}>
                        <Fab size={"small"} onClick={this.props.clickToBottom} aria-label="scroll back to bottom">
                            <KeyboardArrowDownIcon />
                        </Fab>
                    </div>
                }
                {
                    this.props.typing
                    && <span style={{fontStyle: 'italic'}}>{this.props.userTyping}</span>
                }
            </div>
        );
    }
}

export default ChatMessages;