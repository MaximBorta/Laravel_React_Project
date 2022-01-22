import React, {Component} from 'react';
import {TextField} from "@mui/material";

class SendMessage extends Component {

    render() {
        return (
            <>
                <form onSubmit={this.props.sendMessage}>
                    <TextField
                        value={this.props.message}
                        fullWidth={true}
                        placeholder={"write message..."}
                        onInput={this.props.updatedMessage}
                        onKeyDown={this.props.isTyping}
                    />
                </form>
            </>
        );
    }
}

export default SendMessage;